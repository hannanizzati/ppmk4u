import React, { useState, useMemo } from 'react'
import { Send, Pin, Hash, Users, Search, MoreVertical, Smile, Settings, UserPlus, LogOut, Shield, UserMinus, Crown, Reply, Forward, Flag, Trash2 } from 'lucide-react'
import GroupSettings from './GroupSettings'

const GroupChat = () => {
  const [selectedChat, setSelectedChat] = useState('Hicom')
  const [message, setMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [showSettings, setShowSettings] = useState(false)
  const [hoveredMessage, setHoveredMessage] = useState<number | null>(null)
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)

  const chatRooms = [
    { id: 'Hicom', name: 'PPMK Hicom', members: 4, unread: 3, pinned: true },
    { id: 'University', name: 'Korea University', members: 355, unread: 0, pinned: true },
    { id: 'KASUMA', name: 'KASUMA Autumn', members: 189, unread: 7, pinned: false },
    { id: 'Badminton', name: 'Badminton Club', members: 134, unread: 2, pinned: false },
    { id: 'Basketball', name: 'Basketball Team', members: 98, unread: 0, pinned: false },
    { id: 'Internships', name: 'Internships', members: 167, unread: 1, pinned: false },
    { id: 'batch21', name: 'Batch 21', members: 89, unread: 0, pinned: false },
  ]

  const messages = [
    {
      id: 1,
      user: 'PPMK Admin',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      message: '📌 REMINDER: Malaysian Food Festival registration closes tomorrow! Don\'t miss out on showcasing your cooking skills.',
      timestamp: '11:15 AM',
      pinned: true,
      isAdmin: true
    },
    {
      id: 2,
      user: 'Siti Nurhaliza',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      message: 'Agreed! Met so many nice Korean students. Already planning to meet up again next week 😊',
      timestamp: '10:32 AM',
      pinned: false
    },
    {
      id: 3,
      user: 'Ahmad Rahman',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      message: 'Hey everyone! Just wanted to share that the Korean Language Exchange event was amazing yesterday. Thanks to everyone who joined!',
      timestamp: '10:30 AM',
      pinned: false
    },
    {
      id: 4,
      user: 'Lim Wei Ming',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
      message: 'Can someone help me with TOPIK Level 4 grammar? Struggling with some advanced patterns 😅',
      timestamp: '11:45 AM',
      pinned: false
    },
    {
      id: 5,
      user: 'Fatimah Ali',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      message: '@Lim Wei Ming I can help! I passed TOPIK 5 last year. Let\'s meet at the library this weekend?',
      timestamp: '11:47 AM',
      pinned: false
    },
    {
      id: 6,
      user: 'Raj Kumar',
      avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=40&h=40&fit=crop&crop=face',
      message: 'Looking for a roommate near Hongik University. Clean, quiet, and responsible. DM me if interested!',
      timestamp: '12:20 PM',
      pinned: false
    }
  ]

  const filteredChatRooms = useMemo(() => {
    if (!searchQuery) return chatRooms
    return chatRooms.filter(room => 
      room.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  const currentRoom = chatRooms.find(room => room.id === selectedChat)

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessage('')
    }
  }

  const handleSettingsClick = () => {
    setShowSettings(true)
  }

    const handleMessageAction = (action: string, messageId: number) => {
    console.log(`${action} action for message ${messageId}`)
    setActiveDropdown(null)
    // Add your action logic here
  }

  const toggleDropdown = (messageId: number) => {
    setActiveDropdown(activeDropdown === messageId ? null : messageId)
  }

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null)
    }
    
    if (activeDropdown) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [activeDropdown])

  return (
    <>
      <div className="flex h-[calc(100vh-12rem)] space-x-6">
        {/* Chat Rooms Sidebar */}
        <div className="w-80 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Chat Rooms</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="text"
                placeholder="Search rooms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent"
              />
            </div>
          </div>

          <div className="p-4 space-y-2 overflow-y-auto max-h-[calc(100vh-20rem)]">
            {filteredChatRooms.map((room) => (
              <button
                key={room.id}
                onClick={() => setSelectedChat(room.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                  selectedChat === room.id
                    ? 'bg-white/30 backdrop-blur-sm border border-white/40 shadow-lg'
                    : 'hover:bg-white/15 backdrop-blur-sm'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    {room.pinned && <Pin className="w-4 h-4 text-blue-600" />}
                    <Hash className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-800">{room.name}</p>
                    <div className="flex items-center space-x-2 text-xs text-gray-600">
                      <Users className="w-3 h-3" />
                      <span>{room.members}</span>
                    </div>
                  </div>
                </div>
                {room.unread > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                    {room.unread}
                  </span>
                )}
              </button>
            ))}
            {filteredChatRooms.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No rooms found</p>
              </div>
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl flex flex-col">
          {/* Chat Header */}
          <div className="p-6 border-b border-black/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Hash className="w-6 h-6 text-gray-600" />
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{currentRoom?.name}</h3>
                  <p className="text-sm text-gray-600">{currentRoom?.members} members</p>
                </div>
              </div>
              <button 
                onClick={handleSettingsClick}
                className="p-2 bg-transparent backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-200"
              >
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`group relative flex items-start space-x-3 rounded-xl p-2 transition-colors duration-200 ${msg.pinned ? 'bg-yellow-50/20 backdrop-blur-sm border border-yellow-200/30 shadow-lg' 
                : 'hover:bg-white/40'}`}
                onMouseEnter={() => setHoveredMessage(msg.id)}
                onMouseLeave={() => setHoveredMessage(null)}
              >
                <img
                  src={msg.avatar}
                  alt={msg.user}
                  className="w-10 h-10 rounded-full object-cover shadow-lg ring-2 ring-white/20"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`font-semibold ${msg.isAdmin ? 'text-blue-700' : 'text-gray-800'}`}>
                      {msg.user}
                    </span>
                    {msg.isAdmin && (
                      <span className="px-2 py-0.5 bg-blue-100/60 backdrop-blur-sm text-blue-700 text-xs font-medium rounded-full border border-blue-200/30">
                        Admin
                      </span>
                    )}
                    <span className="text-xs text-gray-500">{msg.timestamp}</span>
                    {msg.pinned && <Pin className="w-3 h-3 text-yellow-600" />}
                  </div>
                  <p className="text-gray-700 leading-relaxed">{msg.message}</p>
                </div>

                {/* Message Actions - Three Dots */}
                {(hoveredMessage === msg.id || activeDropdown === msg.id) && (
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleDropdown(msg.id)
                      }}
                      className="p-1.5 bg-white/5 backdrop-blur-sm rounded-lg border border-white/30 hover:bg-white/5 transition-all duration-200 opacity-0 group-hover:opacity-100"
                    >
                      <MoreVertical className="w-4 h-4 text-gray-600" />
                    </button>

                    {/* Dropdown Menu */}
                    {activeDropdown === msg.id && (
                      <div className="absolute right-0 top-8 w-48 bg-white/90 backdrop-blur-xl rounded-xl border border-white/30 shadow-2xl z-50 py-2">
                        <button
                          onClick={() => handleMessageAction('reply', msg.id)}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-all duration-200"
                        >
                          <Reply className="w-4 h-4" />
                          <span>Reply</span>
                        </button>
                        <button
                          onClick={() => handleMessageAction('forward', msg.id)}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-all duration-200"
                        >
                          <Forward className="w-4 h-4" />
                          <span>Forward</span>
                        </button>
                        <button
                          onClick={() => handleMessageAction('report', msg.id)}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-orange-600 hover:bg-orange-50/100 transition-all duration-200"
                        >
                          <Flag className="w-4 h-4" />
                          <span>Report</span>
                        </button>
                        <div className="border-t border-gray-200/50 my-1"></div>
                        <button
                          onClick={() => handleMessageAction('delete', msg.id)}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50/100 transition-all duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-6 border-t border-white/10">
            <div className="flex items-center space-x-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={`Message #${currentRoom?.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="w-full pl-4 pr-12 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent shadow-lg"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors">
                  <Smile className="w-5 h-5" />
                </button>
              </div>
              <button
                onClick={handleSendMessage}
                className="p-3 bg-blue-500/80 backdrop-blur-sm text-white rounded-xl hover:bg-blue-600/80 transition-all duration-200 shadow-lg border border-blue-400/30"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Group Settings Modal */}
      {showSettings && (
        <GroupSettings 
          room={currentRoom} 
          onClose={() => setShowSettings(false)} 
        />
      )}
    </>
  )
}

export default GroupChat
