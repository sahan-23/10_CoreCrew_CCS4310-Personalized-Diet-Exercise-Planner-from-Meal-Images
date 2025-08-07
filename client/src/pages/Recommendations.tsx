import React, { useState } from 'react';
import { useUserData } from '../context/UserDataContext';
import { DumbbellIcon, UtensilsIcon, InfoIcon, ClockIcon, ChevronRightIcon } from 'lucide-react';
const Recommendations: React.FC = () => {
  const {
    userProfile,
    dailyNutrition,
    isProfileComplete
  } = useUserData();
  const [activeTab, setActiveTab] = useState<'diet' | 'exercise'>('diet');
  // Mock exercise recommendations based on user profile
  const getExerciseRecommendations = () => {
    if (!isProfileComplete) return [];
    const recommendations = [{
      title: 'Cardio',
      description: userProfile.fitnessGoal === 'Weight loss' ? 'Focus on high-intensity interval training (HIIT) to maximize calorie burn' : 'Moderate intensity steady-state cardio to improve cardiovascular health',
      exercises: userProfile.fitnessGoal === 'Weight loss' ? [{
        name: 'HIIT Sprints',
        duration: '20 minutes',
        frequency: '3-4 times per week',
        calories: '300-400'
      }, {
        name: 'Jump Rope',
        duration: '15 minutes',
        frequency: '3-4 times per week',
        calories: '200-300'
      }, {
        name: 'Cycling',
        duration: '30 minutes',
        frequency: '3-4 times per week',
        calories: '300-400'
      }] : [{
        name: 'Jogging',
        duration: '30 minutes',
        frequency: '3-4 times per week',
        calories: '250-350'
      }, {
        name: 'Swimming',
        duration: '30 minutes',
        frequency: '2-3 times per week',
        calories: '300-400'
      }, {
        name: 'Brisk Walking',
        duration: '45 minutes',
        frequency: '4-5 times per week',
        calories: '200-300'
      }]
    }, {
      title: 'Strength Training',
      description: userProfile.fitnessGoal === 'Weight gain' ? 'Focus on progressive overload and compound exercises to build muscle mass' : 'Incorporate resistance training to maintain muscle and boost metabolism',
      exercises: userProfile.fitnessGoal === 'Weight gain' ? [{
        name: 'Bench Press',
        duration: '4 sets of 8-10 reps',
        frequency: '2 times per week',
        calories: '150-200'
      }, {
        name: 'Squats',
        duration: '4 sets of 8-10 reps',
        frequency: '2 times per week',
        calories: '200-250'
      }, {
        name: 'Deadlifts',
        duration: '3 sets of 8-10 reps',
        frequency: '1-2 times per week',
        calories: '200-250'
      }] : [{
        name: 'Bodyweight Circuit',
        duration: '20 minutes',
        frequency: '2-3 times per week',
        calories: '150-250'
      }, {
        name: 'Resistance Band Workout',
        duration: '20 minutes',
        frequency: '2-3 times per week',
        calories: '100-200'
      }, {
        name: 'Dumbbell Exercises',
        duration: '25 minutes',
        frequency: '2 times per week',
        calories: '150-200'
      }]
    }, {
      title: 'Flexibility & Recovery',
      description: 'Essential for all fitness goals to prevent injury and improve performance',
      exercises: [{
        name: 'Yoga',
        duration: '30 minutes',
        frequency: '2-3 times per week',
        calories: '100-150'
      }, {
        name: 'Static Stretching',
        duration: '15 minutes',
        frequency: 'Daily',
        calories: '50-70'
      }, {
        name: 'Foam Rolling',
        duration: '10 minutes',
        frequency: '3-4 times per week',
        calories: '30-50'
      }]
    }];
    return recommendations;
  };
  // Mock diet recommendations based on user profile
  const getDietRecommendations = () => {
    if (!isProfileComplete || !dailyNutrition) return [];
    const recommendations = [{
      title: 'Protein Sources',
      description: userProfile.fitnessGoal === 'Weight gain' ? 'Focus on high-quality protein sources to support muscle growth' : 'Include lean protein sources to maintain muscle and increase satiety',
      foods: userProfile.fitnessGoal === 'Weight gain' ? [{
        name: 'Chicken Breast',
        serving: '6-8 oz',
        calories: 250,
        protein: 40,
        carbs: 0,
        fat: 8
      }, {
        name: 'Salmon',
        serving: '6 oz',
        calories: 350,
        protein: 34,
        carbs: 0,
        fat: 20
      }, {
        name: 'Greek Yogurt',
        serving: '1 cup',
        calories: 150,
        protein: 20,
        carbs: 8,
        fat: 4
      }, {
        name: 'Whey Protein',
        serving: '1 scoop',
        calories: 120,
        protein: 25,
        carbs: 3,
        fat: 1
      }] : [{
        name: 'Turkey Breast',
        serving: '4-5 oz',
        calories: 150,
        protein: 30,
        carbs: 0,
        fat: 2
      }, {
        name: 'Tofu',
        serving: '4 oz',
        calories: 120,
        protein: 15,
        carbs: 3,
        fat: 7
      }, {
        name: 'Egg Whites',
        serving: '4 whites',
        calories: 70,
        protein: 14,
        carbs: 0,
        fat: 0
      }, {
        name: 'White Fish',
        serving: '5 oz',
        calories: 140,
        protein: 28,
        carbs: 0,
        fat: 2
      }]
    }, {
      title: 'Carbohydrate Sources',
      description: userProfile.fitnessGoal === 'Weight loss' ? 'Focus on high-fiber, low-glycemic carbs to maintain energy while supporting weight loss' : 'Include a mix of complex carbohydrates to fuel your workouts and daily activities',
      foods: userProfile.fitnessGoal === 'Weight loss' ? [{
        name: 'Oatmeal',
        serving: '1/2 cup dry',
        calories: 150,
        protein: 5,
        carbs: 27,
        fat: 3
      }, {
        name: 'Sweet Potato',
        serving: '1 medium',
        calories: 100,
        protein: 2,
        carbs: 24,
        fat: 0
      }, {
        name: 'Quinoa',
        serving: '1/2 cup cooked',
        calories: 110,
        protein: 4,
        carbs: 20,
        fat: 2
      }, {
        name: 'Berries',
        serving: '1 cup',
        calories: 80,
        protein: 1,
        carbs: 20,
        fat: 0
      }] : [{
        name: 'Brown Rice',
        serving: '1 cup cooked',
        calories: 220,
        protein: 5,
        carbs: 45,
        fat: 2
      }, {
        name: 'Whole Grain Pasta',
        serving: '1 cup cooked',
        calories: 200,
        protein: 7,
        carbs: 40,
        fat: 1
      }, {
        name: 'Banana',
        serving: '1 medium',
        calories: 105,
        protein: 1,
        carbs: 27,
        fat: 0
      }, {
        name: 'Whole Grain Bread',
        serving: '2 slices',
        calories: 160,
        protein: 8,
        carbs: 30,
        fat: 2
      }]
    }, {
      title: 'Healthy Fats',
      description: 'Essential for hormone production and nutrient absorption',
      foods: [{
        name: 'Avocado',
        serving: '1/2 medium',
        calories: 160,
        protein: 2,
        carbs: 8,
        fat: 15
      }, {
        name: 'Olive Oil',
        serving: '1 tbsp',
        calories: 120,
        protein: 0,
        carbs: 0,
        fat: 14
      }, {
        name: 'Nuts (Almonds)',
        serving: '1/4 cup',
        calories: 170,
        protein: 6,
        carbs: 6,
        fat: 15
      }, {
        name: 'Chia Seeds',
        serving: '1 tbsp',
        calories: 60,
        protein: 2,
        carbs: 5,
        fat: 4
      }]
    }];
    return recommendations;
  };
  const exerciseRecommendations = getExerciseRecommendations();
  const dietRecommendations = getDietRecommendations();
  return <div className="container mx-auto">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          Personalized Recommendations
        </h1>
        {!isProfileComplete ? <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <InfoIcon className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Please complete your profile to get personalized
                  recommendations.
                </p>
              </div>
            </div>
          </div> : <>
            {/* Tab navigation */}
            <div className="bg-white rounded-lg shadow mb-6 overflow-hidden">
              <div className="flex border-b">
                <button className={`flex-1 py-3 px-4 text-center font-medium focus:outline-none ${activeTab === 'diet' ? 'text-green-600 border-b-2 border-green-500' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('diet')}>
                  <div className="flex items-center justify-center">
                    <UtensilsIcon className="mr-2 h-5 w-5" />
                    Diet Recommendations
                  </div>
                </button>
                <button className={`flex-1 py-3 px-4 text-center font-medium focus:outline-none ${activeTab === 'exercise' ? 'text-green-600 border-b-2 border-green-500' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('exercise')}>
                  <div className="flex items-center justify-center">
                    <DumbbellIcon className="mr-2 h-5 w-5" />
                    Exercise Recommendations
                  </div>
                </button>
              </div>
            </div>
            {/* Diet recommendations */}
            {activeTab === 'diet' && <div className="space-y-6">
                <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                  <h2 className="text-lg font-medium text-green-800 mb-2">
                    Your Nutrition Summary
                  </h2>
                  <p className="text-sm text-green-700 mb-3">
                    Based on your profile and fitness goal of{' '}
                    <strong>{userProfile.fitnessGoal}</strong>, we recommend the
                    following daily targets:
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <p className="text-xs text-gray-500">Daily Calories</p>
                      <p className="text-lg font-bold text-gray-800">
                        {dailyNutrition?.goalCalories} kcal
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <p className="text-xs text-gray-500">Protein Target</p>
                      <p className="text-lg font-bold text-gray-800">
                        {Math.round(dailyNutrition!.goalCalories * 0.3 / 4)}g
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <p className="text-xs text-gray-500">Carbs Target</p>
                      <p className="text-lg font-bold text-gray-800">
                        {Math.round(dailyNutrition!.goalCalories * 0.5 / 4)}g
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <p className="text-xs text-gray-500">Fat Target</p>
                      <p className="text-lg font-bold text-gray-800">
                        {Math.round(dailyNutrition!.goalCalories * 0.2 / 9)}g
                      </p>
                    </div>
                  </div>
                </div>
                {dietRecommendations.map((category, index) => <div key={index} className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="bg-green-50 px-4 py-3 border-b">
                      <h2 className="text-lg font-medium text-green-800">
                        {category.title}
                      </h2>
                      <p className="text-sm text-green-700 mt-1">
                        {category.description}
                      </p>
                    </div>
                    <div className="divide-y">
                      {category.foods.map((food, foodIndex) => <div key={foodIndex} className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-gray-900">
                                {food.name}
                              </h3>
                              <p className="text-sm text-gray-500">
                                Serving: {food.serving}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-gray-900">
                                {food.calories} kcal
                              </p>
                            </div>
                          </div>
                          <div className="mt-2 grid grid-cols-3 gap-2">
                            <div className="bg-blue-50 px-2 py-1 rounded text-center">
                              <p className="text-xs text-blue-700">Protein</p>
                              <p className="font-medium text-blue-800">
                                {food.protein}g
                              </p>
                            </div>
                            <div className="bg-yellow-50 px-2 py-1 rounded text-center">
                              <p className="text-xs text-yellow-700">Carbs</p>
                              <p className="font-medium text-yellow-800">
                                {food.carbs}g
                              </p>
                            </div>
                            <div className="bg-red-50 px-2 py-1 rounded text-center">
                              <p className="text-xs text-red-700">Fat</p>
                              <p className="font-medium text-red-800">
                                {food.fat}g
                              </p>
                            </div>
                          </div>
                        </div>)}
                    </div>
                  </div>)}
              </div>}
            {/* Exercise recommendations */}
            {activeTab === 'exercise' && <div className="space-y-6">
                <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                  <h2 className="text-lg font-medium text-green-800 mb-2">
                    Your Exercise Plan
                  </h2>
                  <p className="text-sm text-green-700">
                    Based on your profile and fitness goal of{' '}
                    <strong>{userProfile.fitnessGoal}</strong>, we've created a
                    balanced exercise plan. Aim for 150-200 minutes of total
                    activity per week.
                  </p>
                </div>
                {exerciseRecommendations.map((category, index) => <div key={index} className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="bg-green-50 px-4 py-3 border-b">
                      <h2 className="text-lg font-medium text-green-800">
                        {category.title}
                      </h2>
                      <p className="text-sm text-green-700 mt-1">
                        {category.description}
                      </p>
                    </div>
                    <div className="divide-y">
                      {category.exercises.map((exercise, exIndex) => <div key={exIndex} className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-gray-900">
                                {exercise.name}
                              </h3>
                              <div className="mt-1 flex items-center text-sm text-gray-500">
                                <ClockIcon className="mr-1 h-4 w-4" />
                                <span>{exercise.duration}</span>
                              </div>
                            </div>
                            <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                          </div>
                          <div className="mt-2 grid grid-cols-2 gap-2">
                            <div className="bg-gray-50 px-2 py-1 rounded text-center">
                              <p className="text-xs text-gray-500">Frequency</p>
                              <p className="font-medium text-gray-800">
                                {exercise.frequency}
                              </p>
                            </div>
                            <div className="bg-gray-50 px-2 py-1 rounded text-center">
                              <p className="text-xs text-gray-500">
                                Est. Calories
                              </p>
                              <p className="font-medium text-gray-800">
                                {exercise.calories}
                              </p>
                            </div>
                          </div>
                        </div>)}
                    </div>
                  </div>)}
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <h3 className="text-lg font-medium text-blue-800 mb-2">
                    Weekly Schedule Example
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded p-3 shadow-sm">
                      <p className="font-medium text-gray-900 mb-2">
                        Monday, Wednesday, Friday
                      </p>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-center text-gray-700">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                          Cardio: 20-30 minutes
                        </li>
                        <li className="flex items-center text-gray-700">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          Strength Training: 20-30 minutes
                        </li>
                      </ul>
                    </div>
                    <div className="bg-white rounded p-3 shadow-sm">
                      <p className="font-medium text-gray-900 mb-2">
                        Tuesday, Thursday
                      </p>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-center text-gray-700">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                          Flexibility & Recovery: 20-30 minutes
                        </li>
                        <li className="flex items-center text-gray-700">
                          <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                          Light Cardio: 15-20 minutes
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>}
          </>}
      </div>
    </div>;
};
export default Recommendations;