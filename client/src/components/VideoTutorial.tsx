import React from 'react';
export const VideoTutorial = () => {
  return <div className="relative">
      <div className="aspect-w-1 aspect-h-9 bg-gray-100">
<iframe className="w-full h-full" src="https://www.youtube.com/embed/Wa4f7f5y7uQ" title="Personalized Diet & Exercise Planning" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

      </div>
      <div className="p-6 bg-white">
        <h2 className="text-2xl font-bold mb-12 text-gray-800">
          Personalized Nutrition Guide
        </h2>
        <p className="text-gray-600 text-lg">
          Learn how NutriScan creates custom diet and exercise plans based on
          your food choices and nutritional needs.
        </p>
      </div>
    </div>;
};