import React from 'react';
import { Github, ExternalLink, Code, Cpu, Palette, Zap } from 'lucide-react';

export const About: React.FC = () => {
  const technologies = [
    {
      name: 'React',
      description: 'Modern frontend framework for building user interfaces',
      icon: <Code className="h-8 w-8" />
    },
    {
      name: 'Three.js',
      description: '3D graphics library for interactive cube visualization',
      icon: <Cpu className="h-8 w-8" />
    },
    {
      name: 'TypeScript',
      description: 'Type-safe JavaScript for better development experience',
      icon: <Code className="h-8 w-8" />
    },
    {
      name: 'Tailwind CSS',
      description: 'Utility-first CSS framework for responsive design',
      icon: <Palette className="h-8 w-8" />
    }
  ];

  const algorithms = [
    {
      name: 'Layer by Layer',
      difficulty: 'Beginner',
      description: 'The most intuitive method for beginners, solving the cube layer by layer.',
      moves: '50-100 moves'
    },
    {
      name: 'CFOP',
      difficulty: 'Intermediate',
      description: 'Cross, F2L, OLL, PLL - the most popular speedcubing method.',
      moves: '50-60 moves'
    },
    {
      name: 'Kociemba\'s Algorithm',
      difficulty: 'Advanced',
      description: 'Two-phase algorithm that finds near-optimal solutions.',
      moves: '20-25 moves'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About CubeSolver
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A professional Rubik's Cube solver built with cutting-edge web technologies
            to help both beginners and experts master the art of cubing.
          </p>
        </div>

        {/* Mission */}
        <div className="card mb-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto">
              We believe that solving a Rubik's Cube should be accessible to everyone. Our mission is to 
              democratize cube solving by providing an intuitive, educational, and powerful platform that 
              combines state-of-the-art algorithms with beautiful, interactive visualizations. Whether you're 
              a complete beginner or a seasoned speedcuber, CubeSolver adapts to your skill level and helps 
              you improve.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="card text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <Zap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Lightning Fast
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Our algorithms can solve any cube configuration in under a second, 
              providing optimal or near-optimal solutions.
            </p>
          </div>

          <div className="card text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <Code className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Educational
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Learn step-by-step with our interactive tutorials, from basic notation 
              to advanced speedcubing techniques.
            </p>
          </div>

          <div className="card text-center">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <Cpu className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              3D Interactive
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Experience the cube like never before with our fully interactive 3D 
              visualization powered by Three.js.
            </p>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="card mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Technology Stack
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologies.map((tech, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                  <div className="text-primary-600 dark:text-primary-400">
                    {tech.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {tech.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {tech.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Algorithms */}
        <div className="card mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Solving Algorithms
          </h2>
          
          <div className="space-y-6">
            {algorithms.map((algo, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {algo.name}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        algo.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                        algo.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {algo.difficulty}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      {algo.description}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-semibold text-primary-600 dark:text-primary-400">
                      {algo.moves}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Typical solution
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Open Source */}
        <div className="card text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Open Source
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            CubeSolver is built with passion for the cubing community. We believe in open 
            source software and welcome contributions from developers and cubing enthusiasts alike.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center"
            >
              <Github className="h-5 w-5 mr-2" />
              View on GitHub
            </a>
            
            <a
              href="#"
              className="btn-secondary inline-flex items-center"
            >
              <ExternalLink className="h-5 w-5 mr-2" />
              Documentation
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
              25+
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Solving Algorithms
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
              3D
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Interactive Visualization
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
              &lt;1s
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Average Solve Time
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
              100%
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Free & Open Source
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};