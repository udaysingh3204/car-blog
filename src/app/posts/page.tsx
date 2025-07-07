// import CarPostCard from '../../components/CarPostCard'

// async function getPosts() {
//   try {
//     const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
//       cache: 'force-cache'
//     })
//     if (!res.ok) throw new Error('Failed to fetch posts')
//     return res.json()
//   } catch (error) {
//     console.error('Error fetching posts:', error)
//     return []
//   }
// }

// async function getUsers() {
//   try {
//     const res = await fetch('https://jsonplaceholder.typicode.com/users', {
//       cache: 'force-cache'
//     })
//     if (!res.ok) throw new Error('Failed to fetch users')
//     return res.json()
//   } catch (error) {
//     console.error('Error fetching users:', error)
//     return []
//   }
// }

// export default async function BlogsPage() {
//   const [posts, users] = await Promise.all([getPosts(), getUsers()])

//   return (
//     <div className="pt-16">
//       <section className="hero-bg py-24">
//         <div className="max-w-7xl mx-auto px-6 text-center">
//           <h1 className="text-5xl font-bold text-white mb-6">
//             Your Journey<br/>
//             Your Car<br/>
//             <span className="text-primary">Your Way</span>
//           </h1>
//           <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
//           </p>
//           <button className="bg-primary text-white px-8 py-4 rounded-md hover:bg-red-600 transition-colors font-semibold">
//             Subscribe ✓
//           </button>
//         </div>
//       </section>
      
//       <section className="py-16 bg-white">
//         <div className="max-w-7xl mx-auto px-6">
//           <h2 className="text-3xl font-bold mb-12">All posts</h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {posts.map((post: any) => {
//               const author = users.find((user: any) => user.id === post.userId)
//               return <CarPostCard key={post.id} post={post} author={author} />
//             })}
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }



'use client'
import { useState, useEffect, useMemo } from 'react'
import CarPostCard from '../../components/CarPostCard'
import SearchBar from '../../components/SearchBar'
import CategoryFilter, { Category } from '../../components/CategoryFilter'
import Pagination from '../../components/Pagination'
// import LoadingSpinner from '../../components/LoadingSpinner'

interface Post {
  id: number
  title: string
  body: string
  userId: number
  category?: string
  tags?: string[]
}

interface User {
  id: number
  name: string
  email: string
}

const POSTS_PER_PAGE = 12

// Static categories with fake data
const categories: Category[] = [
  { id: 'suv', name: 'SUV', icon: '🚙', color: '#3B82F6', count: 0 },
  { id: 'ev', name: 'Electric', icon: '⚡', color: '#10B981', count: 0 },
  { id: 'luxury', name: 'Luxury', icon: '💎', color: '#8B5CF6', count: 0 },
  { id: 'sports', name: 'Sports', icon: '🏎️', color: '#EF4444', count: 0 },
  { id: 'sedan', name: 'Sedan', icon: '🚗', color: '#F59E0B', count: 0 },
  { id: 'truck', name: 'Truck', icon: '🚚', color: '#6B7280', count: 0 },
]

