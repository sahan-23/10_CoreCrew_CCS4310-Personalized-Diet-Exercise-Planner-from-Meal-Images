import React from 'react';
import { Clock, Info, Trash2Icon } from 'lucide-react';
const NutritionCard = ({
  meal,
  delay = 0
}) => {
  return <div className="bg-white overflow-hidden shadow rounded-lg" data-aos="fade-up" data-aos-delay={delay}>
      <div className="relative">
        <img src={meal.imageUrl} alt={meal.name} className="h-48 w-full object-cover" />
        <div className="absolute top-2 right-2">
          <button className="p-1 bg-white rounded-full shadow hover:bg-gray-100">
            <Trash2Icon className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>
      <div className="px-4 py-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{meal.name}</h3>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <Clock className="h-4 w-4 mr-1" />
              <span>{meal.time}</span>
            </div>
          </div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${meal.category === 'healthy' ? 'bg-green-100 text-green-800' : meal.category === 'moderate' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
            {meal.category === 'healthy' ? 'Healthy' : meal.category === 'moderate' ? 'Moderate' : 'Indulgent'}
          </span>
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
          <div className="col-span-1">
            <dt className="text-sm font-medium text-gray-500">Calories</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {meal.nutrition.calories} kcal
            </dd>
          </div>
          <div className="col-span-1">
            <dt className="text-sm font-medium text-gray-500">Protein</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {meal.nutrition.protein}g
            </dd>
          </div>
          <div className="col-span-1">
            <dt className="text-sm font-medium text-gray-500">Carbs</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {meal.nutrition.carbs}g
            </dd>
          </div>
          <div className="col-span-1">
            <dt className="text-sm font-medium text-gray-500">Fat</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {meal.nutrition.fat}g
            </dd>
          </div>
        </dl>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-900">
            Suggested Exercise
          </h4>
          <p className="mt-1 text-sm text-gray-500">{meal.suggestedExercise}</p>
        </div>
      </div>
    </div>;
};
export default NutritionCard;