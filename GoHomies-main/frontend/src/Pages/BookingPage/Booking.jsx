import { Calendar, MapPin, Users, DollarSign, Clock } from 'lucide-react'
import Footer from '../../Components/Footer/Footer'

const Booking = () => {
  const upcomingBookings = [
    {
      id: 1,
      destination: "Kerala",
      startDate: "2025-01-15",
      endDate: "2025-01-20",
      people: 4,
      budget: "₹25,000",
      status: "Confirmed"
    },
    {
      id: 2,
      destination: "Manali",
      startDate: "2025-02-10",
      endDate: "2025-02-17",
      people: 3,
      budget: "₹35,000",
      status: "Pending"
    },
  ]

  return (
    <div className='flex flex-col items-center justify-start min-h-screen py-8 bg-[#FAFAFA] px-4 pt-[100px]'>
      <div className='w-full max-w-4xl'>
        <div className='mb-12'>
          <h1 className='text-4xl font-bold mb-4'>Travel Bookings</h1>
          <p className='text-gray-600 text-lg'>Manage your travel bookings and reservations</p>
        </div>

        <div className='mb-8'>
          <button className='px-6 py-2 bg-[#6B8E23] text-white rounded-lg hover:bg-[#5a7a1c] transition'>
            New Booking
          </button>
        </div>

        {/* Bookings Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {upcomingBookings.map((booking) => (
            <div key={booking.id} className='bg-white rounded-lg shadow-md border border-[#e0e0e0] p-6 hover:shadow-lg transition'>
              <div className='flex items-start justify-between mb-4'>
                <h2 className='text-2xl font-bold text-[#6B8E23]'>{booking.destination}</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  booking.status === 'Confirmed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {booking.status}
                </span>
              </div>

              <div className='space-y-3 text-gray-700'>
                <div className='flex items-center gap-3'>
                  <Calendar size={18} className='text-[#6B8E23]' />
                  <span className='text-sm'>
                    {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                  </span>
                </div>

                <div className='flex items-center gap-3'>
                  <Users size={18} className='text-[#6B8E23]' />
                  <span className='text-sm'>{booking.people} travelers</span>
                </div>

                <div className='flex items-center gap-3'>
                  <DollarSign size={18} className='text-[#6B8E23]' />
                  <span className='text-sm'>Total: {booking.budget}</span>
                </div>
              </div>

              <div className='flex gap-3 mt-6 pt-6 border-t border-[#e0e0e0]'>
                <button className='flex-1 px-4 py-2 bg-[#6B8E23] text-white rounded-lg hover:bg-[#5a7a1c] transition text-sm'>
                  View Details
                </button>
                <button className='flex-1 px-4 py-2 border border-[#6B8E23] text-[#6B8E23] rounded-lg hover:bg-[#6B8E23]/10 transition text-sm'>
                  Manage
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {upcomingBookings.length === 0 && (
          <div className='flex flex-col items-center justify-center py-16 bg-white rounded-lg border border-[#e0e0e0]'>
            <Clock size={48} className='text-gray-300 mb-4' />
            <h3 className='text-2xl font-bold text-gray-700 mb-2'>No Bookings Yet</h3>
            <p className='text-gray-600 mb-6'>Create your first booking to start your travel journey</p>
            <button className='px-6 py-2 bg-[#6B8E23] text-white rounded-lg hover:bg-[#5a7a1c] transition'>
              Create Booking
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default Booking
