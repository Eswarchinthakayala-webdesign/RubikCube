import React from 'react';
import { Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              CubeSolver
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
              A professional Rubik's Cube solver application featuring interactive 3D visualization, 
              multiple solving algorithms, and comprehensive learning tutorials.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="mailto:contact@cubesolver.com"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/solver" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                  Cube Solver
                </a>
              </li>
              <li>
                <a href="/learn" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                  Learn to Solve
                </a>
              </li>
              <li>
                <a href="/dashboard" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                  API Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                  Algorithms
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                  Tutorial Videos
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-600 dark:text-gray-400 text-sm">
              © {currentYear} CubeSolver. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 text-sm mt-4 md:mt-0">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>using React, Three.js & Tailwind CSS</span>
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap justify-center md:justify-start space-x-6 text-sm text-gray-600 dark:text-gray-400">
            <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
              Terms of Service
            </a>
            <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};