'use client'
import { useState } from 'react'

export interface Category {
  id: string
  name: string
  icon: string
  color: string
  count: number
}

interface CategoryFilterProps {
  categories: Category[]
  selectedCategory: string
  onCategoryChange: (categoryId: string) => void
  className?: string
}

export default function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  className = "" 
}: CategoryFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className={`${className}`}>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="md:hidden w-full flex items-center justify-between p-3 bg-gray-100 rounded-lg mb-4"
      >
        <span className="font-medium">Categories</span>
        <svg 
          className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Category Pills */}
      <div className={`${isExpanded ? 'block' : 'hidden'} md:block`}>
        <div className="flex flex-wrap gap-2 md:gap-3">
          {/* All Categories */}
          <button
            onClick={() => onCategoryChange('all')}
            className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
              selectedCategory === 'all'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="mr-2">🚗</span>
            All Cars
            <span className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded-full">
              {categories.reduce((total, cat) => total + cat.count, 0)}
            </span>
          </button>

          {/* Individual Categories */}
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category.id
                  ? `bg-primary text-white shadow-lg`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              style={{
                backgroundColor: selectedCategory === category.id ? category.color : undefined
              }}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
              <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                selectedCategory === category.id 
                  ? 'bg-white/20' 
                  : 'bg-gray-200'
              }`}>
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* Category Stats */}
        <div className="mt-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
          <h4 className="font-semibold text-gray-700 mb-2">Browse by Category</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600">
            {categories.map((category) => (
              <div key={`${category.id}-stat`} className="flex items-center justify-between">
                <span className="flex items-center">
                  <span className="mr-1">{category.icon}</span>
                  {category.name}
                </span>
                <span className="font-medium">{category.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}