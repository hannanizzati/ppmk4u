// components/SearchResults.tsx
import React from "react"

interface SearchResultsProps {
  query: string
  results: { id: number; title: string; type: string }[]
  setActiveTab: (tab: string) => void
}

const SearchResults: React.FC<SearchResultsProps> = ({ query, results, setActiveTab }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Search Results for "{query}"</h2>
      {results.length > 0 ? (
        <ul className="space-y-3">
          {results.map((item) => (
            <li
              key={item.id}
              className="p-4 bg-white shadow rounded-lg cursor-pointer hover:bg-gray-100"
              onClick={() => setActiveTab(item.type)}  // ✅ Go to that tab
            >
              <span className="font-semibold capitalize">[{item.type}]</span> {item.title}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No results found.</p>
      )}
    </div>
  )
}

export default SearchResults
