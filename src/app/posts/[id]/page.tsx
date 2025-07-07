// import Image from 'next/image'
// import Link from 'next/link'
// import CarSpecs from '../../../components/CarSpecs'

// async function getPost(id: string) {
//   try {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
//       cache: 'force-cache'
//     })
//     if (!res.ok) throw new Error('Failed to fetch post')
//     return res.json()
//   } catch (error) {
//     console.error('Error fetching post:', error)
//     return null
//   }
// }

// async function getUser(userId: number) {
//   try {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
//       cache: 'force-cache'
//     })
//     if (!res.ok) throw new Error('Failed to fetch user')
//     return res.json()
//   } catch (error) {
//     console.error('Error fetching user:', error)
//     return null
//   }
// }

// export default async function PostDetail({ params }: { params: { id: string } }) {
//   const post = await getPost(params.id)
//   const author = post ? await getUser(post.userId) : null

//   if (!post) {
//     return (
//       <div className="pt-16 min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
//           <Link href="/" className="text-primary hover:text-red-600">
//             Return Home
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="pt-16">
//       <div className="relative h-96 bg-gray-900">
//         <Image
//           src={`https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1600&h=600&fit=crop&auto=format`}
//           alt={post.title}
//           fill
//           className="object-cover"
//           unoptimized
//         />
//         <div className="absolute inset-0 bg-black bg-opacity-40"></div>
//       </div>
      
//       <div className="max-w-4xl mx-auto px-6 py-12">
//         <div className="mb-8">
//           <Link 
//             href="/"
//             className="inline-flex items-center text-primary hover:text-red-600 transition-colors mb-6"
//           >
//             <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//             </svg>
//             Back to Home
//           </Link>
          
//           <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
//             {post.title}
//           </h1>
          
//           <div className="flex items-center mb-8">
//             <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-4">
//               <span className="text-lg font-semibold text-gray-600">
//                 {author?.name?.charAt(0) || 'U'}
//               </span>
//             </div>
//             <div>
//               <p className="font-semibold text-lg">{author?.name || 'Unknown Author'}</p>
//               <p className="text-gray-500">
//                 Email: {author?.email || 'No email available'} • Jan 10, 2024 • 3 Min Read
//               </p>
//             </div>
//           </div>
//         </div>
        
//         <div className="prose prose-lg max-w-none mb-8">
//           <h2 className="text-2xl font-bold mb-4">Full Post Content</h2>
//           <p className="text-gray-700 mb-6 leading-relaxed">
//             {post.body}
//           </p>
          
//           <h2 className="text-2xl font-bold mb-4">About This Car Review</h2>
//           <p className="text-gray-700 mb-6 leading-relaxed">
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec. Scelerisque viverra mauris in aliquam sem. At risus viverra adipiscing at in tellus. Sociis natoque penatibus et magnis dis parturient montes. Ridiculus mus mauris vitae ultricies leo. Neque egestas congue quisque egestas diam. Risus in hendrerit gravida rutrum quisque non.
//           </p>
          
//           <ul className="list-disc list-inside mb-8 text-gray-700">
//             <li className="mb-2">Performance and handling analysis</li>
//             <li className="mb-2">Interior and exterior design review</li>
//             <li className="mb-2">Technology and safety features overview</li>
//             <li className="mb-2">Value for money assessment</li>
//           </ul>
//         </div>

//         {/* Car Specifications Section */}
//         <CarSpecs postId={parseInt(params.id)} />
        
//         <div className="mt-12">
//           <h3 className="text-2xl font-bold mb-6">Related Categories</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {[
//               { title: 'Car Reviews', icon: '🚗', desc: 'Comprehensive vehicle reviews and comparisons' },
//               { title: 'Maintenance Tips', icon: '🔧', desc: 'Expert advice on car care and maintenance' },
//               { title: 'Car Modifications', icon: '⚙️', desc: 'Performance upgrades and customization guides' },
//               { title: 'Driving Tips', icon: '🛣️', desc: 'Safe driving techniques and road trip advice' }
//             ].map((category, index) => (
//               <div key={index} className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
//                 <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
//                   <span className="text-2xl">{category.icon}</span>
//                 </div>
//                 <h4 className="font-bold mb-2">{category.title}</h4>
//                 <p className="text-gray-600 text-sm">{category.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }



