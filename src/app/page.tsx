import HeroSection from './../components/HeroSection'
import CategorySection from './../components/CategorySection'
import CarPostCard from './../components/CarPostCard'

async function getPosts() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=8', {
      cache: 'force-cache'
    })
    if (!res.ok) throw new Error('Failed to fetch posts')
    return res.json()
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

async function getUsers() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users', {
      cache: 'force-cache'
    })
    if (!res.ok) throw new Error('Failed to fetch users')
    return res.json()
  } catch (error) {
    console.error('Error fetching users:', error)
    return []
  }
}

export default async function Home() {
  const [posts, users] = await Promise.all([getPosts(), getUsers()])

  return (
    <div className="pt-16">
      <HeroSection />
      
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Latest</h2>
            <button className="text-primary hover:text-red-600 transition-colors">See all</button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              {posts.slice(0, 1).map((post: any) => {
                const author = users.find((user: any) => user.id === post.userId)
                return (
                  <div key={post.id} className="relative">
                    <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                      <img 
                        src={`https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&h=400&fit=crop&auto=format`}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="mb-2">
                      <span className="text-sm text-gray-500">By {author?.name || 'Unknown'} • March 17, 2024</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{post.title}</h3>
                    <p className="text-gray-600 mb-4">{post.body.substring(0, 200)}...</p>
                    <button className="bg-primary text-white px-6 py-3 rounded-md hover:bg-red-600 transition-colors">
                      Read more
                    </button>
                  </div>
                )
              })}
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Trending Blogs</h3>
                <button className="text-primary hover:text-red-600 transition-colors">See all</button>
              </div>
              <div className="space-y-4">
                {posts.slice(1, 5).map((post: any, index: number) => {
                  const author = users.find((user: any) => user.id === post.userId)
                  const isHighlighted = index === 1
                  return (
                    <div key={post.id} className={`p-4 rounded-lg ${isHighlighted ? 'bg-primary text-white' : 'border border-gray-200'}`}>
                      <div className="text-sm mb-2 opacity-70">
                        By {author?.name || 'Unknown'} • Aug 23, 2023
                      </div>
                      <h4 className="font-bold">{post.title.substring(0, 60)}...</h4>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">New Technology</h2>
            <button className="text-primary hover:text-red-600 transition-colors">See all</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {posts.slice(0, 4).map((post: any) => {
              const author = users.find((user: any) => user.id === post.userId)
              return <CarPostCard key={post.id} post={post} author={author} isSmall={true} />
            })}
          </div>
        </div>
      </section>
      
      <CategorySection />
      
      {/* Fixed Testimonial Section */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h3 className="text-sm font-semibold mb-4 text-primary uppercase tracking-wider">TESTIMONIALS</h3>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">What people say about our blog</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Hear from car enthusiasts who trust our reviews and insights to make informed automotive decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Testimonial Content */}
            <div className="order-2 lg:order-1">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 relative">
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 text-gray-300">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                  </svg>
                </div>
                
                {/* Testimonial Text */}
                <blockquote className="text-lg text-gray-700 mb-6 leading-relaxed italic">
                  "This car blog has been my go-to resource for automotive insights. The detailed reviews and honest opinions have helped me make the best car purchase decisions. Highly recommended for any car enthusiast!"
                </blockquote>
                
                {/* Customer Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary to-red-600 rounded-full flex items-center justify-center mr-4 shadow-lg">
                      <span className="text-white font-bold text-lg">JV</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">Jonathan Vallem</h4>
                      <p className="text-gray-500">Car Enthusiast • New York, USA</p>
                    </div>
                  </div>
                  
                  {/* Navigation Arrows */}
                  <div className="flex space-x-2">
                    <button className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 hover:border-primary transition-all duration-300 transform hover:scale-110 shadow-sm">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button className="w-10 h-10 bg-primary border border-primary rounded-full flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all duration-300 transform hover:scale-110 shadow-sm">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Rating */}
                <div className="flex items-center mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">5.0 • Verified Customer</span>
                </div>
              </div>
            </div>

            {/* Car Post Cards */}
            <div className="order-1 lg:order-2">
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Latest Reviews</h3>
                <p className="text-gray-600">Discover our most recent car reviews and insights</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {posts.slice(4, 8).map((post: any, index: number) => {
                  const author = users.find((user: any) => user.id === post.userId)
                  return (
                    <div 
                      key={post.id}
                      className="transform transition-all duration-300 hover:scale-105"
                      style={{ 
                        animationDelay: `${index * 150}ms`,
                        animation: 'fadeInUp 0.6s ease-out forwards'
                      }}
                    >
                      <CarPostCard post={post} author={author} isSmall={true} />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Additional Testimonials Summary */}
          <div className="mt-16 text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">50K+</div>
                <div className="text-gray-600">Monthly Readers</div>
              </div>
              <div className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <div className="text-gray-600">Car Reviews</div>
              </div>
              <div className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">4.9★</div>
                <div className="text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}