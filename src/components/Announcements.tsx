import React, { useState } from 'react'
import {
  Search,
  Filter,
  Pin,
  Clock,
  AlertCircle,
  CheckCircle,
  Info,
  X,
  ArrowRight,
  Link as LinkIcon
} from 'lucide-react'

interface Announcement {
  id: number
  title: string
  content: string
  author: string
  timestamp: string
  priority: 'high' | 'medium' | 'low'
  pinned: boolean
  category: 'Academic' | 'Official' | 'Events' | 'Social'
  tags: string[]
}

interface AnnouncementsProps {
  // optional hooks to integrate with the rest of the app
  setActiveTab?: (tab: string) => void
  onTagClick?: (query: string) => void // calls App's global search
}

const Announcements: React.FC<AnnouncementsProps> = ({ setActiveTab, onTagClick }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [detail, setDetail] = useState<Announcement | null>(null)

  // === data (same content you already use) ===
  const announcements: Announcement[] = [
    {
      id: 1,
      title: 'Spring 2025 Semester Registration',
      content:
        'Registration for Spring 2025 semester is now open. Please complete your course selection by December 20th. Late registration will incur additional fees.',
      author: 'PPMK Admin',
      timestamp: '2 hours ago',
      priority: 'high',
      pinned: true,
      category: 'Academic',
      tags: ['registration', 'semester', 'deadline']
    },
    {
      id: 2,
      title: 'Malaysian Embassy Visit - SNU',
      content:
        'The Malaysian Embassy will be visiting Seoul National University on December 18th from 10 AM to 4 PM. Services include passport renewal, document verification, and student consultation.',
      author: 'Embassy Liaison',
      timestamp: '5 hours ago',
      priority: 'medium',
      pinned: true,
      category: 'Official',
      tags: ['embassy', 'passport', 'documents']
    },
    {
      id: 3,
      title: 'Winter Break Activity Schedule',
      content:
        'Join us for exciting winter break activities! Skiing trip to Pyeongchang (Dec 22-24), Seoul city tour (Dec 26), and New Year celebration party (Dec 31). Registration links in comments.',
      author: 'Events Committee',
      timestamp: '1 day ago',
      priority: 'medium',
      pinned: false,
      category: 'Events',
      tags: ['winter', 'activities', 'skiing', 'party']
    },
    {
      id: 4,
      title: 'TOPIK Exam Preparation Workshop',
      content:
        'Free TOPIK preparation workshop every Saturday at Gangnam Library. Experienced seniors will guide you through practice tests and study strategies.',
      author: 'Study Group Leader',
      timestamp: '2 days ago',
      priority: 'low',
      pinned: false,
      category: 'Academic',
      tags: ['TOPIK', 'study', 'workshop']
    },
    {
      id: 5,
      title: 'Scholarship Application Deadline Reminder',
      content:
        'Reminder: Korean Government Scholarship applications are due January 15th, 2025. Make sure to submit all required documents including recommendation letters.',
      author: 'Academic Advisor',
      timestamp: '3 days ago',
      priority: 'high',
      pinned: false,
      category: 'Academic',
      tags: ['scholarship', 'deadline', 'application']
    },
    {
      id: 6,
      title: 'Monthly Community Meetup',
      content:
        'Join our monthly community meetup at Hongdae this Saturday 7 PM. Great opportunity to meet new friends and catch up with fellow Malaysians!',
      author: 'Community Manager',
      timestamp: '4 days ago',
      priority: 'low',
      pinned: false,
      category: 'Social',
      tags: ['meetup', 'community', 'hongdae']
    }
  ]

  // === helpers copied from your original file ===
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="w-4 h-4 text-red-500" />
      case 'medium':
        return <Info className="w-4 h-4 text-yellow-500" />
      case 'low':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      default:
        return <Info className="w-4 h-4 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500 bg-red-50/50'
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-50/50'
      case 'low':
        return 'border-l-green-500 bg-green-50/50'
      default:
        return 'border-l-gray-500 bg-gray-50/50'
    }
  }

  // === filtering logic (same idea as before) ===
  const filteredAnnouncements = announcements.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesFilter =
      selectedFilter === 'all' ||
      a.category.toLowerCase() === selectedFilter ||
      a.priority === selectedFilter ||
      (selectedFilter === 'pinned' && a.pinned)

    return matchesSearch && matchesFilter
  })

  // === previously this navigated — now it opens the detail modal ===
  const openDetail = (a: Announcement) => setDetail(a)

  const openRelatedSection = (a: Announcement) => {
    if (!setActiveTab) return
    const key = a.category.toLowerCase()
    if (key === 'events' || key === 'academic') setActiveTab('events')
    else if (key === 'social') setActiveTab('community')
    else setActiveTab('announcements')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 p-6 shadow-xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Announcements</h1>
        <p className="text-gray-600">Stay updated with the latest news and important information</p>
      </div>

      {/* Search & Filter */}
      <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 p-6 shadow-xl">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search announcements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/30 backdrop-blur-sm border border-white/40 rounded-xl text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-4 py-3 bg-white/30 backdrop-blur-sm border border-white/40 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
            >
              <option value="all">All</option>
              <option value="pinned">Pinned</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
              <option value="academic">Academic</option>
              <option value="events">Events</option>
              <option value="social">Social</option>
              <option value="official">Official</option>
            </select>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {filteredAnnouncements.map((a) => (
          <div
            key={a.id}
            className={`bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 shadow-xl overflow-hidden ${getPriorityColor(
              a.priority
            )} border-l-4`}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {a.pinned && <Pin className="w-5 h-5 text-blue-600 rotate-45" />}
                  {getPriorityIcon(a.priority)}
                  <h2 className="text-xl font-bold text-gray-800">{a.title}</h2>
                </div>
                <span className="px-3 py-1 bg-white/40 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700">
                  {a.category}
                </span>
              </div>

              {/* Preview (kept short here) */}
              <p className="text-gray-700 mb-4 leading-relaxed line-clamp-2">
                {a.content}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center space-x-4">
                  <span className="font-medium">{a.author}</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{a.timestamp}</span>
                  </div>
                </div>

                {/* NEW: “Go to related” now opens the full details modal */}
                <button
                  onClick={() => openDetail(a)}
                  className="inline-flex items-center space-x-2 px-3 py-1 bg-white/40 backdrop-blur-sm rounded-lg hover:bg-white/50 transition-all duration-200"
                >
                  <span>Go to related</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAnnouncements.length === 0 && (
        <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 p-12 text-center shadow-xl">
          <div className="text-gray-400 mb-4">
            <Search className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No announcements found</h3>
          <p className="text-gray-500">Try a different keyword or filter</p>
        </div>
      )}

      {/* === DETAILS MODAL === */}
      {detail && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl border border-white/30 shadow-2xl max-w-2xl w-full overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-gray-200/60 flex items-start justify-between">
              <div className="pr-4">
                <div className="flex items-center space-x-2 mb-2">
                  {detail.pinned && <Pin className="w-4 h-4 text-blue-600 rotate-45" />}
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                    {detail.category}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      detail.priority === 'high'
                        ? 'bg-red-100 text-red-700'
                        : detail.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {detail.priority}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">{detail.title}</h3>
                <div className="mt-2 flex items-center space-x-3 text-sm text-gray-600">
                  <span className="font-medium">{detail.author}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{detail.timestamp}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setDetail(null)}
                className="p-2 rounded-xl hover:bg-gray-100 transition"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">
              <div>
                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {detail.content}
                </p>
              </div>

              {/* Tags */}
              {detail.tags?.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {detail.tags.map((tag, i) => (
                      <button
                        key={i}
                        onClick={() => onTagClick?.(tag)}
                        className="inline-flex items-center space-x-1 px-2 py-1 bg-blue-100/60 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-200/70 transition"
                      >
                        <LinkIcon className="w-3 h-3" />
                        <span>#{tag}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    onTagClick?.(detail.title)
                    setDetail(null)
                  }}
                  className="px-3 py-2 bg-white/60 rounded-lg border hover:bg-white transition text-sm"
                >
                  Find related in Search
                </button>
                <button
                  onClick={() => {
                    openRelatedSection(detail)
                    setDetail(null)
                  }}
                  className="inline-flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                >
                  <span>Open related section</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Announcements
