import React from 'react';
import { Instagram, Twitter, Facebook, Youtube, Mail, MapPin, Phone } from 'lucide-react';
export const Footer = () => {
  return <footer className="relative z-10">
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600">
                    N
                  </span>
                </div>
                <span className="font-bold text-2xl text-white">NutriScan</span>
              </div>
              <p className="text-white/80 mb-6">
                Empowering healthier choices through AI-powered nutrition
                analysis. Our mission is to make healthy eating simple and
                accessible for everyone.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Instagram size={18} className="text-white" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Twitter size={18} className="text-white" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Facebook size={18} className="text-white" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Youtube size={18} className="text-white" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg text-white mb-6">Product</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    Meal Plans
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    Recipe Database
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    Nutrition API
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    Mobile App
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg text-white mb-6">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    Nutrition Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    Exercise Library
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    Health Calculator
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    Community Forum
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg text-white mb-6">Contact Us</h3>
              <div className="mb-4 rounded-lg overflow-hidden">
                <img src="https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" alt="Contact us" className="w-full h-32 object-cover" />
              </div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 text-pink-400 mr-3 mt-0.5" />
                  <span className="text-white/70">
                    123 Nutrition Avenue
                    <br />
                    Health District, NY 10001
                  </span>
                </li>
                <li className="flex items-center">
                  <Phone className="w-5 h-5 text-pink-400 mr-3" />
                  <span className="text-white/70">+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center">
                  <Mail className="w-5 h-5 text-pink-400 mr-3" />
                  <span className="text-white/70">info@nutriscan.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-indigo-950 text-white py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-white/60">
              © 2023 NutriScan. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>;
};