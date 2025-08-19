import React, { useState } from "react"
import { Bell, Search, User, Flag } from "lucide-react"
import NotificationDropdown, { Notification } from "./NotificationDropdown"

interface NavbarProps {
  onSearch: (query: string, results: any[]) => void
  onProfileClick: () => void
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, onProfileClick }) => {
  const [query, setQuery] = useState("")
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "announcement",
      text: "New Semester Registration Open",
      time: "2h ago",
      unread: true,
    },
    {
      id: 2,
      type: "event",
      text: "Embassy Visit on Dec 18",
      time: "1d ago",
      unread: true,
    },
    {
      id: 3,
      type: "payment",
      text: "Membership fee due soon",
      time: "3d ago",
      unread: false,
    },
    {
      id: 4,
      type: "event",
      text: "Winter Break Activities",
      time: "5d ago",
      unread: false,
    },
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim() !== "") {
      // Dummy dataset - replace later with API or real data
      const dataset = [
        { id: 1, type: "announcements", title: "New Semester Registration Open" },
        { id: 2, type: "events", title: "Embassy Visit on Dec 18" },
        { id: 3, type: "events", title: "Winter Break Activities" },
        { id: 4, type: "marketplace", title: "Used Laptop for Sale" },
        { id: 5, type: "community", title: "Hiking Trip with Students" },
      ]

      const results = dataset.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      )

      onSearch(query, results)
    }
  }

  // mark all as read
  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, unread: false }))
    )
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/10 border-b border-white/20">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-yellow-500 rounded-lg flex items-center justify-center shadow-lg">
              <Flag className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">PPMK</h1>
              <p className="text-xs text-gray-600">
                Malaysian Students in Korea
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <form onSubmit={handleSubmit} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search announcements, events..."
                className="w-full pl-10 pr-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent"
              />
            </form>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-200"
              >
                <Bell className="w-5 h-5 text-gray-700" />
                {notifications.some((n) => n.unread) && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                )}
              </button>

              {showNotifications && (
                <NotificationDropdown
                  notifications={notifications}
                  onMarkAllAsRead={markAllAsRead}
                  onClose={() => setShowNotifications(false)}
                />
              )}
            </div>

            {/* Profile */}
            <button
              onClick={onProfileClick}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-200"
            >
              <User className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
