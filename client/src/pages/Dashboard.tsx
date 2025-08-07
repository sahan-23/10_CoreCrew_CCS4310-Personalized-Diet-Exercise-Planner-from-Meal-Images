import React from 'react';
import { useUserData } from '../context/UserDataContext';
import { Link } from 'react-router-dom';
import { UtensilsIcon, TrendingUpIcon, BarChartIcon, AlertCircleIcon } from 'lucide-react';
const Dashboard: React.FC = () => {
  const {
    userProfile,
    dailyNutrition,
    meals,
    isProfileComplete
  } = useUserData();
  const today = new Date().toISOString().split('T')[0];
  const todaysMeals = meals.filter(meal => meal.date.includes(today));
  return <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      {!isProfileComplete && <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircleIcon className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Your profile is incomplete. Please{' '}
                <Link to="/profile" className="font-medium underline text-yellow-700 hover:text-yellow-600">
                  complete your profile
                </Link>{' '}
                to get personalized recommendations.
              </p>
            </div>
          </div>
        </div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Calorie Summary Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Daily Calories</h2>
            <BarChartIcon className="h-5 w-5 text-green-500" />
          </div>
          {dailyNutrition ? <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Consumed</span>
                <span className="font-semibold">
                  {dailyNutrition.totalCalories} kcal
                </span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Goal</span>
                <span className="font-semibold">
                  {dailyNutrition.goalCalories} kcal
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className={`h-2.5 rounded-full ${dailyNutrition.totalCalories > dailyNutrition.goalCalories ? 'bg-red-500' : 'bg-green-500'}`} style={{
              width: `${Math.min(100, dailyNutrition.totalCalories / dailyNutrition.goalCalories * 100)}%`
            }}></div>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                {dailyNutrition.totalCalories > dailyNutrition.goalCalories ? `${dailyNutrition.totalCalories - dailyNutrition.goalCalories} kcal over your goal` : `${dailyNutrition.goalCalories - dailyNutrition.totalCalories} kcal remaining`}
              </p>
            </div> : <p className="text-gray-500">No data available yet</p>}
        </div>
        {/* Macronutrients Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Macronutrients</h2>
            <TrendingUpIcon className="h-5 w-5 text-green-500" />
          </div>
          {dailyNutrition ? <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-600">Protein</span>
                  <span className="font-semibold">
                    {dailyNutrition.totalProtein}g
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{
                width: `${Math.min(100, dailyNutrition.totalProtein / (dailyNutrition.goalCalories * 0.3 / 4) * 100)}%`
              }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-600">Carbs</span>
                  <span className="font-semibold">
                    {dailyNutrition.totalCarbs}g
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{
                width: `${Math.min(100, dailyNutrition.totalCarbs / (dailyNutrition.goalCalories * 0.5 / 4) * 100)}%`
              }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-600">Fat</span>
                  <span className="font-semibold">
                    {dailyNutrition.totalFat}g
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{
                width: `${Math.min(100, dailyNutrition.totalFat / (dailyNutrition.goalCalories * 0.2 / 9) * 100)}%`
              }}></div>
                </div>
              </div>
            </div> : <p className="text-gray-500">No data available yet</p>}
        </div>
        {/* Today's Meals Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Today's Meals</h2>
            <UtensilsIcon className="h-5 w-5 text-green-500" />
          </div>
          {todaysMeals.length > 0 ? <div className="space-y-3">
              {todaysMeals.map(meal => <div key={meal.id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">{meal.foodName}</p>
                    <p className="text-sm text-gray-600">{meal.mealType}</p>
                  </div>
                  <p className="font-semibold">{meal.calories} kcal</p>
                </div>)}
              <Link to="/upload" className="block mt-4 text-center text-sm font-medium text-green-600 hover:text-green-500">
                + Add another meal
              </Link>
            </div> : <div className="text-center py-4">
              <p className="text-gray-500 mb-4">No meals logged today</p>
              <Link to="/upload" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
                Log your first meal
              </Link>
            </div>}
        </div>
      </div>
      {/* User Stats Section */}
      {isProfileComplete && <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Your Profile</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Age</p>
              <p className="font-semibold">{userProfile.age} years</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Gender</p>
              <p className="font-semibold">{userProfile.gender}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Height</p>
              <p className="font-semibold">{userProfile.height} cm</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Weight</p>
              <p className="font-semibold">{userProfile.weight} kg</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Activity Level</p>
              <p className="font-semibold">{userProfile.activityLevel}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Goal</p>
              <p className="font-semibold">{userProfile.fitnessGoal}</p>
            </div>
          </div>
        </div>}
    </div>;
};
export default Dashboard;