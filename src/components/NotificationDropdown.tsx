import React from "react"
import { Bell, Calendar, Megaphone, CreditCard } from "lucide-react"

export interface Notification {
  id: number
  type: "announcement" | "event" | "payment" | "other"
  text: string
  time: string
  unread: boolean
}

interface Props {
  notifications: Notification[]
  onMarkAllAsRead: () => void
  onClose: () => void
}

// helper: choose icon based on notification type
const getIcon = (type: string) => {
  switch (type) {
    case "announcement":
      return <Megaphone className="w-5 h-5 text-blue-600" />
    case "event":
      return <Calendar className="w-5 h-5 text-green-600" />
    case "payment":
      return <CreditCard className="w-5 h-5 text-purple-600" />
    default:
      return <Bell className="w-5 h-5 text-gray-600" />
  }
}

const NotificationDropdown: React.FC<Props> = ({
  notifications,
  onMarkAllAsRead,
  onClose,
}) => {
  return (
    <div className="absolute right-0 mt-2 w-80 bg-white shadow-xl rounded-2xl p-4 z-50">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-gray-800">Notifications</h3>
        <button
          onClick={onMarkAllAsRead}
          className="text-xs text-blue-600 hover:underline"
        >
          Mark all as read
        </button>
      </div>

      {/* Notification list */}
      <ul className="max-h-72 overflow-y-auto space-y-2">
        {notifications.map((n) => (
          <li
            key={n.id}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition"
          >
            {/* Icon bubble */}
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100">
              {getIcon(n.type)}
            </div>

            {/* Text */}
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">{n.text}</p>
              <p className="text-xs text-gray-500">{n.time}</p>
            </div>

            {/* Unread Dot */}
            {n.unread && (
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2"></span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NotificationDropdown
