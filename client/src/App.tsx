import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import MealTracker from './pages/MealTracker';
import ExercisePlanner from './pages/ExercisePlanner';
import Profile from './pages/Profile';
export function App() {
  // Mock user data
  const [user, setUser] = useState({
    name: 'Alex Smith',
    age: 32,
    weight: 75,
    height: 175,
    goals: 'Weight loss',
    activityLevel: 'Moderate',
    dietaryRestrictions: ['None']
  });
  return <div className="min-h-screen bg-gray-50 text-gray-900">
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard user={user} />} />
            <Route path="/meals" element={<MealTracker user={user} />} />
            <Route path="/exercises" element={<ExercisePlanner user={user} />} />
            <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
          </Routes>
        </Layout>
      </Router>
    </div>;
}