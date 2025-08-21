import React, { useState } from 'react'
import { Calendar, MapPin, Users, Clock, Star, Filter, Plus, X, Trash2 } from 'lucide-react'
import CreateEventModal from './CreateEventModal'

interface Event {
  id: number
  title: string
  description: string
  date: string
  time: string
  location: string
  attendees: number
  maxAttendees: number
  category: string
  organizer: string
  image: string
  status: 'upcoming' | 'completed'
  rating: number
  booth: string
  score: number
  isJoined?: boolean
  isRated?: boolean
  isMyEvent?: boolean
  ratingCount?: number
}

const Events = () => {
  const [selectedFilter, setSelectedFilter] = useState('upcoming')
  const [showFeedback, setShowFeedback] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [userRating, setUserRating] = useState(0)
  const [userFeedback, setUserFeedback] = useState('')
  const [showCancelConfirm, setShowCancelConfirm] = useState<number | null>(null)

  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: 'Korean Language Exchange',
      description: 'Practice Korean with native speakers and help them learn English/Malay. Great opportunity to improve language skills and make new friends.',
      date: '2024-12-15',
      time: '14:00',
      location: 'Hongdae Park',
      attendees: 45,
      maxAttendees: 60,
      category: 'Language',
      organizer: 'Language Club',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=300&fit=crop',
      status: 'completed',
      rating: 3.0,
      booth: 'Area A',
      score: 150,
      ratingCount: 5
    },
    {
      id: 2,
      title: 'Malaysian Food Festival',
      description: 'Celebrate Malaysian cuisine with authentic dishes prepared by our community members. Featuring rendang, nasi lemak, satay, and more!',
      date: '2024-12-20',
      time: '11:00',
      location: 'Itaewon Cultural Center',
      attendees: 120,
      maxAttendees: 150,
      category: 'Cultural',
      organizer: 'Cultural Committee',
      image: 'https://cdn.chatandbuild.com/users/688cb665de83ff4065554014/msiafood-1755734524753-63623967.jpg',
      status: 'upcoming',
      rating: 4.9,
      booth: 'Main Hall',
      score: 200,
      ratingCount: 5
    },
    {
      id: 3,
      title: 'TOPIK Study Group',
      description: 'Intensive study session for TOPIK exam preparation. Experienced seniors will guide through practice tests and study strategies.',
      date: '2024-12-22',
      time: '10:00',
      location: 'Gangnam Library',
      attendees: 28,
      maxAttendees: 30,
      category: 'Academic',
      organizer: 'Study Group',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=300&fit=crop',
      status: 'upcoming',
      rating: 4.0,
      booth: 'Room 201',
      score: 100,
      ratingCount: 5
    },
    {
      id: 4,
      title: 'Kasuma Autumn',
      description: 'Unleash Your Strength, Show Your Talent!',
      date: '2024-12-25',
      time: '08:00',
      location: 'SKKU',
      attendees: 150,
      maxAttendees: 200,
      category: 'Sport',
      organizer: 'PPMK Sport Bureau',
      image: 'https://cdn.chatandbuild.com/users/688cb665de83ff4065554014/kasuma-1755735092921-543679494.jpg',
      status: 'upcoming',
      rating: 3.4,
      booth: 'Field',
      score: 500,
      ratingCount: 5
    },
    {
      id: 5,
      title: 'Autumn Cultural Night',
      description: 'Traditional Malaysian performances including dance, music, and poetry. Showcasing the rich cultural heritage of Malaysia.',
      date: '2024-11-15',
      time: '19:00',
      location: 'Seoul Arts Center',
      attendees: 200,
      maxAttendees: 200,
      category: 'Cultural',
      organizer: 'Cultural Committee',
      image: 'https://cdn.chatandbuild.com/users/688cb665de83ff4065554014/culturalnight-1755735100450-5502828.jpeg',
      status: 'completed',
      rating: 4.9,
      booth: 'Main Stage',
      score: 250,
      ratingCount: 5
    },
    {
      id: 6,
      title: 'Bazaar Ramadhan',
      description: 'Celebrate the spirit of Ramadhan at our Bazaar with authentic Malaysian dishes prepared by our community members. From fragrant rendang and nasi lemak to juicy satay and more, come and savor the true taste of Malaysia this holy month!',
      date: '2024-03-20',
      time: '11:00',
      location: 'Embassy of Malaysia, Seoul',
      attendees: 120,
      maxAttendees: 150,
      category: 'Cultural',
      organizer: 'Cultural Committee',
      image: 'https://cdn.chatandbuild.com/users/688cb665de83ff4065554014/ramadan-1755735085778-77933862.png',
      status: 'completed',
      rating: 4.8,
      booth: 'Main Hall',
      score: 0,
      ratingCount: 5
    }
  ])

  const handleCreateEvent = (eventData: Omit<Event, 'id' | 'status' | 'rating' | 'ratingCount' | 'isMyEvent'>) => {
    const newEvent: Event = {
      ...eventData,
      id: events.length + 1,
      status: 'upcoming',
      rating: 0,
      ratingCount: 0,
      isMyEvent: true
    }
    setEvents(prev => [newEvent, ...prev])
    setShowCreateModal(false)
  }

  const handleJoinEvent = (eventId: number) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId 
        ? { ...event, isJoined: true, attendees: event.attendees + 1 }
        : event
    ))
  }

  const handleCancelEvent = (eventId: number) => {
    setEvents(prev => prev.filter(event => event.id !== eventId))
    setShowCancelConfirm(null)
  }

  const handleRateEvent = (event: Event) => {
    setSelectedEvent(event)
    setShowFeedback(true)
    setUserRating(0)
    setUserFeedback('')
  }

  const submitRating = () => {
    if (selectedEvent && userRating > 0) {
      setEvents(prev => prev.map(event => 
        event.id === selectedEvent.id 
          ? { 
              ...event, 
              rating: ((event.rating * (event.ratingCount || 5)) + userRating) / ((event.ratingCount || 5) + 1),
              ratingCount: (event.ratingCount || 5) + 1,
              isRated: true
            }
          : event
      ))
      setShowFeedback(false)
      setSelectedEvent(null)
    }
  }

  const sortEvents = (events: Event[]) => {
    return events.sort((a, b) => {
      // Prioritize my events first
      if (a.isMyEvent && !b.isMyEvent) return -1
      if (!a.isMyEvent && b.isMyEvent) return 1
      
      // Then joined events
      if (a.isJoined && !b.isJoined) return -1
      if (!a.isJoined && b.isJoined) return 1
      
      // Finally sort by date (latest to oldest)
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  }

  const filteredEvents = sortEvents(events.filter(event => {
    if (selectedFilter === 'all') return true
    return event.status === selectedFilter
  }))

  const EventCard = ({ event }: { event: Event }) => (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl overflow-hidden hover:bg-white/15 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
      <div className="relative">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm border border-white/30 ${
            event.status === 'upcoming' ? 'bg-emerald-500/80 text-white' : 'bg-slate-500/80 text-white'
          }`}>
            {event.status === 'upcoming' ? 'Upcoming' : 'Completed'}
          </span>
        </div>
        {event.isMyEvent && (
          <div className="absolute top-4 left-4 bg-blue-500/80 backdrop-blur-sm px-3 py-1 rounded-full border border-white/30">
            <span className="text-white text-sm font-medium">My Event</span>
          </div>
        )}
        {event.status === 'completed' && (
          <div className="absolute bottom-4 left-4 flex items-center space-x-1 bg-amber-500/80 backdrop-blur-sm px-3 py-1 rounded-full border border-white/30">
            <Star className="w-4 h-4 text-white fill-current" />
            <span className="text-white text-sm font-medium">{event.rating.toFixed(1)}</span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-slate-800">{event.title}</h3>
          <span className="px-3 py-1 bg-blue-100/60 backdrop-blur-sm text-blue-700 rounded-lg text-sm font-medium border border-white/20">
            {event.category}
          </span>
        </div>

        <p className="text-slate-600 mb-4 line-clamp-2">{event.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-slate-600">
            <Calendar className="w-4 h-4" />
            <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-600">
            <MapPin className="w-4 h-4" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-600">
            <Users className="w-4 h-4" />
            <span>{event.attendees}/{event.maxAttendees} attendees</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/20">
          <div>
            <p className="text-xs text-slate-500">Booth/Location</p>
            <p className="font-semibold text-slate-800">{event.booth}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Score Points</p>
            <p className="font-semibold text-slate-800">{event.score} pts</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500">by {event.organizer}</span>
          <div className="flex space-x-2">
            {event.isMyEvent && event.status === 'upcoming' ? (
              <button 
                onClick={() => setShowCancelConfirm(event.id)}
                className="px-4 py-2 bg-red-500/80 backdrop-blur-sm text-white rounded-lg hover:bg-red-600/80 transition-all duration-200 border border-white/30 flex items-center space-x-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            ) : event.status === 'upcoming' && !event.isMyEvent ? (
              event.isJoined ? (
                <span className="px-4 py-2 bg-emerald-500/80 backdrop-blur-sm text-white rounded-lg border border-white/30">
                  Joined
                </span>
              ) : (
                <button 
                  onClick={() => handleJoinEvent(event.id)}
                  className="px-4 py-2 bg-blue-500/80 backdrop-blur-sm text-white rounded-lg hover:bg-blue-600/80 transition-all duration-200 border border-white/30"
                >
                  Join Event
                </button>
              )
            ) : event.status === 'completed' ? (
              event.isRated ? (
                <span className="px-4 py-2 bg-slate-500/80 backdrop-blur-sm text-white rounded-lg border border-white/30">
                  Rated
                </span>
              ) : (
                <button 
                  onClick={() => handleRateEvent(event)}
                  className="px-4 py-2 bg-amber-500/80 backdrop-blur-sm text-white rounded-lg hover:bg-amber-600/80 transition-all duration-200 border border-white/30"
                >
                  Rate Event
                </button>
              )
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Events</h1>
            <p className="text-slate-600">Discover and join community events</p>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-500/80 backdrop-blur-sm text-white rounded-xl hover:bg-blue-600/80 transition-all duration-200 border border-white/30 shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            <span>Create Event</span>
          </button>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 shadow-xl">
        <div className="flex items-center space-x-4">
          <Filter className="w-5 h-5 text-slate-600" />
          <div className="flex space-x-2">
            {['all', 'upcoming', 'completed'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-xl transition-all duration-200 border border-white/20 ${
                  selectedFilter === filter
                    ? 'bg-blue-500/80 text-white backdrop-blur-sm shadow-lg'
                    : 'bg-white/20 text-slate-700 hover:bg-white/30 backdrop-blur-sm'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {/* Create Event Modal */}
      <CreateEventModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateEvent}
      />

      {/* Cancel Confirmation Modal */}
      {showCancelConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/30 p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-slate-800">Cancel Event</h3>
              <button 
                onClick={() => setShowCancelConfirm(null)}
                className="p-1 hover:bg-slate-200/50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>
            <p className="text-slate-600 mb-6">Are you sure you want to cancel this event? This action cannot be undone and all attendees will be notified.</p>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowCancelConfirm(null)}
                className="flex-1 px-4 py-2 bg-slate-300/80 backdrop-blur-sm text-slate-700 rounded-xl hover:bg-slate-400/80 transition-all duration-200 border border-white/30"
              >
                Keep Event
              </button>
              <button
                onClick={() => handleCancelEvent(showCancelConfirm)}
                className="flex-1 px-4 py-2 bg-red-500/80 backdrop-blur-sm text-white rounded-xl hover:bg-red-600/80 transition-all duration-200 border border-white/30"
              >
                Cancel Event
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedback && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/30 p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-slate-800">Rate Event</h3>
              <button 
                onClick={() => setShowFeedback(false)}
                className="p-1 hover:bg-slate-200/50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>
            <p className="text-slate-600 mb-4">{selectedEvent.title}</p>
            
            <div className="flex justify-center space-x-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <button 
                  key={star} 
                  onClick={() => setUserRating(star)}
                  className={`text-3xl transition-colors ${
                    star <= userRating ? 'text-amber-400' : 'text-slate-300'
                  } hover:text-amber-500`}
                >
                  <Star className="w-8 h-8 fill-current" />
                </button>
              ))}
            </div>

            <textarea
              placeholder="Share your feedback..."
              value={userFeedback}
              onChange={(e) => setUserFeedback(e.target.value)}
              className="w-full p-3 bg-white/50 backdrop-blur-sm border border-white/40 rounded-xl text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50 mb-4"
              rows={3}
            />

            <div className="flex space-x-3">
              <button
                onClick={() => setShowFeedback(false)}
                className="flex-1 px-4 py-2 bg-slate-300/80 backdrop-blur-sm text-slate-700 rounded-xl hover:bg-slate-400/80 transition-all duration-200 border border-white/30"
              >
                Cancel
              </button>
              <button
                onClick={submitRating}
                disabled={userRating === 0}
                className="flex-1 px-4 py-2 bg-blue-500/80 backdrop-blur-sm text-white rounded-xl hover:bg-blue-600/80 transition-all duration-200 border border-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Events
