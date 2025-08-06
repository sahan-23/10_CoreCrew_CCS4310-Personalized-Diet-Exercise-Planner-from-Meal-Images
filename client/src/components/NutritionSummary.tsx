import React from 'react';
const NutritionSummary = ({
  nutritionData
}) => {
  const {
    calories,
    protein,
    carbs,
    fat
  } = nutritionData;
  // Calculate percentages for the macros
  const total = protein * 4 + carbs * 4 + fat * 9; // calories from each macro
  const proteinPercentage = Math.round(protein * 4 / total * 100);
  const carbsPercentage = Math.round(carbs * 4 / total * 100);
  const fatPercentage = Math.round(fat * 9 / total * 100);
  return <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="text-sm font-medium text-gray-500">
            Daily Calories
          </div>
          <div className="text-sm font-medium text-gray-900">
            {calories} / 2000 kcal
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{
          width: `${Math.min(100, calories / 2000 * 100)}%`
        }}></div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="text-sm font-medium text-gray-500">Protein</div>
            <div className="text-sm font-medium text-gray-900">{protein}g</div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-green-500 h-2.5 rounded-full" style={{
            width: `${proteinPercentage}%`
          }}></div>
          </div>
          <div className="text-xs text-gray-500 text-center">
            {proteinPercentage}%
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="text-sm font-medium text-gray-500">Carbs</div>
            <div className="text-sm font-medium text-gray-900">{carbs}g</div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-500 h-2.5 rounded-full" style={{
            width: `${carbsPercentage}%`
          }}></div>
          </div>
          <div className="text-xs text-gray-500 text-center">
            {carbsPercentage}%
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="text-sm font-medium text-gray-500">Fat</div>
            <div className="text-sm font-medium text-gray-900">{fat}g</div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-yellow-500 h-2.5 rounded-full" style={{
            width: `${fatPercentage}%`
          }}></div>
          </div>
          <div className="text-xs text-gray-500 text-center">
            {fatPercentage}%
          </div>
        </div>
      </div>
      <div className="pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm">
          <div className="text-gray-500">Recommended daily intake</div>
          <div className="font-medium text-gray-900">2000 kcal</div>
        </div>
        <div className="mt-1 flex justify-between text-sm">
          <div className="text-gray-500">Remaining today</div>
          <div className="font-medium text-gray-900">
            {Math.max(0, 2000 - calories)} kcal
          </div>
        </div>
      </div>
    </div>;
};
export default NutritionSummary;