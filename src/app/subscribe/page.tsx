'use client'
import { useState } from 'react'

export default function SubscribePage() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        setEmail('')
      }, 3000)
    }
  }

  return (
    <div className="pt-16">
      <section className="hero-bg min-h-screen flex items-center">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Subscribe to Our<br/>
            <span className="text-primary">Car Blog</span>
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Get the latest car reviews, maintenance tips, and automotive insights delivered straight to your inbox. Join thousands of car enthusiasts who trust our expertise.
          </p>
          
          {isSubmitted ? (
            <div className="bg-green-500 text-white p-6 rounded-lg mb-8">
              <h3 className="text-2xl font-bold mb-2">Welcome to the Club! 🎉</h3>
              <p>Thank you for subscribing! Check your email for a confirmation link.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 rounded-md text-dark text-lg"
                  required
                />
                <button
                  type="submit"
                  className="bg-primary text-white px-8 py-4 rounded-md hover:bg-red-600 transition-colors font-semibold text-lg"
                >
                  Subscribe ✓
                </button>
              </div>
            </form>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="text-xl font-bold mb-2">Weekly Newsletter</h3>
              <p className="text-gray-300">Get curated car content every Tuesday</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-4xl mb-4">🚗</div>
              <h3 className="text-xl font-bold mb-2">Exclusive Reviews</h3>
              <p className="text-gray-300">First access to our detailed car reviews</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-xl font-bold mb-2">Expert Tips</h3>
              <p className="text-gray-300">Professional maintenance and buying advice</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}