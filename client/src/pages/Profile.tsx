import React, { useState } from 'react';
import { SaveIcon, UserIcon, LockIcon, BellIcon, SettingsIcon } from 'lucide-react';
const Profile = ({
  user,
  setUser
}) => {
  const [formData, setFormData] = useState({
    ...user
  });
  const [activeTab, setActiveTab] = useState('personal');
  const handleChange = e => {
    const {
      name,
      value
    } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    setUser(formData);
    alert('Profile updated successfully!');
  };
  const handleArrayChange = (e, field) => {
    const value = e.target.value;
    if (formData[field].includes(value)) {
      setFormData({
        ...formData,
        [field]: formData[field].filter(item => item !== value)
      });
    } else {
      setFormData({
        ...formData,
        [field]: [...formData[field], value]
      });
    }
  };
  const tabs = [{
    id: 'personal',
    name: 'Personal Info',
    icon: UserIcon
  }, {
    id: 'preferences',
    name: 'Preferences',
    icon: SettingsIcon
  }, {
    id: 'notifications',
    name: 'Notifications',
    icon: BellIcon
  }, {
    id: 'security',
    name: 'Security',
    icon: LockIcon
  }];
  return <div className="space-y-6">
      <div data-aos="fade-down">
        <h1 className="text-2xl font-semibold text-gray-900">
          Profile Settings
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account settings and preferences
        </p>
      </div>
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {tabs.map(tab => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`${activeTab === tab.id ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} flex-1 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center justify-center`} data-aos="fade-down" data-aos-delay={tabs.indexOf(tab) * 100}>
                <tab.icon className={`${activeTab === tab.id ? 'text-indigo-500' : 'text-gray-400'} -ml-0.5 mr-2 h-5 w-5`} aria-hidden="true" />
                {tab.name}
              </button>)}
          </nav>
        </div>
        {activeTab === 'personal' && <form onSubmit={handleSubmit} className="p-6 space-y-6" data-aos="fade-up">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full name
                </label>
                <div className="mt-1">
                  <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                  Age
                </label>
                <div className="mt-1">
                  <input type="number" name="age" id="age" value={formData.age} onChange={handleChange} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                  Weight (kg)
                </label>
                <div className="mt-1">
                  <input type="number" name="weight" id="weight" value={formData.weight} onChange={handleChange} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="height" className="block text-sm font-medium text-gray-700">
                  Height (cm)
                </label>
                <div className="mt-1">
                  <input type="number" name="height" id="height" value={formData.height} onChange={handleChange} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                </div>
              </div>
              <div className="sm:col-span-6">
                <label htmlFor="goals" className="block text-sm font-medium text-gray-700">
                  Fitness Goals
                </label>
                <div className="mt-1">
                  <select id="goals" name="goals" value={formData.goals} onChange={handleChange} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md">
                    <option>Weight loss</option>
                    <option>Muscle gain</option>
                    <option>Endurance</option>
                    <option>General fitness</option>
                    <option>Strength training</option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-6">
                <label htmlFor="activityLevel" className="block text-sm font-medium text-gray-700">
                  Activity Level
                </label>
                <div className="mt-1">
                  <select id="activityLevel" name="activityLevel" value={formData.activityLevel} onChange={handleChange} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md">
                    <option>Sedentary</option>
                    <option>Lightly active</option>
                    <option>Moderate</option>
                    <option>Very active</option>
                    <option>Extremely active</option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-6">
                <fieldset>
                  <legend className="text-sm font-medium text-gray-700">
                    Dietary Restrictions
                  </legend>
                  <div className="mt-2 space-y-2">
                    {['None', 'Vegetarian', 'Vegan', 'Gluten-free', 'Dairy-free', 'Nut-free'].map(option => <div key={option} className="flex items-start">
                        <div className="flex items-center h-5">
                          <input id={option} name="dietaryRestrictions" type="checkbox" value={option} checked={formData.dietaryRestrictions.includes(option)} onChange={e => handleArrayChange(e, 'dietaryRestrictions')} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor={option} className="font-medium text-gray-700">
                            {option}
                          </label>
                        </div>
                      </div>)}
                  </div>
                </fieldset>
              </div>
            </div>
            <div className="flex justify-end">
              <button type="submit" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <SaveIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                Save
              </button>
            </div>
          </form>}
        {activeTab === 'preferences' && <div className="p-6 space-y-6" data-aos="fade-up">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Preferences
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    Dark Mode
                  </h4>
                  <p className="text-sm text-gray-500">
                    Enable dark mode for the application
                  </p>
                </div>
                <button type="button" className="bg-gray-200 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" role="switch" aria-checked="false">
                  <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Units</h4>
                  <p className="text-sm text-gray-500">
                    Choose your preferred measurement units
                  </p>
                </div>
                <div className="flex items-center">
                  <button type="button" className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-l-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Metric
                  </button>
                  <button type="button" className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Imperial
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    Language
                  </h4>
                  <p className="text-sm text-gray-500">
                    Select your preferred language
                  </p>
                </div>
                <select className="mt-1 block w-40 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" defaultValue="English">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                  <option>Chinese</option>
                </select>
              </div>
            </div>
          </div>}
        {activeTab === 'notifications' && <div className="p-6 space-y-6" data-aos="fade-up">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Notification Settings
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    Email Notifications
                  </h4>
                  <p className="text-sm text-gray-500">
                    Receive emails about your account activity
                  </p>
                </div>
                <button type="button" className="bg-indigo-600 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" role="switch" aria-checked="true">
                  <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    Push Notifications
                  </h4>
                  <p className="text-sm text-gray-500">
                    Receive push notifications on your device
                  </p>
                </div>
                <button type="button" className="bg-indigo-600 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" role="switch" aria-checked="true">
                  <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    Meal Reminders
                  </h4>
                  <p className="text-sm text-gray-500">
                    Get reminded to log your meals
                  </p>
                </div>
                <button type="button" className="bg-indigo-600 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" role="switch" aria-checked="true">
                  <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    Exercise Reminders
                  </h4>
                  <p className="text-sm text-gray-500">
                    Get reminded about your scheduled workouts
                  </p>
                </div>
                <button type="button" className="bg-indigo-600 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" role="switch" aria-checked="true">
                  <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
                </button>
              </div>
            </div>
          </div>}
        {activeTab === 'security' && <div className="p-6 space-y-6" data-aos="fade-up">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Security Settings
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-900">
                  Change Password
                </h4>
                <div className="mt-2 space-y-4">
                  <div>
                    <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                      Current Password
                    </label>
                    <input type="password" name="current-password" id="current-password" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                  <div>
                    <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                      New Password
                    </label>
                    <input type="password" name="new-password" id="new-password" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                  <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                      Confirm New Password
                    </label>
                    <input type="password" name="confirm-password" id="confirm-password" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                  <div className="flex justify-end">
                    <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
              <div className="pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-900">
                  Two-Factor Authentication
                </h4>
                <p className="mt-1 text-sm text-gray-500">
                  Add an extra layer of security to your account
                </p>
                <div className="mt-4 flex">
                  <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Enable 2FA
                  </button>
                </div>
              </div>
              <div className="pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-red-500">
                  Danger Zone
                </h4>
                <p className="mt-1 text-sm text-gray-500">
                  Once you delete your account, it cannot be undone
                </p>
                <div className="mt-4 flex">
                  <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>}
      </div>
    </div>;
};
export default Profile;