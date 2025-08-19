import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import Announcements from './components/Announcements'
import Events from './components/Events'
import GroupChat from './components/GroupChat'
import Marketplace from './components/Marketplace'
import Community from './components/Community'
import SearchResults from './components/SearchResult'
import ProfilePage from './components/ProfilePage'
import Payments from './components/Payments'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  // ✅ Centralized data
  const data = {
    announcements: [
      { id: 1, title: "Spring 2025 Semester Registration" },
      { id: 2, title: "Malaysian Embassy Visit - SNU" },
      { id: 3, title: "Winter Break Activity Schedule" },
      { id: 4, title: "TOPIK Exam Preparation Workshop" },
      { id: 5, title: "Scholarship Application Deadline Reminder" },
      { id: 6, title: "Monthly Community Meetup" },
    ],
    events: [
      { id: 7, title: "Korean Language Exchange" },
      { id: 8, title: "Malaysian Food Festival" },
      { id: 9, title: "TOPIK Study Group" },
      { id: 10, title: "Skiing Trip to Pyeongchang" },
      { id: 11, title: "Autumn Cultural Night" },
    ],
    marketplace: [
      { id: 12, title: 'MacBook Pro 13" 2021' },
      { id: 13, title: "IKEA Study Desk" },
      { id: 14, title: "Korean Language Textbooks Set" },
      { id: 15, title: "Winter Jacket - North Face" },
      { id: 16, title: "Rice Cooker - Cuckoo" },
      { id: 17, title: "Badminton Racket Set" },
      { id: 18, title: "Used Laptop for Sale" },
      { id: 19, title: "Used Laptop for Sale" },
    ],
    community: [
      { id: 20, title: "How to find part-time jobs as an international student?" },
      { id: 21, title: "My experience with Korean healthcare system" },
      { id: 22, title: "Best Korean language learning apps?" },
      { id: 23, title: "Tips for surviving Korean winter" },
      { id: 24, title: "Homesickness and how I dealt with it" },
      { id: 25, title: "Best places to buy halal food in Seoul" },
    ]
  }

  // ✅ Handle search from Navbar
  const handleSearch = (query: string) => {
    const allData = [
      ...data.announcements.map(item => ({ ...item, type: 'announcements' })),
      ...data.events.map(item => ({ ...item, type: 'events' })),
      ...data.marketplace.map(item => ({ ...item, type: 'marketplace' })),
      ...data.community.map(item => ({ ...item, type: 'community' }))
    ]

    const results = allData.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase())
    )

    setSearchQuery(query)
    setSearchResults(results)
    setActiveTab("search") // switch to search results page
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard setActiveTab={setActiveTab} onQuickSearch={handleSearch} />
      case 'announcements':
        return <Announcements setActiveTab={setActiveTab} onTagClick={handleSearch} />
      case 'events':
        return <Events />
      case 'chat':
        return <GroupChat />
      case 'marketplace':
        return <Marketplace />
      case 'community':
        return <Community />
      case 'payments':
        return <Payments />
      case 'profile':
        return <ProfilePage />
      case 'search':
        return <SearchResults query={searchQuery} results={searchResults} setActiveTab={setActiveTab} />
      default:
        return <Dashboard setActiveTab={setActiveTab} onQuickSearch={handleSearch} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 font-inter">
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-cyan-400/20 to-teal-400/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-300/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* ✅ Pass search handler + profile navigation */}
        <Navbar onSearch={handleSearch} onProfileClick={() => setActiveTab('profile')} />

        <div className="flex">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <main className="flex-1 p-6 ml-64 mt-20">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  )
}

export default App
