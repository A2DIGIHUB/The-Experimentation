'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, parseISO, isSameMonth, isSameYear } from 'date-fns';

// Sample events data
const events = [
  {
    id: 1,
    title: 'Sickle Cell Awareness Walk',
    date: '2025-02-15',
    time: '9:00 AM',
    location: 'Central Park',
    description: 'Join us for our annual awareness walk and help raise funds for research.',
    category: 'Community Event',
    coordinates: { lat: 40.7829, lng: -73.9654 }
  },
  {
    id: 2,
    title: 'Educational Seminar',
    date: '2025-02-20',
    time: '2:00 PM',
    location: 'Virtual Event',
    description: 'Learn about the latest treatments and management strategies from medical experts.',
    category: 'Education',
    virtualLink: 'https://zoom.us/j/example'
  },
  {
    id: 3,
    title: 'Support Group Meeting',
    date: '2025-02-25',
    time: '6:00 PM',
    location: 'Community Center',
    description: 'Monthly support group meeting for patients and families.',
    category: 'Support',
    coordinates: { lat: 40.7505, lng: -73.9934 }
  },
  {
    id: 4,
    title: 'Research Symposium',
    date: '2025-03-05',
    time: '10:00 AM',
    location: 'Medical Center Auditorium',
    description: 'Annual symposium showcasing the latest research developments.',
    category: 'Research',
    coordinates: { lat: 40.7421, lng: -73.9587 }
  }
];

const categories = ['All', 'Community Event', 'Education', 'Support', 'Research'];

export default function EventCalendar() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null);

  const filteredEvents = events.filter(
    event => {
      const eventDate = parseISO(event.date);
      return (selectedCategory === 'All' || event.category === selectedCategory) &&
             isSameMonth(eventDate, selectedMonth) &&
             isSameYear(eventDate, selectedMonth);
    }
  );

  const generateCalendarLink = (event: typeof events[0]) => {
    const eventDate = parseISO(event.date);
    const formattedDate = format(eventDate, "yyyyMMdd'T'HHmmss");
    const title = encodeURIComponent(event.title);
    const location = encodeURIComponent(event.location);
    const description = encodeURIComponent(event.description);

    // Google Calendar link
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formattedDate}/${formattedDate}&details=${description}&location=${location}&sprop=&sprop=name:`;
  };

  const handleEventClick = (event: typeof events[0]) => {
    setSelectedEvent(event);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <h2 className="text-3xl font-bold text-center mb-12">Upcoming Events</h2>

        {/* Month Selection */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <button
            onClick={() => setSelectedMonth(prev => {
              const newDate = new Date(prev);
              newDate.setMonth(prev.getMonth() - 1);
              return newDate;
            })}
            className="p-2 rounded-full hover:bg-gray-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h3 className="text-xl font-semibold">
            {format(selectedMonth, 'MMMM yyyy')}
          </h3>
          <button
            onClick={() => setSelectedMonth(prev => {
              const newDate = new Date(prev);
              newDate.setMonth(prev.getMonth() + 1);
              return newDate;
            })}
            className="p-2 rounded-full hover:bg-gray-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-blue text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Events List */}
        <div className="space-y-6">
          <AnimatePresence>
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
                onClick={() => handleEventClick(event)}
              >
                <div className="p-6 flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-sm font-medium text-primary-blue">
                        {event.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        {format(parseISO(event.date), 'EEEE, MMMM d, yyyy')}
                      </span>
                      <span className="text-sm text-gray-500">{event.time}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    <div className="flex items-center text-gray-500">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {event.location}
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-6 flex flex-col gap-2">
                    <button className="btn-primary">
                      Register Now
                    </button>
                    <a
                      href={generateCalendarLink(event)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary-blue hover:text-blue-700 flex items-center justify-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      Add to Calendar
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* No Events Message */}
        {filteredEvents.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No events found for the selected category and month.
          </div>
        )}

        {/* Event Details Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-lg max-w-2xl w-full p-6 relative"
            >
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h3 className="text-2xl font-bold mb-4">{selectedEvent.title}</h3>
              <div className="space-y-4">
                <p className="text-gray-600">{selectedEvent.description}</p>
                <div className="flex items-center text-gray-500">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {format(parseISO(selectedEvent.date), 'EEEE, MMMM d, yyyy')} at {selectedEvent.time}
                </div>
                <div className="flex items-center text-gray-500">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {selectedEvent.location}
                </div>
                {selectedEvent.virtualLink && (
                  <div className="flex items-center text-gray-500">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <a href={selectedEvent.virtualLink} className="text-primary-blue hover:text-blue-700">
                      Join Virtual Event
                    </a>
                  </div>
                )}
                <div className="flex justify-end gap-4 mt-6">
                  <a
                    href={generateCalendarLink(selectedEvent)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-blue hover:text-blue-700 flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Add to Calendar
                  </a>
                  <button className="btn-primary">
                    Register Now
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
