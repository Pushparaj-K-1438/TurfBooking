import connectDB from "../../../lib/mongose";
import Booking from "../../../models/booking";
import Slot from "../../../models/slots";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();

    const { name, mobile, date, timeSlots, originalAmount, discountAmount, finalAmount, appliedOffer } = await request.json();

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!mobile) {
      return NextResponse.json({ error: "Mobile is required" }, { status: 400 });
    }
    if (!date) {
      return NextResponse.json({ error: "Date is required" }, { status: 400 });
    }
    if (!timeSlots || timeSlots.length === 0) {
      return NextResponse.json({ error: "At least one time slot must be selected" }, { status: 400 });
    }

    // Validate each slot exists and is active
    const slotValidationPromises = timeSlots.map(async (timeSlot) => {
      const [startTime, endTime] = timeSlot.split(" - ");
      const slotInfo = await Slot.findOne({
        startTime,
        endTime,
        isActive: true
      });
      return { timeSlot, slotInfo };
    });

    const slotValidations = await Promise.all(slotValidationPromises);

    for (const { timeSlot, slotInfo } of slotValidations) {
      if (!slotInfo) {
        return NextResponse.json({ error: `Selected time slot "${timeSlot}" is not available or inactive` }, { status: 400 });
      }
    }

    // Check if any of the slots are already booked for this date
    const existingBookings = await Booking.find({ date });
    if (existingBookings.length > 0) {
      // Check each requested slot against all existing bookings
      for (const timeSlot of timeSlots) {
        const isBooked = existingBookings.some(booking =>
          booking.timeSlots && booking.timeSlots.includes(timeSlot)
        );
        if (isBooked) {
          return NextResponse.json({
            error: `The time slot "${timeSlot}" is already booked for the selected date`
          }, { status: 409 });
        }
      }
    }

    // Create a single booking record with multiple slots
    const booking = await Booking.create({
      name,
      mobile,
      date,
      timeSlots,
      totalAmount: originalAmount,
      discountAmount,
      finalAmount,
      appliedOffer
    });

    return NextResponse.json({
      message: `Your booking for ${timeSlots.length} slot(s) has been confirmed successfully.`,
      booking,
      totalSlots: timeSlots.length
    }, { status: 201 });

  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}


export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");
    if (!date) {
        return NextResponse.json({ error: "Date is required" }, { status: 400 });
    }
    const bookings = await Booking.find({date});
    const bookedSlots = bookings.flatMap((b) => b.timeSlots || []);
    return NextResponse.json({ bookedSlots  }, { status: 200 });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}
