export default function AboutPage() {
  return (
    <div className="pt-16">
      <section className="hero-bg py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">About Us</h1>
          <p className="text-xl text-gray-200">
            Learn more about our passion for cars and automotive excellence
          </p>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold mb-6">Why This Car Blog Exists</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Welcome to our automotive haven! Our car blog was born from a simple yet powerful belief: every car enthusiast deserves access to honest, comprehensive, and engaging automotive content. Whether you're a weekend warrior looking to modify your ride, a daily commuter seeking maintenance tips, or an electric vehicle pioneer exploring the future of transportation, we're here to fuel your passion.
            </p>
            
            <h2 className="text-3xl font-bold mb-6">What We Cover</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold mb-3">🔍 In-Depth Reviews</h3>
                <p className="text-gray-700">Comprehensive car reviews covering everything from budget-friendly commuters to luxury supercars, with real-world testing and honest opinions.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">⚡ Electric Vehicle Focus</h3>
                <p className="text-gray-700">Stay ahead of the curve with our extensive EV coverage, including range tests, charging infrastructure guides, and sustainability insights.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">🔧 Maintenance Tips</h3>
                <p className="text-gray-700">Keep your car running smoothly with our practical maintenance guides, DIY tutorials, and expert advice on common automotive issues.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">🏎️ Performance & Modifications</h3>
                <p className="text-gray-700">Explore the world of car modifications, from simple aesthetic upgrades to serious performance enhancements, all with safety in mind.</p>
              </div>
            </div>
            
            <h2 className="text-3xl font-bold mb-6">Our Tech Stack</h2>
            <p className="text-gray-700 mb-4">
              This blog is built with modern web technologies to ensure a fast, responsive, and enjoyable reading experience:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6">
              <li><strong>Next.js 14</strong> - React framework for production-ready applications</li>
              <li><strong>Tailwind CSS</strong> - Utility-first CSS framework for rapid UI development</li>
              <li><strong>TypeScript</strong> - Type-safe JavaScript for better development experience</li>
              <li><strong>Static Site Generation</strong> - For optimal performance and SEO</li>
              <li><strong>Responsive Design</strong> - Optimized for all devices and screen sizes</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}