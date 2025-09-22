import React from 'react'
import {
    FiCalendar,
    FiClock,
    FiMapPin,
    FiDollarSign,
    FiUsers,
  } from "react-icons/fi";

const page = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Book Your Turf</h1>
          <p className="text-gray-600">
            Select your preferred turf, date, and time slot
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Turf Selection */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FiUsers className="h-5 w-5 mr-2 text-blue-600" />
                Select Turf
              </h2>
              <div className="grid gap-4">
                {[1, 2, 3].map((id) => (
                  <div
                    key={id}
                    className="border rounded-lg p-4 cursor-pointer transition-all duration-200 border-gray-200 hover:border-gray-300"
                  >
                    <div className="flex items-start space-x-4">
                      <imgage
                        src="https://via.placeholder.com/80"
                        alt="Turf"
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">Turf {id}</h3>
                        <p className="text-gray-600 text-sm mb-2">
                          Sample turf description goes here
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <FiMapPin className="h-4 w-4 mr-1" />
                            Location {id}
                          </span>
                          <span className="flex items-center">
                            <FiDollarSign className="h-4 w-4 mr-1" />
                            ₹500/hour
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Date Selection */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FiCalendar className="h-5 w-5 mr-2 text-blue-600" />
                Select Date
              </h2>
              <input
                type="date"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Time Slots */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FiClock className="h-5 w-5 mr-2 text-blue-600" />
                Available Time Slots
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {["06:00", "07:00", "08:00", "09:00", "10:00"].map((time) => (
                  <button
                    key={time}
                    className="p-3 rounded-lg border text-sm font-medium transition-all duration-200 border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-gray-900"
                  >
                    <div>{time}</div>
                    <div className="text-xs mt-1">₹500</div>
                  </button>
                ))}
                {/* Example of booked & training slot styles */}
                <button
                  disabled
                  className="p-3 rounded-lg border text-sm font-medium border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                >
                  <div>11:00</div>
                  <div className="text-xs mt-1">Booked</div>
                </button>
                <button
                  disabled
                  className="p-3 rounded-lg border text-sm font-medium border-orange-200 bg-orange-50 text-orange-600 cursor-not-allowed"
                >
                  <div>12:00</div>
                  <div className="text-xs mt-1">Training</div>
                </button>
              </div>
            </div>
          </div>

          {/* Booking Form Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Booking Details
              </h3>

              {/* Booking Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-gray-900 mb-2">Turf 1</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>Date: 2025-09-20</div>
                  <div>Time: 08:00</div>
                  <div className="font-medium text-gray-900">Total: ₹500</div>
                </div>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+91-9876543210"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <label className="text-sm text-gray-700">
                      I accept the terms and conditions. I understand that
                      arriving more than <strong>10 minutes late</strong> will
                      result in the slot being released to other customers.
                    </label>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                >
                  Confirm Booking
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page