// import Link from 'next/link'
// import Image from 'next/image'

// interface Post {
//   id: number
//   title: string
//   body: string
//   userId: number
// }

// interface Author {
//   id: number
//   name: string
//   email: string
// }

// interface CarPostCardProps {
//   post: Post
//   author: Author | undefined
//   isSmall?: boolean
// }

// export default function CarPostCard({ post, author, isSmall = false }: CarPostCardProps) {
//   const cardClass = isSmall ? 'w-full' : 'w-full max-w-sm'
  
//   // Fixed image URLs that actually work
//   const carImages = [
//     'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&h=600&fit=crop',
//     'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop',
//     'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=600&fit=crop',
//     'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop',
//     'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&h=600&fit=crop',
//     'https://images.unsplash.com/photo-1486754735734-325b5831c3ad?w=800&h=600&fit=crop',
//     'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=600&fit=crop',
//     'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop'
//   ]
  
//   const imageUrl = carImages[post.id % carImages.length]
  
//   return (
//     <div className={`car-card bg-white rounded-lg shadow-md overflow-hidden ${cardClass}`}>
//       <div className="relative h-48">
//         <Image
//           src={imageUrl}
//           alt={post.title}
//           fill
//           className="object-cover"
//           unoptimized
//         />
//       </div>
//       <div className="p-4">
//         <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
//         <p className="text-gray-600 mb-3 text-sm line-clamp-3">
//           {post.body.substring(0, 100)}...
//         </p>
//         <div className="flex items-center mb-3">
//           <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3">
//             <span className="text-xs font-semibold text-gray-600">
//               {author?.name?.charAt(0) || 'U'}
//             </span>
//           </div>
//           <div className="text-sm text-gray-500">
//             <p className="font-medium text-gray-900">{author?.name || 'Unknown'}</p>
//             <p>3 min read</p>
//           </div>
//         </div>
//         <Link 
//           href={`/posts/${post.id}`}
//           className="inline-block bg-primary text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors text-sm font-semibold"
//         >
//           Read full article
//         </Link>
//       </div>
//     </div>
//   )
// }



'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import CarRating from './CarRating'

interface Post {
  id: number
  title: string
  body: string
  userId: number
  category?: string
  tags?: string[]
}

interface Author {
  id: number
  name: string
  email: string
}

interface CarPostCardProps {
  post: Post
  author: Author | undefined
  isSmall?: boolean
}

const categoryConfig: { [key: string]: { icon: string; color: string; name: string } } = {
  suv: { icon: '🚙', color: '#3B82F6', name: 'SUV' },
  ev: { icon: '⚡', color: '#10B981', name: 'Electric' },
  luxury: { icon: '💎', color: '#8B5CF6', name: 'Luxury' },
  sports: { icon: '🏎️', color: '#EF4444', name: 'Sports' },
  sedan: { icon: '🚗', color: '#F59E0B', name: 'Sedan' },
  truck: { icon: '🚚', color: '#6B7280', name: 'Truck' },
}

export default function CarPostCard({ post, author, isSmall = false }: CarPostCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [likes, setLikes] = useState(Math.floor(Math.random() * 50) + 10)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  
  const cardClass = isSmall ? 'w-full' : 'w-full max-w-sm'
  
  // Fixed image URLs that actually work
  const carImages = [
    'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1486754735734-325b5831c3ad?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop'
  ]
  
  const imageUrl = carImages[post.id % carImages.length]
  const category = post.category ? categoryConfig[post.category] : null

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLiked(!isLiked)
    setLikes(prev => isLiked ? prev - 1 : prev + 1)
  }

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsBookmarked(!isBookmarked)
  }

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.body.substring(0, 100) + '...',
        url: `/posts/${post.id}`
      })
    } else {
      navigator.clipboard.writeText(window.location.origin + `/posts/${post.id}`)
      alert('Link copied to clipboard!')
    }
  }
  
  return (
    <div className={`car-card group bg-white rounded-xl shadow-md overflow-hidden ${cardClass} transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-3 border border-gray-100`}>
      <div className="relative h-48 overflow-hidden">
        {/* Image Loading Skeleton */}
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="text-gray-400 text-2xl">🚗</div>
          </div>
        )}
        
        <Image
          src={imageUrl}
          alt={post.title}
          fill
          className={`object-cover transition-all duration-500 group-hover:scale-110 ${
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          unoptimized
          onLoad={() => setIsImageLoaded(true)}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Action buttons overlay */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          <button
            onClick={handleLike}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
              isLiked 
                ? 'bg-red-500 text-white' 
                : 'bg-white/90 text-gray-700 hover:bg-white'
            }`}
          >
            <svg className="w-4 h-4" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <button
            onClick={handleBookmark}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
              isBookmarked 
                ? 'bg-yellow-500 text-white' 
                : 'bg-white/90 text-gray-700 hover:bg-white'
            }`}
          >
            <svg className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
          <button
            onClick={handleShare}
            className="w-8 h-8 bg-white/90 text-gray-700 rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 transform hover:scale-110"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
          </button>
        </div>

        {/* Category Badge */}
        {category && (
          <div className="absolute top-4 left-4">
            <span 
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white shadow-lg"
              style={{ backgroundColor: category.color }}
            >
              <span className="mr-1">{category.icon}</span>
              {category.name}
            </span>
          </div>
        )}

        {/* Read Time Badge */}
        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
            3 min read
          </span>
        </div>
      </div>
      
      <div className="p-5">
        {/* Title */}
        <h3 className="text-lg md:text-xl font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
          {post.title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 mb-4 text-sm line-clamp-3 leading-relaxed">
          {post.body.substring(0, 120)}...
        </p>

        {/* Rating */}
        <div className="mb-4">
          <CarRating 
            postId={post.id} 
            size="sm" 
            interactive={false}
            className="scale-90 transform origin-left"
          />
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {post.tags.slice(0, 2).map((tag, index) => (
              <span 
                key={index} 
                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        
        {/* Author & Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-red-600 rounded-full flex items-center justify-center mr-3">
              <span className="text-xs font-semibold text-white">
                {author?.name?.charAt(0) || 'U'}
              </span>
            </div>
            <div className="text-sm">
              <p className="font-medium text-gray-900">{author?.name || 'Unknown'}</p>
              <p className="text-gray-500">Jan 15, 2024</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 text-sm text-gray-500">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {likes}
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {Math.floor(Math.random() * 200) + 50}
            </span>
          </div>
        </div>
        
        {/* Read More Button */}
        <Link 
          href={`/posts/${post.id}`}
          className="group/button flex items-center justify-center w-full bg-gradient-to-r from-primary to-red-600 text-white px-4 py-3 rounded-lg hover:from-red-600 hover:to-primary transition-all duration-300 text-sm font-semibold transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Read full article
          <svg className="w-4 h-4 ml-2 transform group-hover/button:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  )
}