import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Brain, Clock, Smartphone, BookOpen, Trophy } from 'lucide-react';
import { ThreeJSCube } from '../components/ThreeJSCube';
import { createSolvedCube } from '../utils/cubeUtils';

export const Home: React.FC = () => {
  const solvedCube = createSolvedCube();

  const features = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Fast",
      description: "Advanced algorithms solve your cube in seconds with optimal move sequences."
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Multiple Methods",
      description: "Choose from beginner-friendly to advanced solving methods like CFOP and Kociemba."
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Track Progress",
      description: "Monitor your solving times and view detailed statistics of your improvements."
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Mobile Friendly",
      description: "Fully responsive design works perfectly on desktop, tablet, and mobile devices."
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Learn to Solve",
      description: "Interactive tutorials teach you step-by-step methods to solve the cube yourself."
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      title: "Challenge Yourself",
      description: "Practice with random scrambles and compare your times with solving algorithms."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div className="mb-12 lg:mb-0">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Master the
                <span className="text-gradient block">Rubik's Cube</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Solve any Rubik's Cube configuration instantly with our advanced algorithms, 
                or learn to solve it yourself with our interactive tutorials and 3D visualizations.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/solver"
                  className="btn-primary inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  Start Solving
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                
                <Link
                  to="/learn"
                  className="btn-secondary inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  Learn Methods
                  <BookOpen className="ml-2 h-5 w-5" />
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">25+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Algorithms</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">&lt;1s</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Solve Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">3D</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Interactive</div>
                </div>
              </div>
            </div>

            {/* 3D Cube Preview */}
            <div className="lg:ml-12">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl transform rotate-3 opacity-20"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6">
                  <div className="h-96">
                    <ThreeJSCube 
                      cubeState={solvedCube} 
                      autoRotate={true}
                      className="rounded-lg"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Interactive 3D visualization
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose CubeSolver?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Experience the most advanced and user-friendly Rubik's Cube solver with cutting-edge features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="card group hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <div className="text-primary-600 dark:text-primary-400 mb-4 group-hover:scale-110 transition-transform duration-200">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Get your cube solved in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <span className="text-white font-bold text-2xl">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Input Your Cube
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Click on the 3D cube faces to set the colors matching your physical cube, or upload a photo
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <span className="text-white font-bold text-2xl">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Choose Difficulty
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Select from Easy (beginner), Medium (CFOP), or Hard (advanced) solving methods
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <span className="text-white font-bold text-2xl">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Watch & Learn
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Follow the step-by-step solution with animated 3D moves and detailed explanations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 dark:bg-primary-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Solve Your Cube?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of users who have mastered the Rubik's Cube with our advanced solver and tutorials
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/solver"
              className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Try the Solver Now
            </Link>
            
            <Link
              to="/dashboard"
              className="bg-primary-700 hover:bg-primary-800 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border border-primary-500"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};