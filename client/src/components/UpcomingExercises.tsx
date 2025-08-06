import React from 'react';
import { Clock, CalendarIcon, ChevronRightIcon } from 'lucide-react';
const UpcomingExercises = ({
  exercises
}) => {
  return <div className="overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {exercises.map(exercise => <li key={exercise.id} className="py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <img className="h-12 w-12 rounded-md object-cover" src={exercise.imageUrl} alt={exercise.name} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {exercise.name}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {exercise.description.substring(0, 60)}...
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                  <p>{exercise.duration} min</p>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <CalendarIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                  <p>Today</p>
                </div>
                <div className="flex-shrink-0">
                  <button className="inline-flex items-center rounded-full border border-transparent bg-gray-100 p-1 text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <ChevronRightIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </li>)}
      </ul>
    </div>;
};
export default UpcomingExercises;