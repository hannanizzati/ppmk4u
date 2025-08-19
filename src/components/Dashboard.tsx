import React from 'react'
import { Calendar, MessageCircle, ShoppingBag, Users, MapPin, Search, ArrowRight, Hash } from 'lucide-react'

interface DashboardProps {
  setActiveTab?: (tab: string) => void
  onQuickSearch?: (query: string) => void
}

const Dashboard: React.FC<DashboardProps> = ({ setActiveTab, onQuickSearch }) => {
  const stats = [
    { label: 'Active Members', value: '1,247', icon: Users, color: 'from-blue-500 to-cyan-500' },
    { label: 'Upcoming Events', value: '8', icon: Calendar, color: 'from-green-500 to-teal-500' },
    { label: 'Active Chats', value: '23', icon: MessageCircle, color: 'from-purple-500 to-pink-500' },
    { label: 'Marketplace Items', value: '156', icon: ShoppingBag, color: 'from-orange-500 to-red-500' },
  ]

  const recentEvents = [
    { title: 'Korean Language Exchange', date: 'Dec 15, 2024', location: 'Hongdae', attendees: 45, image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=200&fit=crop' },
    { title: 'Malaysian Food Festival', date: 'Dec 20, 2024', location: 'Itaewon', attendees: 120, image: 'https://plus.unsplash.com/premium_photo-1753126769826-e6b78dac47c3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { title: 'Study Group - TOPIK', date: 'Dec 22, 2024', location: 'Gangnam Library', attendees: 28, image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=200&fit=crop' }
  ]

  const announcements = [
    { title: 'New Semester Registration Open', content: 'Spring 2025 course registration is now available. Please check your university portal.', time: '2 hours ago', priority: 'high' },
    { title: 'Embassy Visit Schedule', content: 'Malaysian Embassy will visit Seoul National University on December 18th.', time: '5 hours ago', priority: 'medium' },
    { title: 'Winter Break Activities', content: 'Join our winter break activities including skiing trip and cultural tours.', time: '1 day ago', priority: 'low' }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome back, Rumi!</h1>
            <p className="text-gray-600">Stay connected with your Malaysian community in Korea</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Today</p>
            <p className="text-2xl font-bold text-gray-800">Dec 14, 2024</p>
            <p className="text-sm text-gray-600">Seoul, South Korea</p>
          </div>
        </div>

        {/* Quick actions */}
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab?.('chat')}
            className="inline-flex items-center space-x-2 px-3 py-1.5 bg-white/40 rounded-lg text-sm hover:bg-white/50"
          >
            <Hash className="w-4 h-4" /><span>Open Group Chat</span>
          </button>
          <button
            onClick={() => setActiveTab?.('marketplace')}
            className="inline-flex items-center space-x-2 px-3 py-1.5 bg-white/40 rounded-lg text-sm hover:bg-white/50"
          >
            <ShoppingBag className="w-4 h-4" /><span>Go to Marketplace</span>
          </button>
          <button
            onClick={() => setActiveTab?.('community')}
            className="inline-flex items-center space-x-2 px-3 py-1.5 bg-white/40 rounded-lg text-sm hover:bg-white/50"
          >
            <MessageCircle className="w-4 h-4" /><span>Open Community</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <div key={i} className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Upcoming Events</h2>
            <button
              onClick={() => setActiveTab?.('events')}
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            {recentEvents.map((event, index) => (
              <button
                key={index}
                onClick={() => setActiveTab?.('events')}
                className="w-full text-left flex items-center space-x-4 p-4 bg-white/30 backdrop-blur-sm rounded-xl border border-white/40 hover:bg-white/40 transition"
              >
                <img src={event.image} alt={event.title} className="w-16 h-16 rounded-lg object-cover" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{event.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                    <span>{event.date}</span>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>{event.attendees}</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Announcements */}
        <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Recent Announcements</h2>
            <button
              onClick={() => setActiveTab?.('announcements')}
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            {announcements.map((a, index) => (
              <button
                key={index}
                onClick={() => setActiveTab?.('announcements')}
                className="w-full text-left p-4 bg-white/30 backdrop-blur-sm rounded-xl border border-white/40 hover:bg-white/40 transition"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-800">{a.title}</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      a.priority === 'high'
                        ? 'bg-red-100 text-red-700'
                        : a.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {a.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{a.content}</p>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <Search className="w-3 h-3" />
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onQuickSearch?.(a.title)
                    }}
                    className="underline hover:no-underline"
                  >
                    Find related
                  </button>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
