'use client';
import React, { useEffect, useState } from 'react';
import { User, Phone } from "lucide-react";
import DatePicker from '../DatePicker';
import { toast, Slide } from 'react-toastify';

const BookingSystem = () => {
  const [bookedSlots, setBookedSlots] = useState([]);
  const timeSlots = [
    "06:00 - 07:00", "07:00 - 08:00", "08:00 - 09:00", "09:00 - 10:00",
    "10:00 - 11:00", "11:00 - 12:00", "12:00 - 13:00", "13:00 - 14:00",
    "14:00 - 15:00", "15:00 - 16:00", "16:00 - 17:00", "17:00 - 18:00",
    "18:00 - 19:00", "19:00 - 20:00", "20:00 - 21:00", "21:00 - 22:00"
  ];

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [nameError, setNameError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [timeSlotError, setTimeSlotError] = useState('');

  // 🔹 Fetch booked slots whenever date changes
  useEffect(() => {
    const fetchBookedSlots = async () => {
      try {
        const response = await fetch(`/api/user?date=${date}`);
        const data = await response.json();
        if (response.ok) {
          setBookedSlots(data.bookedSlots);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error('Error fetching booked slots:', error);
      }
    };
    if (date) fetchBookedSlots();
  }, [date]);

  // 🔹 Check if slot is expired
  const isSlotExpired = (slot) => {
    const now = new Date();
    const selectedDate = new Date(date);
    const today = new Date();

    const selectedDateStr = selectedDate.toISOString().split("T")[0];
    const todayStr = today.toISOString().split("T")[0];

    if (selectedDateStr !== todayStr) return false; // Only check for today

    const endTime = slot.split(" - ")[1];
    const [endHour, endMinute] = endTime.split(":").map(Number);

    const slotEnd = new Date(selectedDate);
    slotEnd.setHours(endHour, endMinute, 0, 0);

    return now > slotEnd;
  };

  // 🔹 Handle booking form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setNameError('');
    setMobileError('');
    setTimeSlotError('');

    let hasError = false;
    if (!name) {
      setNameError('Name is required');
      hasError = true;
    }
    if (!mobile) {
      setMobileError('Mobile is required');
      hasError = true;
    }
    if (!selectedTimeSlot) {
      setTimeSlotError('Time slot is required');
      hasError = true;
    }

    if (hasError) {
      toast.error('Please fill all the fields!', {
        position: "top-center",
        autoClose: 5000,
        theme: "colored",
        transition: Slide,
      });
      return;
    }

    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, mobile, date, timeSlot: selectedTimeSlot }),
      });

      const data = await response.json();

      if (!response.ok) {
        const msg = data?.error || 'Failed to create booking';
        console.error(msg);
        return;
      }

      // Success: clear form
      setName('');
      setMobile('');
      setSelectedTimeSlot('');
      toast.success('Your booking has been confirmed!', {
        position: "top-center",
        autoClose: 5000,
        theme: "colored",
        transition: Slide,
      });
    } catch (error) {
      console.error('Network or parsing error', error);
      toast.error('Something went wrong. Please try again!', {
        position: "top-center",
        autoClose: 5000,
        theme: "colored",
        transition: Slide,
      });
    }
  };

  return (
    <section className='bg-white flex justify-start py-20 flex-col gap-6 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8' id="booking">
      <div className='flex flex-col items-center justify-center'>
        <h2 className='text-2xl font-bold mb-4 text-black capitalize'>Book your slot now</h2>
      </div>

      <form className='flex flex-col p-6 border rounded-lg shadow-md gap-6' onSubmit={handleSubmit}>
        <h3 className='text-2xl font-medium text-black flex items-center gap-2 mb-2'>
          <User /> Personal Information
        </h3>

        {/* Name */}
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="name" className='text-black font-medium'>Full Name *</label>
          <div className='relative'>
            <input
              type='text'
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full bg-[#f6f8f6] text-sm border border-slate-200 rounded-md px-12 py-2 focus:outline-none focus:border-slate-400 text-black"
            />
            <span className="absolute inset-y-0 flex w-12 items-center justify-center text-black"><User /></span>
          </div>
          <p className='text-red-500'>{nameError}</p>
        </div>

        {/* Mobile */}
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="mobile" className='text-black font-medium'>Mobile Number *</label>
          <div className="relative">
            <input
              type="number"
              id="mobile"
              name="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter your mobile number"
              className="w-full bg-[#f6f8f6] text-sm border border-slate-200 rounded-md px-12 py-2 focus:outline-none focus:border-slate-400 text-black"
            />
            <span className="absolute inset-y-0 flex w-12 items-center justify-center text-black"><Phone /></span>
          </div>
          <p className='text-red-500'>{mobileError}</p>
        </div>

        {/* Date */}
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="date" className='text-black font-medium'>Pick Date *</label>
          <div className='relative'>
            <DatePicker value={date} onChange={(d) => setDate(d)} />
          </div>
        </div>

        {/* Time Slots */}
        <div className="w-full flex flex-col gap-1">
          <label className="text-black font-medium">Select Time Slot *</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-2">
            {timeSlots.map((slot) => {
              const isBooked = bookedSlots.includes(slot);
              const expired = isSlotExpired(slot);
              const disabled = isBooked || expired;

              let bgColor = "bg-white border-[#dae7da]"; // default
              let textColor = "text-black";
              let borderColor = "border-[#dae7da]";

              if (expired) {
                bgColor = "bg-gray-200";
                textColor = "text-black";
                borderColor = "border-gray-200";
              } else if (isBooked) {
                bgColor = "bg-[#dae7da]";
                textColor = "text-[#16a249]";
                borderColor = "border-[#dae7da]";
              } else if (selectedTimeSlot === slot) {
                bgColor = "bg-[#16a249]";
                textColor = "text-white";
                borderColor = "border-[#16a249]";
              }

              // Only add hover classes when not disabled
              const hoverClass = !disabled
                ? (selectedTimeSlot === slot ? "hover:bg-[#16a249]" : "hover:bg-[#e7b008]")
                : "";

              return (
                <button
                  key={slot}
                  type="button"
                  disabled={disabled}
                  onClick={() => !disabled && setSelectedTimeSlot(slot)}
                  className={`relative p-4 rounded-lg border-2 text-sm font-medium min-h-[60px]
                  flex items-center justify-center transition-all
                  ${bgColor} ${textColor} ${borderColor} ${disabled ? "cursor-not-allowed pointer-events-none" : "cursor-pointer"} ${hoverClass}
                `}
                >
                  <div className="flex flex-col">
                    <span className="font-semibold">{slot.split(" - ")[0]}</span>
                    <span className="text-xs opacity-80">to {slot.split(" - ")[1]}</span>
                  </div>
                  {isBooked && (
                    <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full shadow-md">Booked</span>
                  )}
                </button>
              );
            })}
          </div>
          <p className='text-red-500'>{timeSlotError}</p>
        </div>

        {/* Summary */}
        <div className="p-4 rounded-lg bg-[#eaf0ea80] text-black flex flex-col gap-3">
          <p className="text-xl font-medium">Booking Summary</p>
          <div className='flex flex-col gap-1'>
            <p className='text-sm flex justify-between'><span>Full Name: </span><span>{name || '-'}</span></p>
            <p className='text-sm flex justify-between'><span>Mobile Number: </span><span>{mobile || '-'}</span></p>
            <p className='text-sm flex justify-between'><span>Pick Date: </span><span>{date || '-'}</span></p>
            <p className='text-sm flex justify-between'><span>Selected Time Slot: </span><span>{selectedTimeSlot || '-'}</span></p>
            <p className='text-sm font-medium flex justify-between border-t pt-2 mt-2 border-[#dae7da]'>
              <span>Total: </span><span>₹400</span>
            </p>
          </div>
        </div>

        <button type="submit" className='bg-[#16a249] text-white py-2 px-4 rounded-md hover:bg-primary/90 transition'>
          Confirm Booking
        </button>
      </form>
    </section>
  );
};

export default BookingSystem;
