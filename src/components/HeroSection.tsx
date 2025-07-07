import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="hero-bg min-h-screen flex items-center pt-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Your Journey<br/>
            Your Car<br/>
            <span className="text-primary">Your Way</span>
          </h1>
          <p className="text-xl mb-8 text-gray-200 max-w-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <Link 
            href="/subscribe"
            className="inline-block bg-primary text-white px-8 py-4 rounded-md hover:bg-red-600 transition-colors font-semibold text-lg"
          >
            Subscribe ✓
          </Link>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1550355291-bbee04a92027?w=400&h=300&fit=crop" 
                alt="Car 1"
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=200&fit=crop" 
                alt="Car 2"
                className="w-full h-32 object-cover"
              />
            </div>
          </div>
          <div className="pt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden mb-4">
              <img 
                src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=250&fit=crop" 
                alt="Car 3"
                className="w-full h-40 object-cover"
              />
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&h=300&fit=crop" 
                alt="Car 4"
                className="w-full h-48 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}