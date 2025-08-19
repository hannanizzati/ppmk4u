import React, { useState } from 'react'
import { X, Settings, UserPlus, LogOut, Shield, UserMinus, Crown, Users, Bell, Lock, Trash2, Edit3 } from 'lucide-react'

interface GroupSettingsProps {
  room: any
  onClose: () => void
}

const GroupSettings: React.FC<GroupSettingsProps> = ({ room, onClose }) => {
  const [activeTab, setActiveTab] = useState('general')

  const participants = [
    { id: 1, name: 'PPMK Admin', role: 'admin', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face', online: true },
    { id: 2, name: 'Siti Nurhaliza', role: 'member', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face', online: true },
    { id: 3, name: 'Ahmad Rahman', role: 'moderator', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face', online: false },
    { id: 4, name: 'Lim Wei Ming', role: 'member', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face', online: true },
    { id: 5, name: 'Fatimah Ali', role: 'member', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face', online: true },
    { id: 6, name: 'Raj Kumar', role: 'member', avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=40&h=40&fit=crop&crop=face', online: false },
  ]

  const tabs = [
    { id: 'general', name: 'General', icon: Settings },
    { id: 'participants', name: 'Participants', icon: Users },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'privacy', name: 'Privacy', icon: Lock },
  ]

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Crown className="w-4 h-4 text-yellow-500" />
      case 'moderator': return <Shield className="w-4 h-4 text-blue-500" />
      default: return null
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'text-yellow-600 bg-yellow-100/60'
      case 'moderator': return 'text-blue-600 bg-blue-100/60'
      default: return 'text-slate-600 bg-slate-100/60'
    }
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50/20 via-cyan-50/20 to-teal-50/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 backdrop-blur-xl rounded-2xl border border-white/30 shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-black/5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Settings className="w-6 h-6 text-slate-700" />
            <div>
              <h2 className="text-xl font-bold text-slate-800">{room?.name} Settings</h2>
              <p className="text-sm text-slate-600">{room?.members} members</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-200"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        <div className="flex h-[calc(90vh-8rem)]">
          {/* Sidebar */}
          <div className="w-64 bg-white/50 backdrop-blur-sm border-r border-white/20 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 backdrop-blur-sm border border-white/30 text-slate-800'
                        : 'text-slate-600 hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {activeTab === 'general' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Group Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Group Name</label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={room?.name}
                          className="flex-1 px-3 py-2 bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                          readOnly
                        />
                        <button className="p-2 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-200">
                          <Edit3 className="w-4 h-4 text-slate-600" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                      <textarea
                        className="w-full px-3 py-2 bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400/50 resize-none"
                        rows={3}
                        placeholder="Add a group description..."
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center space-x-3 px-4 py-3 bg-green-100/60 backdrop-blur-sm border border-green-200/30 rounded-xl text-green-700 hover:bg-green-200/60 transition-all duration-200">
                      <UserPlus className="w-5 h-5" />
                      <span>Invite Members</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 px-4 py-3 bg-red-100/60 backdrop-blur-sm border border-red-200/30 rounded-xl text-red-700 hover:bg-red-200/60 transition-all duration-200">
                      <LogOut className="w-5 h-5" />
                      <span>Leave Group</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 px-4 py-3 bg-red-100/60 backdrop-blur-sm border border-red-200/30 rounded-xl text-red-700 hover:bg-red-200/60 transition-all duration-200">
                      <Trash2 className="w-5 h-5" />
                      <span>Delete Group</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'participants' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-slate-800">Participants ({participants.length})</h3>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-100/60 backdrop-blur-sm border border-blue-200/30 rounded-xl text-blue-700 hover:bg-blue-200/60 transition-all duration-200">
                    <UserPlus className="w-4 h-4" />
                    <span>Add Member</span>
                  </button>
                </div>
                <div className="space-y-3">
                  {participants.map((participant) => (
                    <div key={participant.id} className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <img
                            src={participant.avatar}
                            alt={participant.name}
                            className="w-10 h-10 rounded-full object-cover ring-2 ring-white/20"
                          />
                          {participant.online && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="font-medium text-slate-800">{participant.name}</p>
                            {getRoleIcon(participant.role)}
                          </div>
                          <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${getRoleColor(participant.role)}`}>
                            {participant.role}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {participant.role !== 'admin' && (
                          <>
                            <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30 hover:bg-white/30 transition-all duration-200">
                              <Shield className="w-4 h-4 text-slate-600" />
                            </button>
                            <button className="p-2 bg-red-100/60 backdrop-blur-sm rounded-lg border border-red-200/30 hover:bg-red-200/60 transition-all duration-200">
                              <UserMinus className="w-4 h-4 text-red-600" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-800">Notification Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl">
                    <div>
                      <p className="font-medium text-slate-800">All Messages</p>
                      <p className="text-sm text-slate-600">Get notified for every message</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl">
                    <div>
                      <p className="font-medium text-slate-800">Mentions Only</p>
                      <p className="text-sm text-slate-600">Only when someone mentions you</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl">
                    <div>
                      <p className="font-medium text-slate-800">Mute Group</p>
                      <p className="text-sm text-slate-600">Turn off all notifications</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-800">Privacy & Security</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl">
                    <h4 className="font-medium text-slate-800 mb-2">Group Visibility</h4>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-3">
                        <input type="radio" name="visibility" className="text-blue-600" defaultChecked />
                        <span className="text-slate-700">Public - Anyone can find and join</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="radio" name="visibility" className="text-blue-600" />
                        <span className="text-slate-700">Private - Invite only</span>
                      </label>
                    </div>
                  </div>
                  <div className="p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl">
                    <h4 className="font-medium text-slate-800 mb-2">Message History</h4>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-3">
                        <input type="radio" name="history" className="text-blue-600" defaultChecked />
                        <span className="text-slate-700">Visible to all members</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="radio" name="history" className="text-blue-600" />
                        <span className="text-slate-700">Visible to new members from join date</span>
                      </label>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl">
                    <div>
                      <p className="font-medium text-slate-800">Read Receipts</p>
                      <p className="text-sm text-slate-600">Show when messages are read</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GroupSettings
