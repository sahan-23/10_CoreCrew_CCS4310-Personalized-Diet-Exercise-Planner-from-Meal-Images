import React, { useEffect, useState, createContext, useContext } from 'react';
import { useAuth } from './AuthContext';
export type ActivityLevel = 'Sedentary' | 'Moderate' | 'Active';
export type FitnessGoal = 'Weight loss' | 'Weight gain' | 'Maintain';
export type Gender = 'Male' | 'Female' | 'Other';
export type MealType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
export type PortionSize = 'Small' | 'Medium' | 'Large' | string;
export interface UserProfile {
  age: number | null;
  gender: Gender | null;
  height: number | null; // in cm
  weight: number | null; // in kg
  activityLevel: ActivityLevel | null;
  fitnessGoal: FitnessGoal | null;
}
export interface Meal {
  id: string;
  userId: string;
  date: string;
  imageUrl?: string;
  foodName: string;
  mealType: MealType;
  portionSize: PortionSize;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}
export interface Activity {
  id: string;
  userId: string;
  date: string;
  type: string;
  duration: number;
  caloriesBurned: number;
}
export interface DailyNutrition {
  date: string;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  goalCalories: number;
}
export interface FoodItem {
  id: string;
  foodName: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}
interface UserDataContextType {
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  meals: Meal[];
  addMeal: (meal: Omit<Meal, 'id' | 'userId'>) => void;
  activities: Activity[];
  addActivity: (activity: Omit<Activity, 'id' | 'userId'>) => void;
  dailyNutrition: DailyNutrition | null;
  isProfileComplete: boolean;
  foodDatabase: FoodItem[];
  searchFoods: (query: string) => FoodItem[];
}
const UserDataContext = createContext<UserDataContextType | undefined>(undefined);
export const UserDataProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const {
    user
  } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile>({
    age: null,
    gender: null,
    height: null,
    weight: null,
    activityLevel: null,
    fitnessGoal: null
  });
  const [meals, setMeals] = useState<Meal[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [dailyNutrition, setDailyNutrition] = useState<DailyNutrition | null>(null);
  const foodDatabase: FoodItem[] = [
    { id: '1', foodName: 'Apple', calories: 95, protein: 0.5, carbs: 25, fat: 0.3 },
    { id: '2', foodName: 'Banana', calories: 105, protein: 1.3, carbs: 27, fat: 0.4 },
    { id: '3', foodName: 'Chicken Breast (100g)', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    { id: '4', foodName: 'Brown Rice (1 cup)', calories: 215, protein: 5, carbs: 45, fat: 1.8 },
    { id: '5', foodName: 'Salmon (100g)', calories: 208, protein: 20, carbs: 0, fat: 13 },
    { id: '6', foodName: 'Broccoli (1 cup)', calories: 55, protein: 3.7, carbs: 11, fat: 0.6 },
    { id: '7', foodName: 'Almonds (28g)', calories: 164, protein: 6, carbs: 6, fat: 14 },
    { id: '8', foodName: 'Greek Yogurt (1 cup)', calories: 100, protein: 17, carbs: 6, fat: 0.4 },
    { id: '9', foodName: 'Eggs (2 large)', calories: 156, protein: 13, carbs: 1.1, fat: 11 },
    { id: '10', foodName: 'Oatmeal (1 cup cooked)', calories: 158, protein: 6, carbs: 27, fat: 3.2 },
  ];

  const searchFoods = (query: string): FoodItem[] => {
    if (!query) return [];
    return foodDatabase.filter(food =>
      food.foodName.toLowerCase().includes(query.toLowerCase())
    );
  };
  useEffect(() => {
    if (user) {
      // Load user profile from localStorage
      const savedProfile = localStorage.getItem(`profile_${user.id}`);
      if (savedProfile) {
        setUserProfile(JSON.parse(savedProfile));
      }
      // Load meals from localStorage
      const savedMeals = localStorage.getItem(`meals_${user.id}`);
      if (savedMeals) {
        setMeals(JSON.parse(savedMeals));
      }
      // Load activities from localStorage
      const savedActivities = localStorage.getItem(`activities_${user.id}`);
      if (savedActivities) {
        setActivities(JSON.parse(savedActivities));
      }
      // Calculate daily nutrition
      calculateDailyNutrition();
    }
  }, [user]);
  useEffect(() => {
    calculateDailyNutrition();
  }, [meals, userProfile]);
  const calculateDailyNutrition = () => {
    if (!user) return;
    const today = new Date().toISOString().split('T')[0];
    const todaysMeals = meals.filter(meal => meal.date.includes(today));
    const totalCalories = todaysMeals.reduce((sum, meal) => sum + meal.calories, 0);
    const totalProtein = todaysMeals.reduce((sum, meal) => sum + meal.protein, 0);
    const totalCarbs = todaysMeals.reduce((sum, meal) => sum + meal.carbs, 0);
    const totalFat = todaysMeals.reduce((sum, meal) => sum + meal.fat, 0);
    // Calculate goal calories based on user profile
    let goalCalories = 2000; // Default
    if (userProfile.weight && userProfile.height && userProfile.age && userProfile.gender && userProfile.activityLevel) {
      // Basic BMR calculation (Mifflin-St Jeor Equation)
      let bmr = 0;
      if (userProfile.gender === 'Male') {
        bmr = 10 * userProfile.weight + 6.25 * userProfile.height - 5 * userProfile.age + 5;
      } else {
        bmr = 10 * userProfile.weight + 6.25 * userProfile.height - 5 * userProfile.age - 161;
      }
      // Activity multiplier
      const activityMultiplier = userProfile.activityLevel === 'Sedentary' ? 1.2 : userProfile.activityLevel === 'Moderate' ? 1.55 : 1.725;
      // TDEE (Total Daily Energy Expenditure)
      goalCalories = Math.round(bmr * activityMultiplier);
      // Adjust based on fitness goal
      if (userProfile.fitnessGoal === 'Weight loss') {
        goalCalories -= 500; // Deficit for weight loss
      } else if (userProfile.fitnessGoal === 'Weight gain') {
        goalCalories += 500; // Surplus for weight gain
      }
    }
    setDailyNutrition({
      date: today,
      totalCalories,
      totalProtein,
      totalCarbs,
      totalFat,
      goalCalories
    });
  };
  const updateUserProfile = (profile: Partial<UserProfile>) => {
    if (!user) return;
    const updatedProfile = {
      ...userProfile,
      ...profile
    };
    setUserProfile(updatedProfile);
    localStorage.setItem(`profile_${user.id}`, JSON.stringify(updatedProfile));
  };
  const addMeal = (mealData: Omit<Meal, 'id' | 'userId'>) => {
    if (!user) return;
    const newMeal: Meal = {
      id: Date.now().toString(),
      userId: user.id,
      ...mealData
    };
    const updatedMeals = [...meals, newMeal];
    setMeals(updatedMeals);
    localStorage.setItem(`meals_${user.id}`, JSON.stringify(updatedMeals));
  };
  const addActivity = (activityData: Omit<Activity, 'id' | 'userId'>) => {
    if (!user) return;
    const newActivity: Activity = {
      id: Date.now().toString(),
      userId: user.id,
      ...activityData
    };
    const updatedActivities = [...activities, newActivity];
    setActivities(updatedActivities);
    localStorage.setItem(`activities_${user.id}`, JSON.stringify(updatedActivities));
  };
  const isProfileComplete = userProfile.age !== null && userProfile.gender !== null && userProfile.height !== null && userProfile.weight !== null && userProfile.activityLevel !== null && userProfile.fitnessGoal !== null;
  return <UserDataContext.Provider value={{
    userProfile,
    updateUserProfile,
    meals,
    addMeal,
    activities,
    addActivity,
    dailyNutrition,
    isProfileComplete,
    foodDatabase,
    searchFoods
  }}>
      {children}
    </UserDataContext.Provider>;
};
export const useUserData = (): UserDataContextType => {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
};