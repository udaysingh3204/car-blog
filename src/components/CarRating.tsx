'use client'
import { useState } from 'react'

interface CarRatingProps {
  postId: number
  initialRating?: number
  showDetails?: boolean
  size?: 'sm' | 'md' | 'lg'
  interactive?: boolean
  className?: string
}

interface RatingCategory {
  name: string
  score: number
  icon: string
}

export default function CarRating({ 
  postId, 
  initialRating, 
  showDetails = false, 
  size = 'md',
  interactive = true,
  className = "" 
}: CarRatingProps) {
  // Generate consistent ratings based on post ID
  const generateRating = (id: number) => {
    const base = 3.5 + (id % 10) * 0.15
    return Math.min(5, Math.max(3, base))
  }

  const [rating, setRating] = useState(initialRating || generateRating(postId))
  const [userRating, setUserRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [hasRated, setHasRated] = useState(false)

  // Generate detailed ratings for different aspects
  const detailedRatings: RatingCategory[] = [
    { name: 'Performance', score: generateRating(postId + 1), icon: '🏎️' },
    { name: 'Comfort', score: generateRating(postId + 2), icon: '🛋️' },
    { name: 'Design', score: generateRating(postId + 3), icon: '🎨' },
    { name: 'Value', score: generateRating(postId + 4), icon: '💰' },
    { name: 'Technology', score: generateRating(postId + 5), icon: '📱' },
  ]

  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  const handleRatingClick = (newRating: number) => {
    if (!interactive) return
    
    setUserRating(newRating)
    setHasRated(true)
    
    // Simulate updating the overall rating
    const totalRatings = Math.floor(Math.random() * 100) + 20
    const newAverage = ((rating * totalRatings) + newRating) / (totalRatings + 1)
    setRating(newAverage)
  }

  const renderStars = (currentRating: number, onRate?: (rating: number) => void, hover?: boolean) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onRate?.(star)}
            onMouseEnter={() => hover && setHoverRating(star)}
            onMouseLeave={() => hover && setHoverRating(0)}
            disabled={!interactive}
            className={`transition-all duration-200 ${
              interactive ? 'transform hover:scale-110 cursor-pointer' : 'cursor-default'
            }`}
          >
            <svg
              className={`${sizes[size]} transition-colors duration-200 ${
                star <= (hover ? hoverRating : currentRating)
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
              fill={star <= currentRating ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className={`${className}`}>
      {/* Main Rating Display */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          {renderStars(rating)}
          <span className="text-sm font-medium text-gray-700">
            {rating.toFixed(1)}
          </span>
          <span className="text-xs text-gray-500">
            ({Math.floor(Math.random() * 200) + 50} reviews)
          </span>
        </div>
      </div>

      {/* User Rating Section */}
      {interactive && (
        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium text-gray-700 mb-2">Rate this car:</p>
          <div className="flex items-center space-x-2">
            {renderStars(userRating || hoverRating, handleRatingClick, true)}
            {hasRated && (
              <span className="text-sm text-green-600 ml-3">
                ✓ Thanks for rating!
              </span>
            )}
          </div>
        </div>
      )}

      {/* Detailed Ratings */}
      {showDetails && (
        <div className="mt-4 space-y-3">
          <h4 className="font-semibold text-gray-800">Detailed Ratings</h4>
          {detailedRatings.map((category, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{category.icon}</span>
                <span className="text-sm text-gray-700">{category.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                {renderStars(category.score)}
                <span className="text-sm text-gray-600 w-8">
                  {category.score.toFixed(1)}
                </span>
              </div>
            </div>
          ))}
          
          {/* Overall Score */}
          <div className="mt-4 pt-3 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-800">Overall Score</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-500"
                    style={{ width: `${(rating / 5) * 100}%` }}
                  ></div>
                </div>
                <span className="text-lg font-bold text-gray-800">
                  {rating.toFixed(1)}/5
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rating Distribution (optional) */}
      {showDetails && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <h5 className="text-sm font-medium text-gray-700 mb-2">Rating Distribution</h5>
          {[5, 4, 3, 2, 1].map((stars) => {
            const percentage = Math.random() * 40 + 10 // Random distribution
            return (
              <div key={stars} className="flex items-center space-x-2 text-xs">
                <span className="w-3">{stars}</span>
                <svg className="w-3 h-3 text-yellow-400 fill-current">
                  <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yellow-400 transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="w-8 text-right">{percentage.toFixed(0)}%</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}