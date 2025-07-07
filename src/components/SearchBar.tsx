'use client'
import { useState, useEffect } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
  className?: string
}

export default function SearchBar({ onSearch, placeholder = "Search car blogs...", className = "" }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      onSearch(query)
    }, 300) // Debounce search

    return () => clearTimeout(delayedSearch)
  }, [query, onSearch])

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center w-full">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className={`w-full h-12 pl-12 pr-4 border rounded-lg transition-all duration-300 bg-white/95 backdrop-blur-sm ${
              isFocused 
                ? 'border-primary ring-2 ring-primary/20 outline-none' 
                : 'border-gray-300 focus:outline-none'
            }`}
            style={{ minHeight: '48px' }}
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors w-5 h-5 flex items-center justify-center rounded-full hover:bg-gray-100"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
      
      {/* Search suggestions */}
      {query && isFocused && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
          <div className="p-4">
            <p className="text-sm text-gray-600">
              Searching for: <span className="font-semibold text-primary">"{query}"</span>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}