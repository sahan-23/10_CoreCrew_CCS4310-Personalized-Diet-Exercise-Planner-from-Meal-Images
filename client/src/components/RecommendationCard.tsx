import React from 'react';
import { ActivityIcon, UtensilsIcon, HeartIcon, CheckCircleIcon } from 'lucide-react';
export const RecommendationCard = ({
  prediction
}) => {
  return <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b bg-green-50">
        <h2 className="text-lg font-semibold text-green-800">
          Personalized Recommendations
        </h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <UtensilsIcon className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className="font-medium text-gray-800">Diet Suggestions</h3>
            </div>
            <ul className="space-y-2">
              {prediction.recommendations.slice(0, 2).map((rec, index) => <li key={index} className="flex items-start">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">{rec}</span>
                </li>)}
            </ul>
          </div>
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                <ActivityIcon className="w-4 h-4 text-orange-600" />
              </div>
              <h3 className="font-medium text-gray-800">
                Exercise Recommendations
              </h3>
            </div>
            <ul className="space-y-2">
              {prediction.recommendations.slice(2).map((rec, index) => <li key={index} className="flex items-start">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">{rec}</span>
                </li>)}
            </ul>
          </div>
        </div>
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <HeartIcon className="w-5 h-5 text-red-500 mr-2" />
            <h3 className="font-medium text-gray-800">Health Tip</h3>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Maintaining a balanced diet with proper portion control is key to
            preventing long-term health issues. Consider logging your meals
            regularly to track your nutritional intake.
          </p>
        </div>
        <div className="mt-6 flex justify-center">
          <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
            Save to My Health Plan
          </button>
        </div>
      </div>
    </div>;
};