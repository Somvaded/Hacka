import React from 'react'
import { FaHeartbeat, FaUtensils, FaBed, FaGamepad } from 'react-icons/fa'

const FeatureSection = () => {
  return (
	<div>
		<div className="py-8 bg-gray-50 text-center">
          <h2 className="text-xl lg:text-2xl  font-bold mb-6">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 px-8">

            
            <div className="p-6 bg-white shadow-md rounded-lg">
              <div className="flex justify-center mb-4">
                <FaHeartbeat className="h-12 w-12 text-red-500" />
              </div>
              <h2 className="text-lg font-semibold mb-2">Emotion Tracker</h2>
              <h2 className="text-gray-600">
                Track your emotions throughout the day and gain insights into your mental well-being.
              </h2>
            </div>

            
            <div className="p-6 bg-white shadow-md rounded-lg">
              <div className="flex justify-center mb-4">
                <FaUtensils className="h-12 w-12 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Eating Habit Tracker</h3>
              <h2 className="text-gray-600">
                Monitor your eating habits and improve your diet with daily meal tracking.
              </h2>
            </div>

            
            <div className="p-6 bg-white shadow-md rounded-lg">
              <div className="flex justify-center mb-4">
                <FaBed className="h-12 w-12 text-blue-500" />
              </div>
              <h2 className="text-lg font-semibold mb-2">Sleeping Habit Tracker</h2>
              <h2 className="text-gray-600">
                Track your sleep patterns to improve overall rest and relaxation.
              </h2>
            </div>

            
            <div className="p-6 bg-white shadow-md rounded-lg">
              <div className="flex justify-center mb-4">
                <FaGamepad className="h-12 w-12 text-purple-500" />
              </div>
              <h2 className="text-lg font-semibold mb-2">Simple Games</h2>
              <h2 className="text-gray-600">
                Engage in fun games designed to improve focus and cognitive skills.
              </h2>
            </div>

          </div>
        </div>
	</div>
  )
}

export default FeatureSection