// Mock data for the application
// Mock meals data
export const getMockMeals = () => [{
  id: 1,
  name: 'Grilled Chicken Salad',
  type: 'Lunch',
  time: '12:30 PM',
  category: 'healthy',
  imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80',
  nutrition: {
    calories: 350,
    protein: 32,
    carbs: 18,
    fat: 15
  },
  suggestedExercise: '30 minutes of light cardio like walking or cycling'
}, {
  id: 2,
  name: 'Avocado Toast',
  type: 'Breakfast',
  time: '8:15 AM',
  category: 'healthy',
  imageUrl: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80',
  nutrition: {
    calories: 280,
    protein: 10,
    carbs: 30,
    fat: 14
  },
  suggestedExercise: '15 minutes of yoga or stretching'
}, {
  id: 3,
  name: 'Salmon with Vegetables',
  type: 'Dinner',
  time: '7:00 PM',
  category: 'healthy',
  imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80',
  nutrition: {
    calories: 450,
    protein: 38,
    carbs: 25,
    fat: 22
  },
  suggestedExercise: 'Strength training focusing on upper body'
}, {
  id: 4,
  name: 'Protein Smoothie',
  type: 'Snack',
  time: '3:45 PM',
  category: 'healthy',
  imageUrl: 'https://images.unsplash.com/photo-1502741224143-90386d7f8c82?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80',
  nutrition: {
    calories: 220,
    protein: 20,
    carbs: 25,
    fat: 5
  },
  suggestedExercise: '10 minutes of high-intensity interval training'
}, {
  id: 5,
  name: 'Pasta with Meatballs',
  type: 'Dinner',
  time: '6:30 PM',
  category: 'moderate',
  imageUrl: 'https://images.unsplash.com/photo-1515516969-d4008cc6241a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80',
  nutrition: {
    calories: 650,
    protein: 35,
    carbs: 80,
    fat: 22
  },
  suggestedExercise: '45 minutes of cardio like running or swimming'
}];
// Mock exercises data
export const getMockExercises = () => [{
  id: 1,
  name: 'Morning Jog',
  category: 'cardio',
  description: 'A light jog to start your day and boost metabolism. Great for cardiovascular health.',
  duration: 30,
  caloriesBurned: '300 kcal',
  intensity: 'Medium',
  imageUrl: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80'
}, {
  id: 2,
  name: 'Strength Training',
  category: 'strength',
  description: 'Full body workout focusing on major muscle groups. Includes squats, deadlifts, and bench press.',
  duration: 45,
  caloriesBurned: '400 kcal',
  intensity: 'High',
  imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80'
}, {
  id: 3,
  name: 'Yoga Session',
  category: 'flexibility',
  description: 'Improve flexibility and mindfulness with this relaxing yoga session. Perfect for stress relief.',
  duration: 40,
  caloriesBurned: '200 kcal',
  intensity: 'Low',
  imageUrl: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80'
}, {
  id: 4,
  name: 'HIIT Workout',
  category: 'cardio',
  description: 'High-intensity interval training to maximize calorie burn in a short time. Alternates between intense bursts and recovery.',
  duration: 25,
  caloriesBurned: '350 kcal',
  intensity: 'Very High',
  imageUrl: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80'
}, {
  id: 5,
  name: 'Balance Training',
  category: 'balance',
  description: 'Improve stability and core strength with these balance exercises. Great for injury prevention.',
  duration: 20,
  caloriesBurned: '150 kcal',
  intensity: 'Medium',
  imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80'
}, {
  id: 6,
  name: 'Swimming',
  category: 'cardio',
  description: 'Full body workout with low impact on joints. Great for cardiovascular health and muscle toning.',
  duration: 45,
  caloriesBurned: '500 kcal',
  intensity: 'Medium',
  imageUrl: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80'
}];
// Mock function to analyze a meal image
export const analyzeMealImage = imageFile => {
  // In a real app, this would send the image to an API for analysis
  // Here we just return a mock result
  const mockResults = [{
    id: Math.floor(Math.random() * 1000),
    name: 'Fresh Fruit Bowl',
    type: 'Breakfast',
    time: new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    }),
    category: 'healthy',
    imageUrl: URL.createObjectURL(imageFile),
    nutrition: {
      calories: 180,
      protein: 3,
      carbs: 40,
      fat: 1
    },
    suggestedExercise: 'Light stretching or a short walk'
  }, {
    id: Math.floor(Math.random() * 1000),
    name: 'Chicken and Rice Bowl',
    type: 'Lunch',
    time: new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    }),
    category: 'healthy',
    imageUrl: URL.createObjectURL(imageFile),
    nutrition: {
      calories: 420,
      protein: 35,
      carbs: 45,
      fat: 12
    },
    suggestedExercise: '30 minute moderate cardio session'
  }, {
    id: Math.floor(Math.random() * 1000),
    name: 'Chocolate Dessert',
    type: 'Snack',
    time: new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    }),
    category: 'indulgent',
    imageUrl: URL.createObjectURL(imageFile),
    nutrition: {
      calories: 350,
      protein: 5,
      carbs: 45,
      fat: 18
    },
    suggestedExercise: '45 minute high intensity workout'
  }];
  // Return a random result from our mock options
  return mockResults[Math.floor(Math.random() * mockResults.length)];
};