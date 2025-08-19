import React from 'react'
import { Home, Megaphone, Calendar, CreditCard, MessageCircle, ShoppingBag, Users, Star } from 'lucide-react'

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'announcements', label: 'Announcements', icon: Megaphone },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'chat', label: 'Group Chat', icon: MessageCircle },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
    { id: 'community', label: 'Community', icon: Users },
  ]

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 backdrop-blur-xl bg-white/10 border-r border-white/20 p-4">
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-white/30 backdrop-blur-sm border border-white/40 text-gray-800 shadow-lg'
                  : 'text-gray-600 hover:bg-white/20 hover:text-gray-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Batch War Score */}
      <div className="mt-8 p-4 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 backdrop-blur-sm rounded-xl border border-white/30">
        <div className="flex items-center space-x-2 mb-2">
          <Star className="w-5 h-5 text-yellow-600" />
          <h3 className="font-semibold text-gray-800">Batch War</h3>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Batch 21</span>
            <span className="font-bold text-blue-600">2050</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Batch 22</span>
            <span className="font-bold text-green-600">1,880</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Batch 23</span>
            <span className="font-bold text-purple-600">900</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Batch 24</span>
            <span className="font-bold text-purple-600">1200</span>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