export default function BlogsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'title'>('newest')

  // Assign random categories to posts
  const assignCategories = (posts: Post[]) => {
    return posts.map(post => ({
      ...post,
      category: categories[post.id % categories.length].id,
      tags: [
        categories[post.id % categories.length].name,
        categories[(post.id + 1) % categories.length].name
      ]
    }))
  }

  // Update category counts
  const updateCategoryCounts = (posts: Post[]) => {
    const counts: { [key: string]: number } = {}
    posts.forEach(post => {
      if (post.category) {
        counts[post.category] = (counts[post.category] || 0) + 1
      }
    })
    
    return categories.map(cat => ({
      ...cat,
      count: counts[cat.id] || 0
    }))
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [postsRes, usersRes] = await Promise.all([
          fetch('https://jsonplaceholder.typicode.com/posts'),
          fetch('https://jsonplaceholder.typicode.com/users')
        ])
        
        if (!postsRes.ok || !usersRes.ok) {
          throw new Error('Failed to fetch data')
        }
        
        const postsData = await postsRes.json()
        const usersData = await usersRes.json()
        
        const postsWithCategories = assignCategories(postsData)
        setPosts(postsWithCategories)
        setUsers(usersData)
      } catch (err) {
        setError('Failed to load blog posts. Please try again later.')
        console.error('Error fetching data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filter and sort posts
  const filteredAndSortedPosts = useMemo(() => {
    let filtered = posts

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.body.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory)
    }

    // Sort posts
    switch (sortBy) {
      case 'newest':
        filtered = [...filtered].reverse()
        break
      case 'oldest':
        // Already in order
        break
      case 'title':
        filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title))
        break
    }

    return filtered
  }, [posts, searchQuery, selectedCategory, sortBy])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedPosts.length / POSTS_PER_PAGE)
  const paginatedPosts = filteredAndSortedPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  )

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategory, sortBy])

  const categoriesWithCounts = updateCategoryCounts(posts)

  // if (loading) {
  //   return (
  //     <div className="pt-16">
  //       <section className="hero-bg py-24">
  //         <div className="max-w-7xl mx-auto px-6 text-center">
  //           <h1 className="text-5xl font-bold text-white mb-6">
  //             Car Blog <span className="text-primary">Posts</span>
  //           </h1>
  //           <p className="text-xl text-gray-200">
  //             Discover the latest automotive insights and reviews
  //           </p>
  //         </div>
  //       </section>
  //       <LoadingSpinner />
  //     </div>
  //   )
  // }

  if (error) {
    return (
      <div className="pt-16">
        <section className="hero-bg py-24">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-5xl font-bold text-white mb-6">
              Car Blog <span className="text-primary">Posts</span>
            </h1>
          </div>
        </section>
        <div className="py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-primary text-white px-6 py-3 rounded-md hover:bg-red-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="hero-bg py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Car Blog <span className="text-primary">Posts</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Discover the latest automotive insights, reviews, and industry trends
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <SearchBar 
              onSearch={setSearchQuery}
              placeholder="Search for car reviews, tips, or specific models..."
              className="w-full"
            />
          </div>
        </div>
      </section>
      
      {/* Filters and Content */}
      <section className="py-8 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Category Filter */}
          <CategoryFilter
            categories={categoriesWithCounts}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            className="mb-8"
          />

          {/* Sort and Results Info */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedCategory === 'all' ? 'All Posts' : 
                 categoriesWithCounts.find(c => c.id === selectedCategory)?.name + ' Cars'}
              </h2>
              {searchQuery && (
                <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  Search: "{searchQuery}"
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title">Title A-Z</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              {filteredAndSortedPosts.length === 0 ? (
                <span className="text-red-600">No posts found matching your criteria</span>
              ) : (
                <>
                  Showing {filteredAndSortedPosts.length} post{filteredAndSortedPosts.length !== 1 ? 's' : ''}
                  {searchQuery && ` for "${searchQuery}"`}
                  {selectedCategory !== 'all' && ` in ${categoriesWithCounts.find(c => c.id === selectedCategory)?.name}`}
                </>
              )}
            </p>
          </div>

          {/* Posts Grid */}
          {paginatedPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {paginatedPosts.map((post, index) => {
                const author = users.find((user) => user.id === post.userId)
                return (
                  <div 
                    key={post.id}
                    className="transform transition-all duration-300"
                    style={{ 
                      animationDelay: `${index * 100}ms`,
                      animation: 'fadeInUp 0.6s ease-out forwards'
                    }}
                  >
                    <CarPostCard post={post} author={author} />
                  </div>
                )
              })}
            </div>
          ) : (
            // No Results State
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No posts found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search terms or category filters
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setSearchQuery('')}
                  className="bg-gray-100 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Clear Search
                </button>
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="bg-primary text-white px-6 py-3 rounded-md hover:bg-red-600 transition-colors"
                >
                  Show All Categories
                </button>
              </div>
            </div>
          )}

          {/* Pagination */}
          {paginatedPosts.length > 0 && totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalItems={filteredAndSortedPosts.length}
              itemsPerPage={POSTS_PER_PAGE}
              className="mt-12"
            />
          )}
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl font-bold text-primary mb-2">{posts.length}</div>
              <div className="text-gray-600">Total Posts</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl font-bold text-primary mb-2">{categories.length}</div>
              <div className="text-gray-600">Categories</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl font-bold text-primary mb-2">{users.length}</div>
              <div className="text-gray-600">Authors</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl font-bold text-primary mb-2">
                {searchQuery ? filteredAndSortedPosts.length : posts.length}
              </div>
              <div className="text-gray-600">
                {searchQuery ? 'Search Results' : 'Available Reviews'}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}