import Image from 'next/image'
import Link from 'next/link'
import CarSpecs from '../../../components/CarSpecs'
import CarRating from '../../../components/CarRating'

async function getPost(id: string) {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      cache: 'force-cache'
    })
    if (!res.ok) throw new Error('Failed to fetch post')
    return res.json()
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

async function getUser(userId: number) {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
      cache: 'force-cache'
    })
    if (!res.ok) throw new Error('Failed to fetch user')
    return res.json()
  } catch (error) {
    console.error('Error fetching user:', error)
    return null
  }
}

export default async function PostDetail({ params }: { params: { id: string } }) {
  const post = await getPost(params.id)
  const author = post ? await getUser(post.userId) : null

  if (!post) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🚗</div>
          <h1 className="text-4xl font-bold mb-4 text-gray-800">Post Not Found</h1>
          <p className="text-gray-600 mb-6">The car review you're looking for doesn't exist or has been moved.</p>
          <Link 
            href="/posts" 
            className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-md hover:bg-red-600 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Browse All Posts
          </Link>
        </div>
      </div>
    )
  }

  // Generate some sample related posts
  const relatedPosts = [
    { id: parseInt(params.id) + 1, title: "Similar Car Review #1" },
    { id: parseInt(params.id) + 2, title: "Similar Car Review #2" },
    { id: parseInt(params.id) + 3, title: "Similar Car Review #3" },
  ]

  return (
    <div className="pt-16">
      {/* Hero Image */}
      <div className="relative h-96 md:h-[500px] bg-gray-900">
        <Image
          src={`https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1600&h=600&fit=crop&auto=format`}
          alt={post.title}
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        
        {/* Floating Action Buttons */}
        <div className="absolute top-6 right-6 flex space-x-3">
          <button className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors transform hover:scale-110">
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
          <button className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors transform hover:scale-110">
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 -mt-20 relative z-10">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="bg-white rounded-xl shadow-xl p-6 md:p-8">
              {/* Breadcrumb */}
              <nav className="mb-6">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                  <span>•</span>
                  <Link href="/posts" className="hover:text-primary transition-colors">Blog</Link>
                  <span>•</span>
                  <span className="text-gray-700">Car Review</span>
                </div>
              </nav>

              {/* Article Header */}
              <header className="mb-8">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-gray-900">
                  {post.title}
                </h1>
                
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-red-600 rounded-full flex items-center justify-center mr-4">
                      <span className="text-lg font-semibold text-white">
                        {author?.name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-lg text-gray-900">{author?.name || 'Unknown Author'}</p>
                      <p className="text-gray-500">
                        Email: {author?.email || 'No email available'} • Jan 10, 2024 • 5 Min Read
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>{Math.floor(Math.random() * 500) + 100} views</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span>{Math.floor(Math.random() * 50) + 10} likes</span>
                    </div>
                  </div>
                </div>

                {/* Rating Section */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <CarRating 
                    postId={parseInt(params.id)} 
                    showDetails={true}
                    size="lg"
                    interactive={true}
                  />
                </div>
              </header>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Full Post Content</h2>
                <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                  {post.body}
                </p>
                
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Comprehensive Car Analysis</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec. Scelerisque viverra mauris in aliquam sem. At risus viverra adipiscing at in tellus. Sociis natoque penatibus et magnis dis parturient montes. Ridiculus mus mauris vitae ultricies leo. Neque egestas congue quisque egestas diam. Risus in hendrerit gravida rutrum quisque non.
                </p>

                <h3 className="text-xl font-bold mb-3 text-gray-900">Key Highlights</h3>
                <ul className="list-disc list-inside mb-8 text-gray-700 space-y-2">
                  <li>Outstanding performance and handling characteristics</li>
                  <li>Premium interior design with cutting-edge technology</li>
                  <li>Advanced safety features and driver assistance systems</li>
                  <li>Excellent fuel efficiency for its class</li>
                  <li>Competitive pricing in the luxury segment</li>
                </ul>

                <h3 className="text-xl font-bold mb-3 text-gray-900">Driving Experience</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  The driving experience is where this vehicle truly shines. From the moment you turn the key, you can feel the precision engineering that went into every component. The steering response is immediate and accurate, providing excellent feedback from the road surface.
                </p>
              </div>

              {/* Car Specifications Section */}
              <CarSpecs postId={parseInt(params.id)} />

              {/* Tags Section */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-3">Tags:</h4>
                <div className="flex flex-wrap gap-2">
                  {['Car Review', 'Automotive', 'Performance', 'Luxury', 'Technology'].map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-primary hover:text-white transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Share Section */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-3">Share this article:</h4>
                <div className="flex space-x-3">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm">
                    Facebook
                  </button>
                  <button className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition-colors text-sm">
                    Twitter
                  </button>
                  <button className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-900 transition-colors text-sm">
                    LinkedIn
                  </button>
                  <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors text-sm">
                    Copy Link
                  </button>
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              {/* Quick Rating */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-bold text-lg mb-4 text-gray-900">Quick Rating</h3>
                <CarRating 
                  postId={parseInt(params.id)} 
                  size="md"
                  interactive={true}
                />
              </div>

              {/* Related Posts */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-bold text-lg mb-4 text-gray-900">Related Reviews</h3>
                <div className="space-y-4">
                  {relatedPosts.map((relatedPost) => (
                    <Link 
                      key={relatedPost.id}
                      href={`/posts/${relatedPost.id}`}
                      className="block group"
                    >
                      <div className="flex space-x-3">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={`https://images.unsplash.com/photo-${1550355291 + relatedPost.id}-bbee04a92027?w=100&h=100&fit=crop&auto=format`}
                            alt={relatedPost.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                            {relatedPost.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">2 min read</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-gradient-to-br from-primary to-red-600 rounded-xl shadow-lg p-6 text-white">
                <h3 className="font-bold text-lg mb-2">Stay Updated</h3>
                <p className="text-sm opacity-90 mb-4">Get the latest car reviews delivered to your inbox</p>
                <div className="space-y-3">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 rounded-md text-gray-900 text-sm"
                  />
                  <button className="w-full bg-white text-primary py-2 rounded-md hover:bg-gray-100 transition-colors text-sm font-semibold">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Categories */}
        <div className="mt-16 mb-12">
          <h3 className="text-2xl font-bold mb-6 text-center">Explore More Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Car Reviews', icon: '🚗', desc: 'Comprehensive vehicle reviews and comparisons', color: 'bg-blue-100 text-blue-800' },
              { title: 'Maintenance Tips', icon: '🔧', desc: 'Expert advice on car care and maintenance', color: 'bg-green-100 text-green-800' },
              { title: 'Car Modifications', icon: '⚙️', desc: 'Performance upgrades and customization guides', color: 'bg-purple-100 text-purple-800' },
              { title: 'Driving Tips', icon: '🛣️', desc: 'Safe driving techniques and road trip advice', color: 'bg-orange-100 text-orange-800' }
            ].map((category, index) => (
              <Link
                key={index}
                href="/posts"
                className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${category.color}`}>
                  <span className="text-2xl">{category.icon}</span>
                </div>
                <h4 className="font-bold mb-2 group-hover:text-primary transition-colors">{category.title}</h4>
                <p className="text-gray-600 text-sm">{category.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}