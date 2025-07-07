interface CarSpec {
  label: string
  value: string
}

interface CarSpecsProps {
  postId: number
}

export default function CarSpecs({ postId }: CarSpecsProps) {
  // Generate fake specs based on post ID for variety
  const generateSpecs = (id: number): CarSpec[] => {
    const years = ['2024', '2023', '2022', '2025']
    const fuelTypes = ['Electric', 'Hybrid', 'Gasoline', 'Diesel']
    const speeds = ['180 mph', '200 mph', '155 mph', '220 mph', '165 mph']
    const prices = ['$35,000', '$45,000', '$55,000', '$25,000', '$65,000', '$75,000']
    const engines = ['V6 Turbo', 'Electric Motor', 'V8', 'I4 Turbo', 'Hybrid V6']
    const transmissions = ['8-Speed Automatic', 'CVT', '6-Speed Manual', 'Single-Speed', '10-Speed Auto']
    
    return [
      { label: 'Model Year', value: years[id % years.length] },
      { label: 'Fuel Type', value: fuelTypes[id % fuelTypes.length] },
      { label: 'Top Speed', value: speeds[id % speeds.length] },
      { label: 'Price', value: prices[id % prices.length] },
      { label: 'Engine', value: engines[id % engines.length] },
      { label: 'Transmission', value: transmissions[id % transmissions.length] }
    ]
  }

  const specs = generateSpecs(postId)

  return (
    <div className="bg-gray-50 rounded-lg p-6 my-8">
      <h3 className="text-2xl font-bold mb-6 text-center">Car Specifications</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {specs.map((spec, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="text-center">
              <dt className="text-sm font-medium text-gray-500 mb-2">{spec.label}</dt>
              <dd className="text-lg font-bold text-gray-900">{spec.value}</dd>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        {/* <p className="text-sm text-blue-800 text-center">
          <strong>Note:</strong> These specifications are sample data for demonstration purposes. 
          In a real application, these would be fetched from a car database API.
        </p> */}
      </div>
    </div>
  )
}