import React, { useState } from 'react';
import { useUserData, ActivityLevel, FitnessGoal, Gender } from '../context/UserDataContext';
import { SaveIcon } from 'lucide-react';
const Profile: React.FC = () => {
  const {
    userProfile,
    updateUserProfile
  } = useUserData();
  const [formData, setFormData] = useState({
    age: userProfile.age || '',
    gender: userProfile.gender || '',
    height: userProfile.height || '',
    weight: userProfile.weight || '',
    activityLevel: userProfile.activityLevel || '',
    fitnessGoal: userProfile.fitnessGoal || ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' || name === 'height' || name === 'weight' ? value === '' ? '' : Number(value) : value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage('');
    // Convert empty strings to null for the numeric fields
    const processedData = {
      age: formData.age === '' ? null : Number(formData.age),
      gender: formData.gender === '' ? null : formData.gender as Gender,
      height: formData.height === '' ? null : Number(formData.height),
      weight: formData.weight === '' ? null : Number(formData.weight),
      activityLevel: formData.activityLevel === '' ? null : formData.activityLevel as ActivityLevel,
      fitnessGoal: formData.fitnessGoal === '' ? null : formData.fitnessGoal as FitnessGoal
    };
    // Simulate API call
    setTimeout(() => {
      updateUserProfile(processedData);
      setSuccessMessage('Profile updated successfully!');
      setIsLoading(false);
    }, 600);
  };
  return <div className="container mx-auto">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
        {successMessage && <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-green-700">{successMessage}</p>
              </div>
            </div>
          </div>}
        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                  Age
                </label>
                <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} min="1" max="120" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500" />
              </div>
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500">
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
                  Height (cm)
                </label>
                <input type="number" id="height" name="height" value={formData.height} onChange={handleChange} min="50" max="250" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500" />
              </div>
              <div>
                <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                  Weight (kg)
                </label>
                <input type="number" id="weight" name="weight" value={formData.weight} onChange={handleChange} min="20" max="300" step="0.1" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500" />
              </div>
              <div>
                <label htmlFor="activityLevel" className="block text-sm font-medium text-gray-700 mb-1">
                  Activity Level
                </label>
                <select id="activityLevel" name="activityLevel" value={formData.activityLevel} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500">
                  <option value="">Select activity level</option>
                  <option value="Sedentary">
                    Sedentary (little or no exercise)
                  </option>
                  <option value="Moderate">
                    Moderate (exercise 3-5 days/week)
                  </option>
                  <option value="Active">
                    Active (exercise 6-7 days/week)
                  </option>
                </select>
              </div>
              <div>
                <label htmlFor="fitnessGoal" className="block text-sm font-medium text-gray-700 mb-1">
                  Fitness Goal
                </label>
                <select id="fitnessGoal" name="fitnessGoal" value={formData.fitnessGoal} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500">
                  <option value="">Select fitness goal</option>
                  <option value="Weight loss">Weight loss</option>
                  <option value="Weight gain">Weight gain</option>
                  <option value="Maintain">Maintain current weight</option>
                </select>
              </div>
            </div>
            <div className="mt-8">
              <button type="submit" disabled={isLoading} className={`flex items-center justify-center w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}>
                {isLoading ? <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </> : <>
                    <SaveIcon className="mr-2 h-4 w-4" />
                    Save Profile
                  </>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>;
};
export default Profile;