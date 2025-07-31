import React, { useState } from 'react';
import { 
  Play, 
  Book, 
  RotateCw, 
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Target,
  Clock
} from 'lucide-react';
import { ThreeJSCube } from '../components/ThreeJSCube';
import { createSolvedCube, applyMove } from '../utils/cubeUtils';
import { Move, DifficultyLevel, Tutorial } from '../types';

export const Learn: React.FC = () => {
  const [selectedTutorial, setSelectedTutorial] = useState<string>('notation');
  const [expandedSection, setExpandedSection] = useState<string>('');
  const [currentStep, setCurrentStep] = useState(0);
  const [cubeState, setCubeState] = useState(createSolvedCube());

  const notation = [
    { move: 'F', description: 'Front face clockwise', color: 'green' },
    { move: 'B', description: 'Back face clockwise', color: 'blue' },
    { move: 'R', description: 'Right face clockwise', color: 'red' },
    { move: 'L', description: 'Left face clockwise', color: 'orange' },
    { move: 'U', description: 'Up face clockwise', color: 'white' },
    { move: 'D', description: 'Down face clockwise', color: 'yellow' },
    { move: 'F\'', description: 'Front face counter-clockwise', color: 'green' },
    { move: 'R2', description: 'Right face 180 degrees', color: 'red' },
  ];

  const tutorials: Tutorial[] = [
    {
      id: 'notation',
      title: 'Cube Notation',
      description: 'Learn the standard notation used to describe cube moves',
      difficulty: 'easy',
      steps: [
        {
          id: 'basic-moves',
          title: 'Basic Face Rotations',
          description: 'Understanding how each face moves',
          moves: ['R', 'U', 'R\'', 'U\''],
          explanation: 'Each face can rotate clockwise, counter-clockwise (marked with \'), or 180 degrees (marked with 2)'
        }
      ]
    },
    {
      id: 'layer-by-layer',
      title: 'Layer by Layer Method',
      description: 'The beginner-friendly approach to solving the cube',
      difficulty: 'easy',
      steps: [
        {
          id: 'white-cross',
          title: 'Step 1: White Cross',
          description: 'Form a cross on the white face (bottom)',
          moves: ['F', 'R', 'U\'', 'R\'', 'F\''],
          explanation: 'Start by making a white cross on the bottom layer. The edge pieces should match the center colors on the sides.'
        },
        {
          id: 'white-corners',
          title: 'Step 2: White Corners',
          description: 'Complete the white layer by positioning corners',
          moves: ['R', 'U', 'R\'', 'U\''],
          explanation: 'Use the right-hand algorithm to position white corners. Repeat until the white layer is complete.'
        },
        {
          id: 'middle-layer',
          title: 'Step 3: Middle Layer',
          description: 'Position the middle layer edge pieces',
          moves: ['U', 'R', 'U\'', 'R\'', 'U\'', 'F\'', 'U', 'F'],
          explanation: 'Use algorithms to move edge pieces from the top layer to their correct positions in the middle layer.'
        },
        {
          id: 'yellow-cross',
          title: 'Step 4: Yellow Cross',
          description: 'Form a cross on the yellow face (top)',
          moves: ['F', 'R', 'U', 'R\'', 'U\'', 'F\''],
          explanation: 'Apply the algorithm until you have a yellow cross on the top face. You may need to repeat it multiple times.'
        }
      ]
    },
    {
      id: 'cfop',
      title: 'CFOP Method',
      description: 'The speedcubing method used by most competitive solvers',
      difficulty: 'medium',
      steps: [
        {
          id: 'cross',
          title: 'Cross',
          description: 'Form an efficient cross on the bottom layer',
          moves: ['F', 'R', 'U\'', 'R\'', 'F\''],
          explanation: 'Learn to solve the cross in 4-8 moves with inspection time and practice cross-to-F2L transitions.'
        },
        {
          id: 'f2l',
          title: 'F2L (First Two Layers)',
          description: 'Solve corner-edge pairs simultaneously',
          moves: ['R', 'U\'', 'R\'', 'U', 'R', 'U\'', 'R\''],
          explanation: 'Learn to recognize and solve 41 different F2L cases efficiently without cube rotations.'
        }
      ]
    }
  ];

  const handleMoveDemo = (move: Move) => {
    setCubeState(prev => applyMove(prev, move));
  };

  const resetCube = () => {
    setCubeState(createSolvedCube());
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? '' : sectionId);
  };

  const currentTutorial = tutorials.find(t => t.id === selectedTutorial);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Learn to Solve
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Master the Rubik's Cube with our interactive tutorials, from basic notation to advanced speedcubing methods
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Tutorial Menu */}
          <div className="lg:col-span-1">
            <div className="card sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Tutorials
              </h2>
              
              <div className="space-y-2">
                {tutorials.map(tutorial => (
                  <button
                    key={tutorial.id}
                    onClick={() => setSelectedTutorial(tutorial.id)}
                    className={`w-full text-left p-4 rounded-lg transition-colors duration-200 ${
                      selectedTutorial === tutorial.id
                        ? 'bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200'
                        : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {tutorial.title}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {tutorial.description}
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-medium ${
                        tutorial.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                        tutorial.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {tutorial.difficulty}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Quick Reference */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Quick Reference
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">R, L, U, D, F, B</span>
                    <span className="font-medium">Face turns</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">' (apostrophe)</span>
                    <span className="font-medium">Counter-clockwise</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">2 (number)</span>
                    <span className="font-medium">180° turn</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Cube Notation */}
            {selectedTutorial === 'notation' && (
              <div className="space-y-6">
                <div className="card">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Cube Notation
                  </h2>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Interactive Demo
                      </h3>
                      
                      <div className="h-80 mb-4">
                        <ThreeJSCube 
                          cubeState={cubeState}
                          autoRotate={false}
                        />
                      </div>
                      
                      <div className="flex justify-center space-x-4">
                        <button
                          onClick={resetCube}
                          className="btn-secondary inline-flex items-center"
                        >
                          <RotateCw className="h-4 w-4 mr-2" />
                          Reset
                        </button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Basic Moves
                      </h3>
                      
                      <div className="space-y-3">
                        {notation.map(item => (
                          <div key={item.move} className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                            <div>
                              <span className="font-mono text-lg font-bold text-gray-900 dark:text-white">
                                {item.move}
                              </span>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                {item.description}
                              </div>
                            </div>
                            <button
                              onClick={() => handleMoveDemo(item.move as Move)}
                              className="btn-primary p-2"
                            >
                              <Play className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notation Principles */}
                <div className="card">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Key Principles
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-3">
                        <RotateCw className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Clockwise Rotation
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Letter alone (R, U, F) means clockwise when looking at that face
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Target className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Perspective Matters
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Always imagine looking directly at the face you're turning
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Lightbulb className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Practice Makes Perfect
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Start with basic moves and gradually build muscle memory
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Other Tutorials */}
            {currentTutorial && selectedTutorial !== 'notation' && (
              <div className="space-y-6">
                <div className="card">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {currentTutorial.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">
                        {currentTutorial.description}
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      currentTutorial.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                      currentTutorial.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {currentTutorial.difficulty.charAt(0).toUpperCase() + currentTutorial.difficulty.slice(1)}
                    </div>
                  </div>

                  {/* Steps */}
                  <div className="space-y-4">
                    {currentTutorial.steps.map((step, index) => (
                      <div key={step.id} className="border border-gray-200 dark:border-gray-700 rounded-lg">
                        <button
                          onClick={() => toggleSection(step.id)}
                          className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                              {index + 1}
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {step.title}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {step.description}
                              </p>
                            </div>
                          </div>
                          {expandedSection === step.id ? (
                            <ChevronUp className="h-5 w-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                          )}
                        </button>

                        {expandedSection === step.id && (
                          <div className="px-6 pb-6 border-t border-gray-200 dark:border-gray-700">
                            <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                                  Algorithm
                                </h4>
                                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                                  <div className="font-mono text-lg text-gray-900 dark:text-white">
                                    {step.moves.join(' ')}
                                  </div>
                                </div>
                                
                                <div className="mt-4 flex space-x-2">
                                  <button
                                    onClick={() => {
                                      step.moves.forEach((move, i) => {
                                        setTimeout(() => handleMoveDemo(move as Move), i * 500);
                                      });
                                    }}
                                    className="btn-primary inline-flex items-center"
                                  >
                                    <Play className="h-4 w-4 mr-2" />
                                    Demo
                                  </button>
                                  <button
                                    onClick={resetCube}
                                    className="btn-secondary"
                                  >
                                    Reset
                                  </button>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                                  Explanation
                                </h4>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                  {step.explanation}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tips */}
                <div className="card">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Pro Tips
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-primary-600 dark:text-primary-400 mt-1" />
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          Practice Regularly
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Spend 15-20 minutes daily practicing algorithms to build muscle memory
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Target className="h-5 w-5 text-primary-600 dark:text-primary-400 mt-1" />
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          Focus on Understanding
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Learn why algorithms work, not just how to execute them
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Lightbulb className="h-5 w-5 text-primary-600 dark:text-primary-400 mt-1" />
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          Use the Solver
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Practice with our interactive solver to see how algorithms work in real-time
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};