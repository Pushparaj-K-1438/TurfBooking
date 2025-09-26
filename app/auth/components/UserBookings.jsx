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
import { getTodaysBookings, deleteBooking } from '../../actions/bookings';
import { format, parseISO } from 'date-fns';
import { toast, showSuccess, showError } from '../../../lib/toast';

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
                    showError('Failed to fetch bookings');
                }
            } catch (error) {
                showError('Error loading bookings');
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

    const handleCancelBooking = (bookingId) => {
        const toastId = toast(
            <div className="p-4 bg-white flex flex-col gap-5">
                <p className="font-medium mb-4">Are you sure you want to cancel this booking?</p>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => {
                            toast.dismiss(toastId);
                            handleConfirmCancel(bookingId, toastId);
                        }}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                    >
                        Yes, Cancel
                    </button>
                    <button
                        onClick={() => toast.dismiss(toastId)}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                    >
                        No, Keep It
                    </button>
                </div>
            </div>,
            {
                position: 'top-center',
                autoClose: false,
                closeButton: false,
                closeOnClick: false,
                draggable: false,
                style: {
                    width: '100%',
                    maxWidth: '400px',
                    padding: '0px',
                },
            }
        );
    };

    const handleConfirmCancel = async (bookingId) => {
        try {
            const result = await deleteBooking(bookingId);
            if (result.success) {
                // Remove the cancelled booking from the state
                setBookings(prevBookings =>
                    prevBookings.filter(booking => booking._id !== bookingId)
                );
                showSuccess('Booking cancelled successfully!');
            } else {
                showError(result.error || 'Failed to cancel booking');
            }
        } catch (error) {
            console.error('Error cancelling booking:', error);
            showError('An error occurred while cancelling the booking');
        }
    };

    const sortedBookings = [...bookings].sort((a, b) => {
        if (sortBy === 'timeSlot') {
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
                <h2 className="text-xl font-semibold text-gray-800">Bookings</h2>
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Sort by:</span>
                    <button
                        onClick={() => handleSort('timeSlot')}
                        className={`flex items-center text-sm px-3 py-1 rounded-md cursor-pointer ${sortBy === 'timeSlot' ? 'bg-[#E0F5E8] text-primary' : 'text-gray-600'
                            }`}
                    >
                        <Clock3 className="w-4 h-4 mr-1" />
                        Time
                        <ArrowUpDown
                            className={`w-3 h-3 ml-1 ${sortBy === 'timeSlot' ? 'text-primary' : 'text-gray-400'
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
                            {(() => {
                                try {
                                    // Parse the booking date and time
                                    const [startTime] = booking.timeSlot.split(' - ');
                                    const [hours, minutes] = startTime.split(':').map(Number);
                                    
                                    // Create date object for the booking
                                    const [year, month, day] = booking.date.split('-').map(Number);
                                    const bookingTime = new Date(year, month - 1, day, hours, minutes);
                                    
                                    // Get current time
                                    const now = new Date();
                                    
                                    // Calculate the cutoff time (10 minutes before booking)
                                    const tenMinutesBefore = new Date(bookingTime.getTime() + (10 * 60 * 1000));
                                    
                                    // Show cancel button only if current time is before the cutoff
                                    if (now < tenMinutesBefore) {
                                        return (
                                            <button
                                                onClick={() => handleCancelBooking(booking._id)}
                                                className="text-xs bg-[#EF4444] hover:bg-[#DC2626] text-white px-4 py-2 rounded flex gap-1 cursor-pointer transition-colors"
                                            >
                                                <XIcon className="w-4 h-4 mr-1" />
                                                Cancel
                                            </button>
                                        );
                                    }
                                } catch (error) {
                                    console.error('Error processing booking time:', error);
                                }
                                return null;
                            })()}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserBookings;