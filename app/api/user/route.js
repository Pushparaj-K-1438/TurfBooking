import connectDB from "../../../lib/mongose";
import Booking from "../../../models/booking";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();

    const { name, mobile, date, timeSlot } = await request.json();

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!mobile) {
      return NextResponse.json({ error: "Mobile is required" }, { status: 400 });
    }
    if (!date) {
      return NextResponse.json({ error: "Date is required" }, { status: 400 });
    }
    if (!timeSlot) {
      return NextResponse.json({ error: "Time slot is required" }, { status: 400 });
    }

    const booking = await Booking.create({ name, mobile, date, timeSlot });
    return NextResponse.json({ message: "Your booking has been confirmed successfully.", booking }, { status: 201 });
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
    const bookedSlots = bookings.map((b) => b.timeSlot);
    return NextResponse.json({ bookedSlots  }, { status: 200 });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}
