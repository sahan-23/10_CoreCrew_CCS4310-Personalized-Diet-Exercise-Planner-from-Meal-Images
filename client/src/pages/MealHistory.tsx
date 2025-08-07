import React, { useState } from 'react';
import { useUserData, Meal } from '../context/UserDataContext';
import { CalendarIcon, FilterIcon, TrashIcon } from 'lucide-react';
const MealHistory: React.FC = () => {
  const {
    meals
  } = useUserData();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedMealType, setSelectedMealType] = useState<string>('');
  // Group meals by date
  const mealsByDate = meals.reduce<Record<string, Meal[]>>((acc, meal) => {
    const date = meal.date.split('T')[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(meal);
    return acc;
  }, {});
  // Get unique dates
  const dates = Object.keys(mealsByDate).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  // Filter meals
  const filteredDates = selectedDate ? [selectedDate] : dates;
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return <div className="container mx-auto">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Meal History</h1>
        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
            <div className="flex items-center mb-4 md:mb-0">
              <FilterIcon className="mr-2 h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filter:</span>
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date-filter" className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <select id="date-filter" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500">
                  <option value="">All dates</option>
                  {dates.map(date => <option key={date} value={date}>
                      {formatDate(date)}
                    </option>)}
                </select>
              </div>
              <div>
                <label htmlFor="meal-type-filter" className="block text-sm font-medium text-gray-700 mb-1">
                  Meal Type
                </label>
                <select id="meal-type-filter" value={selectedMealType} onChange={e => setSelectedMealType(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500">
                  <option value="">All meal types</option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snack">Snack</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        {/* Meal list */}
        {filteredDates.length > 0 ? <div className="space-y-6">
            {filteredDates.map(date => {
          const filteredMeals = selectedMealType ? mealsByDate[date].filter(meal => meal.mealType === selectedMealType) : mealsByDate[date];
          if (filteredMeals.length === 0) return null;
          return <div key={date} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="bg-green-50 px-4 py-3 border-b flex items-center">
                    <CalendarIcon className="mr-2 h-5 w-5 text-green-600" />
                    <h2 className="text-lg font-medium text-green-800">
                      {formatDate(date)}
                    </h2>
                  </div>
                  <div className="divide-y">
                    {filteredMeals.map(meal => <div key={meal.id} className="p-4">
                        <div className="flex items-start">
                          {meal.imageUrl && <div className="flex-shrink-0 mr-4">
                              <img src={meal.imageUrl} alt={meal.foodName} className="h-20 w-20 rounded-md object-cover" />
                            </div>}
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between">
                              <h3 className="text-lg font-medium text-gray-900">
                                {meal.foodName}
                              </h3>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {meal.mealType}
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              Portion: {meal.portionSize}
                            </p>
                            <div className="mt-2 grid grid-cols-4 gap-2">
                              <div className="bg-gray-50 px-2 py-1 rounded text-center">
                                <p className="text-xs text-gray-500">
                                  Calories
                                </p>
                                <p className="font-medium">{meal.calories}</p>
                              </div>
                              <div className="bg-gray-50 px-2 py-1 rounded text-center">
                                <p className="text-xs text-gray-500">Protein</p>
                                <p className="font-medium">{meal.protein}g</p>
                              </div>
                              <div className="bg-gray-50 px-2 py-1 rounded text-center">
                                <p className="text-xs text-gray-500">Carbs</p>
                                <p className="font-medium">{meal.carbs}g</p>
                              </div>
                              <div className="bg-gray-50 px-2 py-1 rounded text-center">
                                <p className="text-xs text-gray-500">Fat</p>
                                <p className="font-medium">{meal.fat}g</p>
                              </div>
                            </div>
                          </div>
                          <button className="ml-4 flex-shrink-0 text-gray-400 hover:text-red-500" title="Delete meal">
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>)}
                  </div>
                </div>;
        })}
          </div> : <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500">No meal records found.</p>
          </div>}
      </div>
    </div>;
};
export default MealHistory;