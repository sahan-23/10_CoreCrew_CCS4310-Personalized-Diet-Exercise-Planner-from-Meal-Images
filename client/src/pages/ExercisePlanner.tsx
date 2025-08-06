import React, { useEffect, useState } from 'react';
import { CalendarIcon, FilterIcon, SaveIcon } from 'lucide-react';
import ExerciseCard from '../components/ExerciseCard';
import { getMockExercises } from '../utils/mockData';
const ExercisePlanner = ({
  user
}) => {
  const [exercises, setExercises] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selectedDay, setSelectedDay] = useState('today');
  useEffect(() => {
    setExercises(getMockExercises());
  }, []);
  const filteredExercises = exercises.filter(exercise => {
    if (filter === 'all') return true;
    return exercise.category === filter;
  });
  const days = [{
    id: 'today',
    name: 'Today'
  }, {
    id: 'tomorrow',
    name: 'Tomorrow'
  }, {
    id: 'day3',
    name: 'Wed'
  }, {
    id: 'day4',
    name: 'Thu'
  }, {
    id: 'day5',
    name: 'Fri'
  }, {
    id: 'day6',
    name: 'Sat'
  }, {
    id: 'day7',
    name: 'Sun'
  }];
  const categories = [{
    id: 'all',
    name: 'All Exercises'
  }, {
    id: 'cardio',
    name: 'Cardio'
  }, {
    id: 'strength',
    name: 'Strength'
  }, {
    id: 'flexibility',
    name: 'Flexibility'
  }, {
    id: 'balance',
    name: 'Balance'
  }];
  return <div className="space-y-6">
      <div data-aos="fade-down">
        <h1 className="text-2xl font-semibold text-gray-900">
          Exercise Planner
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Personalized workout recommendations based on your nutrition
        </p>
      </div>
      <div className="bg-white shadow overflow-hidden rounded-md" data-aos="fade-up">
        <div className="flex space-x-1 p-1 bg-gray-50">
          {days.map(day => <button key={day.id} className={`${selectedDay === day.id ? 'bg-white shadow-sm' : 'hover:bg-gray-100'} flex-1 relative px-3 py-2 text-sm font-medium text-gray-700 rounded-md focus:outline-none`} onClick={() => setSelectedDay(day.id)}>
              <span>{day.name}</span>
              {selectedDay === day.id && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500"></span>}
            </button>)}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="w-full sm:w-64 bg-white shadow rounded-lg p-4" data-aos="fade-right">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
            <FilterIcon className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-2">
            {categories.map(category => <button key={category.id} className={`${filter === category.id ? 'bg-indigo-50 text-indigo-700 border-indigo-500' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'} w-full flex justify-between items-center px-4 py-2 border rounded-md text-sm font-medium`} onClick={() => setFilter(category.id)}>
                {category.name}
              </button>)}
          </div>
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900 mb-2">
              Intensity Level
            </h3>
            <input type="range" min="1" max="5" defaultValue="3" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900 mb-2">
              Duration (minutes)
            </h3>
            <div className="flex items-center space-x-2">
              <input type="number" min="5" max="120" defaultValue="30" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              <button className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Apply
              </button>
            </div>
          </div>
          <button className="mt-6 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <SaveIcon className="-ml-1 mr-2 h-4 w-4" />
            Save Workout Plan
          </button>
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-2">
            {filteredExercises.map((exercise, index) => <ExerciseCard key={exercise.id} exercise={exercise} delay={index * 100} />)}
          </div>
        </div>
      </div>
    </div>;
};
export default ExercisePlanner;