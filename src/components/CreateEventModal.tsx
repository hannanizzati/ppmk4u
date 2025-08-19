import React, { useState } from 'react'
import { X, Calendar, MapPin, Users, Clock, Tag, User } from 'lucide-react'

interface Event {
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
  booth: string
  score: number
}

interface CreateEventModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (event: Event) => void
}

const CreateEventModal: React.FC<CreateEventModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    maxAttendees: '',
    category: '',
    organizer: '',
    booth: '',
    score: ''
  })

  const categories = ['Language', 'Cultural', 'Academic', 'Sport', 'Social', 'Workshop', 'Other']
  
  const eventImages = [
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=300&fit=crop',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=300&fit=crop',
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=300&fit=crop',
    'https://images.unsplash.com/photo-1674088063241-8bedd738ccab?w=600&h=300&fit=crop',
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=300&fit=crop',
    'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&h=300&fit=crop'
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.description || !formData.date || !formData.time || 
        !formData.location || !formData.maxAttendees || !formData.category || 
        !formData.organizer || !formData.booth) {
      alert('Please fill in all required fields')
      return
    }

    const randomImage = eventImages[Math.floor(Math.random() * eventImages.length)]
    
    const eventData: Event = {
      title: formData.title,
      description: formData.description,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      attendees: 0,
      maxAttendees: parseInt(formData.maxAttendees),
      category: formData.category,
      organizer: formData.organizer,
      image: randomImage,
      booth: formData.booth,
      score: parseInt(formData.score) || 0
    }

    onSubmit(eventData)
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      maxAttendees: '',
      category: '',
      organizer: '',
      booth: '',
      score: ''
    })
  }

  const handleCancel = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      maxAttendees: '',
      category: '',
      organizer: '',
      booth: '',
      score: ''
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/30 p-6 max-w-2xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Create New Event</h2>
          <button 
            onClick={handleCancel}
            className="p-2 hover:bg-gray-200/50 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-3 bg-white/50 backdrop-blur-sm border border-white/40 rounded-xl text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
              placeholder="Enter event title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-3 bg-white/50 backdrop-blur-sm border border-white/40 rounded-xl text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
              placeholder="Describe your event"
              rows={3}
              required
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Date *
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full p-3 bg-white/50 backdrop-blur-sm border border-white/40 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4 inline mr-1" />
                Time *
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full p-3 bg-white/50 backdrop-blur-sm border border-white/40 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                required
              />
            </div>
          </div>

          {/* Location and Booth */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Location *
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full p-3 bg-white/50 backdrop-blur-sm border border-white/40 rounded-xl text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                placeholder="Event location"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Booth/Area *
              </label>
              <input
                type="text"
                value={formData.booth}
                onChange={(e) => setFormData({ ...formData, booth: e.target.value })}
                className="w-full p-3 bg-white/50 backdrop-blur-sm border border-white/40 rounded-xl text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                placeholder="Booth or area"
                required
              />
            </div>
          </div>

          {/* Category and Organizer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Tag className="w-4 h-4 inline mr-1" />
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-3 bg-white/50 backdrop-blur-sm border border-white/40 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                required
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-1" />
                Organizer *
              </label>
              <input
                type="text"
                value={formData.organizer}
                onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                className="w-full p-3 bg-white/50 backdrop-blur-sm border border-white/40 rounded-xl text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                placeholder="Organizer name"
                required
              />
            </div>
          </div>

          {/* Max Attendees and Score */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="w-4 h-4 inline mr-1" />
                Max Attendees *
              </label>
              <input
                type="number"
                value={formData.maxAttendees}
                onChange={(e) => setFormData({ ...formData, maxAttendees: e.target.value })}
                className="w-full p-3 bg-white/50 backdrop-blur-sm border border-white/40 rounded-xl text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                placeholder="Maximum attendees"
                min="1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Score Points
              </label>
              <input
                type="number"
                value={formData.score}
                onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                className="w-full p-3 bg-white/50 backdrop-blur-sm border border-white/40 rounded-xl text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                placeholder="Points awarded (optional)"
                min="0"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 px-6 py-3 bg-gray-300/80 backdrop-blur-sm text-gray-700 rounded-xl hover:bg-gray-400/80 transition-all duration-200 border border-white/30 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-blue-500/80 backdrop-blur-sm text-white rounded-xl hover:bg-blue-600/80 transition-all duration-200 border border-white/30 font-medium"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateEventModal
