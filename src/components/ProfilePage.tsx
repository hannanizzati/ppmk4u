// pages/ProfilePage.tsx
import React, { useState } from "react"
import {
  User,
  Calendar,
  Star,
  ShoppingBag,
  MessageCircle,
  Settings,
} from "lucide-react"

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview")

  const user = {
    name: "Rumi",
    email: "Rumi.Huntrix@gmail.com",
    university: "Korea University",
    major: "Computer Engineering",
    year: "3rd Year",
    avatar:
      "https://plus.unsplash.com/premium_photo-1664477044666-7638ec475dcc?q=80&w=400&auto=format&fit=crop",
    membership: "Active",
    events: [
      { id: 1, name: "Embassy Visit", date: "Dec 18, 2024" },
      { id: 2, name: "Winter Camp", date: "Jan 10, 2025" },
    ],
    marketplace: [
      { id: 1, item: "MacBook Pro 13”", status: "Sold" },
      { id: 2, item: "Winter Jacket", status: "Bought" },
    ],
    community: {
      posts: 12,
      comments: 34,
      likes: 120,
    },
  }

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl shadow-md">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-6 h-6 text-blue-600" />
                  <h3 className="font-semibold text-gray-700">
                    Events Participated
                  </h3>
                </div>
                <p className="text-2xl font-bold mt-2">{user.events.length}</p>
              </div>

              <div className="p-6 bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl shadow-md">
                <div className="flex items-center space-x-3">
                  <User className="w-6 h-6 text-purple-600" />
                  <h3 className="font-semibold text-gray-700">Membership</h3>
                </div>
                <p className="text-lg mt-2 font-bold text-purple-700">
                  {user.membership}
                </p>
              </div>

              <div className="p-6 bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-2xl shadow-md">
                <div className="flex items-center space-x-3">
                  <Star className="w-6 h-6 text-yellow-600" />
                  <h3 className="font-semibold text-gray-700">
                    Community Points
                  </h3>
                </div>
                <p className="text-2xl font-bold mt-2">
                  {user.community.likes}
                </p>
              </div>
            </div>
          </div>
        )

      case "events":
        return (
          <div className="p-6 bg-white shadow rounded-xl">
            <h3 className="text-xl font-bold mb-4">Events Participated</h3>
            <ul className="space-y-3">
              {user.events.map((event) => (
                <li
                  key={event.id}
                  className="flex justify-between p-4 bg-gray-50 rounded-lg shadow-sm"
                >
                  <span>{event.name}</span>
                  <span className="text-gray-500 text-sm">{event.date}</span>
                </li>
              ))}
            </ul>
          </div>
        )

      case "marketplace":
        return (
          <div className="p-6 bg-white shadow rounded-xl">
            <h3 className="text-xl font-bold mb-4">Marketplace Activity</h3>
            <ul className="space-y-3">
              {user.marketplace.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between p-4 bg-gray-50 rounded-lg shadow-sm"
                >
                  <span>{item.item}</span>
                  <span
                    className={`text-sm font-medium ${
                      item.status === "Bought"
                        ? "text-green-600"
                        : "text-blue-600"
                    }`}
                  >
                    {item.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )

      case "community":
        return (
          <div className="p-6 bg-white shadow rounded-xl">
            <h3 className="text-xl font-bold mb-4">Community Contributions</h3>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <MessageCircle className="w-6 h-6 mx-auto text-blue-500" />
                <p className="mt-2 font-semibold">{user.community.posts}</p>
                <p className="text-sm text-gray-500">Posts</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <MessageCircle className="w-6 h-6 mx-auto text-green-500" />
                <p className="mt-2 font-semibold">{user.community.comments}</p>
                <p className="text-sm text-gray-500">Comments</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <Star className="w-6 h-6 mx-auto text-yellow-500" />
                <p className="mt-2 font-semibold">{user.community.likes}</p>
                <p className="text-sm text-gray-500">Likes</p>
              </div>
            </div>
          </div>
        )

      case "settings":
        return (
          <div className="p-6 bg-white shadow rounded-xl">
            <h3 className="text-xl font-bold mb-4">Profile Settings</h3>
            <p className="text-gray-500">
              ⚙️ Coming soon: Update profile info, change password, etc.
            </p>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Cover Banner with Profile Info inside */}
      <div className="h-48 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center px-8 shadow-md">
        {/* Profile Image */}
        <img
          src={user.avatar}
          alt="Profile"
          className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
        />

        {/* Profile Details */}
        <div className="ml-6 text-gray-900">
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-800">{user.email}</p>
          <p className="text-sm text-gray-700">
            {user.university} — {user.major} ({user.year})
          </p>
        </div>
      </div>

      <div className="pt-20">
        {/* Tabs */}
        <div className="flex space-x-6 border-b pb-2">
          <button
            onClick={() => setActiveTab("overview")}
            className={`pb-2 font-semibold ${
              activeTab === "overview"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-600"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("events")}
            className={`pb-2 font-semibold ${
              activeTab === "events"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-600"
            }`}
          >
            Events
          </button>
          <button
            onClick={() => setActiveTab("marketplace")}
            className={`pb-2 font-semibold ${
              activeTab === "marketplace"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-600"
            }`}
          >
            Marketplace
          </button>
          <button
            onClick={() => setActiveTab("community")}
            className={`pb-2 font-semibold ${
              activeTab === "community"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-600"
            }`}
          >
            Community
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`pb-2 font-semibold ${
              activeTab === "settings"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-600"
            }`}
          >
            Settings
          </button>
        </div>

        {/* Content */}
        <div className="mt-6">{renderContent()}</div>
      </div>
    </div>
  )
}

export default ProfilePage
