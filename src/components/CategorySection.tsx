export default function CategorySection() {
  const categories = [
    {
      title: 'Car Reviews',
      description: 'Lorem ipsum dolor sit amet consectetur. Urna dignissim ac egestas in.',
      image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=100&h=100&fit=crop&auto=format'
    },
    {
      title: 'Maintenance Tips',
      description: 'Lorem ipsum dolor sit amet consectetur. Urna dignissim ac egestas in.',
      image: 'https://images.unsplash.com/photo-1486754735734-325b5831c3ad?w=100&h=100&fit=crop&auto=format'
    },
    {
      title: 'Car Modifications',
      description: 'Lorem ipsum dolor sit amet consectetur. Urna dignissim ac egestas in.',
      image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=100&h=100&fit=crop&auto=format'
    },
    {
      title: 'Driving Tips',
      description: 'Lorem ipsum dolor sit amet consectetur. Urna dignissim ac egestas in.',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=100&h=100&fit=crop&auto=format'
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">All Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div key={index} className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">{category.title}</h3>
              <p className="text-gray-600 text-sm">{category.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}