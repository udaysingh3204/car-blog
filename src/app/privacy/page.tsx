export default function PrivacyPage() {
  return (
    <div className="pt-16">
      <section className="hero-bg py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">Privacy Policy</h1>
          <p className="text-xl text-gray-200">
            Your privacy matters to us
          </p>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">Last updated: January 2024</p>
            
            <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
            <p className="text-gray-700 mb-6">
              We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us for support.
            </p>
            
            <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
            <p className="text-gray-700 mb-6">
              We use the information we collect to provide, maintain, and improve our services, send you newsletters and updates, and respond to your inquiries.
            </p>
            
            <h2 className="text-2xl font-bold mb-4">Information Sharing</h2>
            <p className="text-gray-700 mb-6">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.
            </p>
            
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions about this Privacy Policy, please contact us at privacy@carblog.com
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}