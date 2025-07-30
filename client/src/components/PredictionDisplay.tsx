import React from 'react';
import { ArrowLeftIcon, RefreshCwIcon } from 'lucide-react';
export const PredictionDisplay = ({
  image,
  prediction,
  loading,
  onReset
}) => {
  return <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Food Analysis</h2>
          <button onClick={onReset} className="flex items-center text-sm text-gray-600 hover:text-gray-900">
            <ArrowLeftIcon className="w-4 h-4 mr-1" />
            Upload new image
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <div className="aspect-w-4 aspect-h-3 bg-gray-100">
            <img src={image} alt="Uploaded food" className="object-cover w-full h-full" />
          </div>
        </div>
        <div className="md:w-1/2 p-6">
          {loading ? <div className="flex flex-col items-center justify-center h-full">
              <RefreshCwIcon className="w-10 h-10 text-green-500 animate-spin" />
              <p className="mt-4 text-gray-600">Analyzing your food...</p>
            </div> : prediction ? <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {prediction.foodName}
                </h3>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  Nutritional Information
                </h4>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <p className="text-xl font-bold text-gray-800">
                      {prediction.calories}
                    </p>
                    <p className="text-xs text-gray-500">calories</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-gray-800">
                      {prediction.nutrients.carbs}g
                    </p>
                    <p className="text-xs text-gray-500">carbs</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-gray-800">
                      {prediction.nutrients.protein}g
                    </p>
                    <p className="text-xs text-gray-500">protein</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-gray-800">
                      {prediction.nutrients.fat}g
                    </p>
                    <p className="text-xs text-gray-500">fat</p>
                  </div>
                </div>
              </div>
              {prediction.healthRisks.length > 0 && <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    Health Considerations
                  </h4>
                  {prediction.healthRisks.map((risk, index) => <div key={index} className="p-3 bg-yellow-50 border border-yellow-100 rounded-lg">
                      <p className="font-medium text-yellow-800">
                        {risk.name} - {risk.level} risk
                      </p>
                      <p className="text-sm text-yellow-700">
                        {risk.description}
                      </p>
                    </div>)}
                </div>}
            </div> : <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">No prediction available</p>
            </div>}
        </div>
      </div>
    </div>;
};