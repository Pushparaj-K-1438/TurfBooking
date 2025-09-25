'use client';
import React, { useState, useEffect } from 'react';
import { 
  User, 
  Phone, 
  Clock as ClockIcon, 
  Calendar as CalendarIcon, 
  CalendarDays,
  Clock3,
  X as XIcon,
  ArrowUpDown
} from "lucide-react";
import { getTodaysBookings } from '../../actions/bookings';
import { format, parseISO } from 'date-fns';

const UserBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('timeSlot');
    const [sortOrder, setSortOrder] = useState('asc'); // Default to earliest first

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const data = await getTodaysBookings();
                if (data && data.success) {
                    setBookings(data.bookings || []);
                } else {
                    console.error('Failed to fetch bookings:', data?.error);
                }
            } catch (error) {
                console.error('Error fetching bookings:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('asc');
        }
    };

    const sortedBookings = [...bookings].sort((a, b) => {
        if (sortBy === 'timeSlot') {
            // Extract start time from timeSlot (e.g., "10:00 - 11:00" -> "10:00")
            const timeA = a.timeSlot.split(' - ')[0];
            const timeB = b.timeSlot.split(' - ')[0];
            return sortOrder === 'asc' 
                ? timeA.localeCompare(timeB) 
                : timeB.localeCompare(timeA);
        }
        return 0;
    });

    const formatDate = (dateString) => {
        try {
            return format(parseISO(dateString), 'do MMM yyyy');
        } catch {
            return dateString || 'N/A';
        }
    };

    const formatTime = (timeString) => {
        try {
            if (!timeString) return 'N/A';
            // Assuming timeSlot is in format "HH:mm - HH:mm"
            const [startTime, endTime] = timeString.split(' - ');
            const formatSingleTime = (time) => {
                const [hours, minutes] = time.split(':');
                const date = new Date();
                date.setHours(parseInt(hours), parseInt(minutes));
                return format(date, 'h:mm a');
            };
            return `${formatSingleTime(startTime)} - ${formatSingleTime(endTime)}`;
        } catch {
            return timeString || 'N/A';
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (bookings.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">No bookings found for today</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">Today's Bookings</h2>
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Sort by:</span>
                    <button 
                        onClick={() => handleSort('timeSlot')}
                        className={`flex items-center text-sm px-3 py-1 rounded-md cursor-pointer ${
                            sortBy === 'timeSlot' ? 'bg-[#E0F5E8] text-primary' : 'text-gray-600'
                        }`}
                    >
                        <Clock3 className="w-4 h-4 mr-1" />
                        Time
                        <ArrowUpDown 
                            className={`w-3 h-3 ml-1 ${
                                sortBy === 'timeSlot' ? 'text-primary' : 'text-gray-400'
                            }`}
                        />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sortedBookings.map((booking) => (
                    <div 
                        key={booking._id}
                        className="p-4 rounded-lg border border-gray-200 bg-white hover:shadow-md transition-shadow shadow-sm"
                    >
                        <div className="flex justify-between">
                            <div className="flex items-start space-x-3">
                                <div className="p-2 rounded-full bg-[#E0F5E8]">
                                    <User className="w-5 h-5 text-[#16a249]" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">
                                        {booking.name || 'Guest User'}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Booking ID: {booking._id}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 space-y-2">
                            {booking.mobile && (
                                <div className="flex items-center text-sm text-gray-600">
                                    <Phone className="w-4 h-4 mr-2 text-gray-400" />
                                    <a 
                                        href={`tel:${booking.mobile}`} 
                                        className="text-blue-600 hover:underline"
                                        title={`Call ${booking.mobile}`}
                                    >
                                        {booking.mobile}
                                    </a>
                                </div>
                            )}
                            <div className="flex items-center text-sm text-gray-600">
                                <Clock3 className="w-4 h-4 mr-2 text-gray-400" />
                                {formatTime(booking.timeSlot)}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <CalendarIcon className="w-4 h-4 mr-2 text-gray-400" />
                                {formatDate(booking.date)}
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                            <p className="text-xs text-gray-500">
                                Booked on {formatDate(booking.createdAt)}
                            </p>
                            <button className="text-xs bg-[#EF4444] text-white px-4 py-2 rounded flex gap-1 cursor-pointer"><XIcon className="w-4 h-4 mr-2" />Cancel</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserBookings;