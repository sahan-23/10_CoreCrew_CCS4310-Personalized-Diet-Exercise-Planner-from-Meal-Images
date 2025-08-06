import React, { useEffect, useState } from 'react';
import { CalendarIcon, TrendingUpIcon, BarChart4Icon, BriefcaseIcon } from 'lucide-react';
import ProgressChart from '../components/ProgressChart';
import { getMockMeals, getMockExercises } from '../utils/mockData';
import NutritionSummary from '../components/NutritionSummary';
import UpcomingExercises from '../components/UpcomingExercises';
const Dashboard = ({
  user
}) => {
  const [recentMeals, setRecentMeals] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [nutritionSummary, setNutritionSummary] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  });
  useEffect(() => {
    const meals = getMockMeals();
    const exercises = getMockExercises();
    setRecentMeals(meals);
    setExercises(exercises);
    // Calculate nutrition summary
    const summary = meals.reduce((acc, meal) => {
      acc.calories += meal.nutrition.calories;
      acc.protein += meal.nutrition.protein;
      acc.carbs += meal.nutrition.carbs;
      acc.fat += meal.nutrition.fat;
      return acc;
    }, {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    });
    setNutritionSummary(summary);
  }, []);
  const stats = [{
    name: 'Daily Calories',
    value: `${nutritionSummary.calories} kcal`,
    icon: BarChart4Icon,
    color: 'bg-blue-100 text-blue-800'
  }, {
    name: 'Protein Intake',
    value: `${nutritionSummary.protein}g`,
    icon: TrendingUpIcon,
    color: 'bg-green-100 text-green-800'
  }, {
    name: 'Weekly Workouts',
    value: '12',
    icon: BriefcaseIcon,
    color: 'bg-purple-100 text-purple-800'
  }, {
    name: 'Streak',
    value: '7 days',
    icon: CalendarIcon,
    color: 'bg-orange-100 text-orange-800'
  }];
  return <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Welcome back, {user.name}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Here's a summary of your nutrition and fitness journey
        </p>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className={`flex-shrink-0 rounded-md p-3 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {stat.name}
                  </dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    {stat.value}
                  </dd>
                </div>
              </div>
            </div>
          </div>)}
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Nutrition Summary
          </h2>
          <NutritionSummary nutritionData={nutritionSummary} />
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Weekly Progress
          </h2>
          <ProgressChart />
        </div>
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Upcoming Exercises
        </h2>
        <UpcomingExercises exercises={exercises.slice(0, 3)} />
      </div>
    </div>;
};
export default Dashboard;