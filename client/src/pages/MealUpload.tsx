import React, { useState, useRef } from 'react';
import { useUserData, MealType, PortionSize, FoodItem } from '../context/UserDataContext';
import { CameraIcon, UploadIcon, XIcon, CheckIcon, SearchIcon, UtensilsIcon } from 'lucide-react';

const MealUpload: React.FC = () => {
  const { addMeal, isProfileComplete, foodDatabase, searchFoods } = useUserData();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState<'upload' | 'details' | 'success'>('upload');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFoodSelector, setShowFoodSelector] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  
  const [mealData, setMealData] = useState({
    foodName: '',
    mealType: 'Breakfast' as MealType,
    portionSize: 'Medium' as PortionSize,
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    date: new Date().toISOString().split('T')[0]
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
      analyzeImage(file);
    };
    reader.readAsDataURL(file);
  };

  const analyzeImage = (file: File) => {
    setIsAnalyzing(true);
    // Mock API call to analyze the image
    setTimeout(() => {
      // Simulate API response with food analysis
      const mockAnalysis = {
        foodName: 'Grilled Chicken Salad',
        calories: 350,
        protein: 30,
        carbs: 15,
        fat: 18
      };
      setMealData(prev => ({
        ...prev,
        ...mockAnalysis
      }));
      setIsAnalyzing(false);
      setStep('details');
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMealData(prev => ({
      ...prev,
      [name]: ['calories', 'protein', 'carbs', 'fat'].includes(name) ? Number(value) : value
    }));
  };

  const handleFoodSelect = (food: FoodItem) => {
    setSelectedFood(food);
    setMealData(prev => ({
      ...prev,
      foodName: food.foodName,
      calories: food.calories,
      protein: food.protein,
      carbs: food.carbs,
      fat: food.fat
    }));
    setShowFoodSelector(false);
    setSearchQuery('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call to save meal data
    setTimeout(() => {
      addMeal({
        ...mealData,
        imageUrl: imagePreview || undefined,
        date: mealData.date
      });
      setIsSubmitting(false);
      setStep('success');
    }, 1000);
  };

  const resetForm = () => {
    setImagePreview(null);
    setSelectedFood(null);
    setMealData({
      foodName: '',
      mealType: 'Breakfast',
      portionSize: 'Medium',
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      date: new Date().toISOString().split('T')[0]
    });
    setStep('upload');
    setShowFoodSelector(false);
    setSearchQuery('');
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const filteredFoods = searchFoods(searchQuery);

  return (
    <div className="container mx-auto">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Log Your Meal</h1>
        
        {!isProfileComplete && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <p className="text-sm text-yellow-700">
              For more accurate recommendations, please complete your profile first.
            </p>
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Progress Steps */}
          <div className="border-b">
            <div className="flex">
              <div className={`flex-1 text-center py-3 ${step === 'upload' ? 'bg-green-50 text-green-700 font-medium' : ''}`}>
                1. Upload Photo
              </div>
              <div className={`flex-1 text-center py-3 ${step === 'details' ? 'bg-green-50 text-green-700 font-medium' : ''}`}>
                2. Meal Details
              </div>
              <div className={`flex-1 text-center py-3 ${step === 'success' ? 'bg-green-50 text-green-700 font-medium' : ''}`}>
                3. Complete
              </div>
            </div>
          </div>
          
          <div className="p-6">
            {step === 'upload' && (
              <div className="text-center">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                
                <div
                  onClick={triggerFileInput}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-12 cursor-pointer hover:border-green-500 transition-colors"
                >
                  <CameraIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    Take a photo or upload an image of your meal
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Supported formats: JPG, PNG
                  </p>
                  <button
                    type="button"
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                    onClick={triggerFileInput}
                  >
                    <UploadIcon className="mr-2 h-4 w-4" />
                    Upload Photo
                  </button>
                </div>
                
                <div className="mt-6">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Don't have a photo?
                  </p>
                  <button
                    type="button"
                    onClick={() => setStep('details')}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Enter meal manually
                  </button>
                </div>
              </div>
            )}
            
            {step === 'details' && (
              <form onSubmit={handleSubmit}>
                {imagePreview && (
                  <div className="mb-6">
                    <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={imagePreview}
                        alt="Meal preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setImagePreview(null)}
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow"
                      >
                        <XIcon className="h-5 w-5 text-gray-600" />
                      </button>
                    </div>
                    {isAnalyzing && (
                      <div className="mt-2 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-green-500 mr-2"></div>
                        <p className="text-sm text-gray-600">
                          Analyzing your meal...
                        </p>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="space-y-6">
                  {/* Food Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Food
                    </label>
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => setShowFoodSelector(!showFoodSelector)}
                        className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <UtensilsIcon className="mr-2 h-4 w-4" />
                        {selectedFood ? 'Change Food' : 'Choose from Database'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedFood(null);
                          setMealData(prev => ({
                            ...prev,
                            foodName: '',
                            calories: 0,
                            protein: 0,
                            carbs: 0,
                            fat: 0
                          }));
                        }}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Custom
                      </button>
                    </div>
                    
                    {selectedFood && (
                      <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md">
                        <p className="text-sm font-medium text-green-800">
                          Selected: {selectedFood.foodName}
                        </p>
                        <p className="text-xs text-green-600 mt-1">
                          {selectedFood.calories} cal | {selectedFood.protein}g protein | {selectedFood.carbs}g carbs | {selectedFood.fat}g fat
                        </p>
                      </div>
                    )}
                    
                    {showFoodSelector && (
                      <div className="mt-3 border border-gray-300 rounded-md">
                        <div className="p-3 border-b border-gray-200">
                          <div className="relative">
                            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                              type="text"
                              placeholder="Search foods..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                            />
                          </div>
                        </div>
                        <div className="max-h-48 overflow-y-auto">
                          {filteredFoods.map((food) => (
                            <button
                              key={food.id}
                              type="button"
                              onClick={() => handleFoodSelect(food)}
                              className="w-full p-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                            >
                              <div className="flex justify-between items-center">
                                <span className="font-medium text-gray-900">{food.foodName}</span>
                                <span className="text-sm text-gray-500">{food.calories} cal</span>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                P: {food.protein}g | C: {food.carbs}g | F: {food.fat}g
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="foodName" className="block text-sm font-medium text-gray-700 mb-1">
                      Food Name
                    </label>
                    <input
                      type="text"
                      id="foodName"
                      name="foodName"
                      value={mealData.foodName}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                      placeholder="Enter food name or select from database"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="mealType" className="block text-sm font-medium text-gray-700 mb-1">
                        Meal Type
                      </label>
                      <select
                        id="mealType"
                        name="mealType"
                        value={mealData.mealType}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                        <option value="Snack">Snack</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="portionSize" className="block text-sm font-medium text-gray-700 mb-1">
                        Portion Size
                      </label>
                      <select
                        id="portionSize"
                        name="portionSize"
                        value={mealData.portionSize}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label htmlFor="calories" className="block text-sm font-medium text-gray-700 mb-1">
                        Calories
                      </label>
                      <input
                        type="number"
                        id="calories"
                        name="calories"
                        value={mealData.calories}
                        onChange={handleChange}
                        min="0"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="protein" className="block text-sm font-medium text-gray-700 mb-1">
                        Protein (g)
                      </label>
                      <input
                        type="number"
                        id="protein"
                        name="protein"
                        value={mealData.protein}
                        onChange={handleChange}
                        min="0"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="carbs" className="block text-sm font-medium text-gray-700 mb-1">
                        Carbs (g)
                      </label>
                      <input
                        type="number"
                        id="carbs"
                        name="carbs"
                        value={mealData.carbs}
                        onChange={handleChange}
                        min="0"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="fat" className="block text-sm font-medium text-gray-700 mb-1">
                        Fat (g)
                      </label>
                      <input
                        type="number"
                        id="fat"
                        name="fat"
                        value={mealData.fat}
                        onChange={handleChange}
                        min="0"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={mealData.date}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setStep('upload')}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Saving...
                      </>
                    ) : (
                      'Save Meal'
                    )}
                  </button>
                </div>
              </form>
            )}
            
            {step === 'success' && (
              <div className="text-center py-8">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <CheckIcon className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="mt-3 text-lg font-medium text-gray-900">
                  Meal logged successfully!
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Your meal has been added to your daily log.
                </p>
                <div className="mt-6 flex justify-center space-x-3">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                  >
                    Log Another Meal
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealUpload;