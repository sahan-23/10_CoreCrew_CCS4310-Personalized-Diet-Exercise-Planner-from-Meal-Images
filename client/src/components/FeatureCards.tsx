import React from 'react';
import { Camera, LineChart, AlertCircle, Sparkles, BarChart3, ShieldCheck } from 'lucide-react';
export const FeatureCards = () => {
  const features = [{
    title: 'Food Recognition',
    description: 'Our AI instantly identifies foods from your photos',
    icon: <Camera className="h-8 w-8 text-white" />,
    color: 'bg-gradient-to-r from-purple-500 to-indigo-500',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  }, {
    title: 'Nutrient Analysis',
    description: 'Get detailed breakdown of calories, carbs, protein, and fat',
    icon: <LineChart className="h-8 w-8 text-white" />,
    color: 'bg-gradient-to-r from-green-400 to-emerald-500',
    image: 'https://images.unsplash.com/photo-1615398431205-b6d50be5b506?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  }, {
    title: 'Health Risk Detection',
    description: 'Identify potential health concerns from your diet',
    icon: <AlertCircle className="h-8 w-8 text-white" />,
    color: 'bg-gradient-to-r from-amber-400 to-orange-500',
    image: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  }, {
    title: 'Personalized Tips',
    description: 'Receive custom diet and exercise recommendations',
    icon: <Sparkles className="h-8 w-8 text-white" />,
    color: 'bg-gradient-to-r from-pink-500 to-rose-500',
    image: 'https://images.unsplash.com/photo-1574269252556-89926e7c5805?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  }, {
    title: 'Progress Tracking',
    description: 'Monitor your nutritional intake and health improvements',
    icon: <BarChart3 className="h-8 w-8 text-white" />,
    color: 'bg-gradient-to-r from-blue-400 to-cyan-500',
    image: 'https://images.unsplash.com/photo-1607962837359-5e7e89f86776?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  }, {
    title: 'Private & Secure',
    description: 'Your health data is always protected and private',
    icon: <ShieldCheck className="h-8 w-8 text-white" />,
    color: 'bg-gradient-to-r from-violet-500 to-purple-500',
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  }];
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {features.map((feature, index) => <div key={index} className="rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <div className="h-40 overflow-hidden relative">
            <img src={feature.image} alt={feature.title} className="w-full h-full object-cover" />
            <div className={`absolute inset-0 opacity-80 ${feature.color}`}></div>
            <div className="absolute inset-0 p-5 flex flex-col justify-between">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">
                  {feature.title}
                </h3>
                <p className="text-white/90 text-sm">{feature.description}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4">
            <div className="flex justify-end">
              <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
                Learn more →
              </button>
            </div>
          </div>
        </div>)}
    </div>;
};