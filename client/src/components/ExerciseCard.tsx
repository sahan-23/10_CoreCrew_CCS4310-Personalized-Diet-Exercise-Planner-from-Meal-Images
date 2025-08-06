import React from 'react';
import { Clock, Flame, BarChart, PlayCircleIcon } from 'lucide-react';
const ExerciseCard = ({
  exercise,
  delay = 0
}) => {
  return <div className="bg-white overflow-hidden shadow rounded-lg flex flex-col" data-aos="fade-up" data-aos-delay={delay}>
      <div className="relative">
        <img src={exercise.imageUrl} alt={exercise.name} className="h-48 w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <div className="p-4 text-white">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${exercise.category === 'cardio' ? 'bg-red-500 bg-opacity-90' : exercise.category === 'strength' ? 'bg-blue-500 bg-opacity-90' : exercise.category === 'flexibility' ? 'bg-purple-500 bg-opacity-90' : 'bg-green-500 bg-opacity-90'}`}>
              {exercise.category.charAt(0).toUpperCase() + exercise.category.slice(1)}
            </span>
            <h3 className="mt-1 text-lg font-medium">{exercise.name}</h3>
          </div>
        </div>
        <button className="absolute top-2 right-2 bg-white bg-opacity-80 p-1.5 rounded-full hover:bg-opacity-100 transition-all">
          <PlayCircleIcon className="h-5 w-5 text-indigo-600" />
        </button>
      </div>
      <div className="px-4 py-4 flex-1 flex flex-col">
        <div className="flex-1">
          <p className="text-sm text-gray-500">{exercise.description}</p>
          <dl className="mt-4 grid grid-cols-3 gap-x-4 gap-y-2">
            <div className="col-span-1 flex items-center">
              <Clock className="h-4 w-4 text-gray-400 mr-1" />
              <div>
                <dt className="text-xs text-gray-500">Duration</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {exercise.duration} min
                </dd>
              </div>
            </div>
            <div className="col-span-1 flex items-center">
              <Flame className="h-4 w-4 text-gray-400 mr-1" />
              <div>
                <dt className="text-xs text-gray-500">Calories</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {exercise.caloriesBurned}
                </dd>
              </div>
            </div>
            <div className="col-span-1 flex items-center">
              <BarChart className="h-4 w-4 text-gray-400 mr-1" />
              <div>
                <dt className="text-xs text-gray-500">Intensity</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {exercise.intensity}
                </dd>
              </div>
            </div>
          </dl>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="flex -space-x-1 overflow-hidden">
            {[1, 2, 3].map(i => <img key={i} className="inline-block h-6 w-6 rounded-full ring-2 ring-white" src={`https://randomuser.me/api/portraits/men/${20 + i}.jpg`} alt="" />)}
            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-100 text-xs font-medium text-gray-500 ring-2 ring-white">
              +2
            </span>
          </div>
          <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Add to Plan
          </button>
        </div>
      </div>
    </div>;
};
export default ExerciseCard;