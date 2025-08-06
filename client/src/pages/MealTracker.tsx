import React, { useEffect, useState } from 'react';
import { PlusIcon, CameraIcon, UploadIcon } from 'lucide-react';
import ImageUploader from '../components/ImageUploader';
import NutritionCard from '../components/NutritionCard';
import { getMockMeals, analyzeMealImage } from '../utils/mockData';
const MealTracker = ({
  user
}) => {
  const [meals, setMeals] = useState([]);
  const [showUploader, setShowUploader] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  useEffect(() => {
    setMeals(getMockMeals());
  }, []);
  const handleImageUpload = async imageFile => {
    setIsAnalyzing(true);
    // Simulate API call delay
    setTimeout(() => {
      const mealData = analyzeMealImage(imageFile);
      setMeals([mealData, ...meals]);
      setIsAnalyzing(false);
      setShowUploader(false);
    }, 2000);
  };
  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
  return <div className="space-y-6">
      <div className="flex justify-between items-center" data-aos="fade-down">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Meal Tracker</h1>
          <p className="mt-1 text-sm text-gray-500">
            Upload photos of your meals to track your nutrition
          </p>
        </div>
        <button onClick={() => setShowUploader(true)} className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" data-aos="zoom-in">
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Add Meal
        </button>
      </div>
      {showUploader && <div className="bg-white shadow rounded-lg p-6 border-2 border-dashed border-gray-300" data-aos="fade-up">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Upload Meal Image
          </h2>
          <ImageUploader onUpload={handleImageUpload} isLoading={isAnalyzing} onCancel={() => setShowUploader(false)} />
        </div>}
      <div className="space-y-6">
        {mealTypes.map(mealType => {
        const mealsByType = meals.filter(meal => meal.type === mealType);
        if (mealsByType.length === 0) return null;
        return <div key={mealType} data-aos="fade-up">
              <h2 className="text-xl font-medium text-gray-900 mb-4">
                {mealType}
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {mealsByType.map((meal, index) => <NutritionCard key={meal.id} meal={meal} delay={index * 100} />)}
              </div>
            </div>;
      })}
      </div>
    </div>;
};
export default MealTracker;