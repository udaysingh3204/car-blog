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
      
      <section className="py-16 bg-dark text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-sm font-semibold mb-4 text-primary">TESTIMONIALS</h3>
              <h2 className="text-4xl font-bold mb-6">What people say about our blog</h2>
              <p className="text-gray-300 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-semibold">JV</span>
                </div>
                <div>
                  <h4 className="font-bold">Jonathan Vallem</h4>
                  <p className="text-gray-400">New York, USA</p>
                </div>
                <div className="ml-auto flex space-x-2">
                  <button className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.slice(4, 8).map((post: any) => {
                const author = users.find((user: any) => user.id === post.userId)
                return <CarPostCard key={post.id} post={post} author={author} isSmall={true} />
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}