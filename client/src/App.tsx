import React, { useState } from 'react';
import { Header } from './components/Header';
import { ImageUpload } from './components/ImageUpload';
import { PredictionDisplay } from './components/PredictionDisplay';
import { RecommendationCard } from './components/RecommendationCard';
import { Footer } from './components/Footer';
import { FeatureCards } from './components/FeatureCards';
import { VideoTutorial } from './components/VideoTutorial';
export function App() {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleImageUpload = async imageFile => {
    setImage(imageFile);
    setLoading(true);
    // Simulate API call for demonstration
    setTimeout(() => {
      setPrediction({
        foodName: 'Rice and Curry',
        calories: 450,
        nutrients: {
          carbs: 65,
          protein: 15,
          fat: 12,
          sugar: 4
        },
        healthRisks: [{
          name: 'High Blood Sugar',
          level: 'moderate',
          description: 'Regular consumption may increase risk of diabetes'
        }],
        recommendations: ['Consider reducing portion size to lower calorie intake', 'Add more vegetables to increase fiber content', 'Try a 30-minute cardio workout to balance your carbohydrate intake', 'Drink plenty of water throughout the day']
      });
      setLoading(false);
    }, 2000);
  };
  const resetUpload = () => {
    setImage(null);
    setPrediction(null);
  };
  return <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <div className="absolute inset-0 bg-pattern opacity-5 pointer-events-none"></div>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 relative">
            <div className="absolute -top-20 left-0 right-0 -z-10 opacity-70 overflow-hidden h-80 flex justify-center">
              <img src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" alt="Healthy food background" className="w-full object-cover object-center blur-sm" />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-blue-500 to-purple-600">
              Personalized Diet & Exercise Plans
            </h1>
            <p className="text-gray-700 max-w-2xl mx-auto text-lg">
              Upload photos of your meals to receive personalized health
              guidance, calorie information, and exercise recommendations
              tailored to your diet.
            </p>
          </div>
          {!image ? <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <img src="https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" alt="Healthy meal preparation" className="w-full h-64 object-cover" />
                  <div className="p-6 bg-white">
                    <h2 className="text-2xl font-bold mb-2 text-gray-800">
                      How It Works
                    </h2>
                    <p className="text-gray-600">
                      Our AI technology analyzes your food photos in seconds,
                      providing accurate nutritional information and
                      personalized health recommendations.
                    </p>
                  </div>
                </div>
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <VideoTutorial />
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 bg-opacity-80 backdrop-blur-sm">
                <ImageUpload onImageUpload={handleImageUpload} />
              </div>
              <FeatureCards />
            </> : <div className="space-y-8">
              <PredictionDisplay image={image} prediction={prediction} loading={loading} onReset={resetUpload} />
              {prediction && !loading && <RecommendationCard prediction={prediction} />}
            </div>}
        </div>
      </main>
      <Footer />
      <style jsx>{`
        .bg-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
      `}</style>
    </div>;
}