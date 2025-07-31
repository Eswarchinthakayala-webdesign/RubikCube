import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Shuffle, 
  Upload, 
  Settings, 
  ChevronRight,
  ChevronLeft,
  Clock,
  Zap
} from 'lucide-react';
import { ThreeJSCube } from '../components/ThreeJSCube';
import { 
  CubeState, 
  DifficultyLevel, 
  Algorithm, 
  SolveResult, 
  CubeFace, 
  CubeColor 
} from '../types';
import { 
  createSolvedCube, 
  generateScramble, 
  applyAlgorithm, 
  applyMove,
  formatTime,
  colorMap 
} from '../utils/cubeUtils';
import { solveCube, getAlgorithmExplanation } from '../algorithms/solvers';

export const Solver: React.FC = () => {
  const [cubeState, setCubeState] = useState<CubeState>(createSolvedCube);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('medium');
  const [solution, setSolution] = useState<Algorithm>([]);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSolving, setIsSolving] = useState(false);
  const [solveResult, setSolveResult] = useState<SolveResult | null>(null);
  const [selectedColor, setSelectedColor] = useState<CubeColor>('red');
  const [isEditing, setIsEditing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const colors: CubeColor[] = ['white', 'red', 'orange', 'yellow', 'green', 'blue'];

  // Auto-play animation
  useEffect(() => {
    if (isPlaying && solution.length > 0 && currentMoveIndex < solution.length) {
      const timer = setTimeout(() => {
        const move = solution[currentMoveIndex];
        setCubeState(prev => applyMove(prev, move));
        setCurrentMoveIndex(prev => prev + 1);
      }, 1000); // 1 second per move

      return () => clearTimeout(timer);
    } else if (currentMoveIndex >= solution.length) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentMoveIndex, solution]);

  const handleScramble = () => {
    const scramble = generateScramble(25);
    const scrambledState = applyAlgorithm(createSolvedCube(), scramble);
    setCubeState(scrambledState);
    setSolution([]);
    setSolveResult(null);
    setCurrentMoveIndex(0);
    setIsPlaying(false);
  };

  const handleReset = () => {
    setCubeState(createSolvedCube());
    setSolution([]);
    setSolveResult(null);
    setCurrentMoveIndex(0);
    setIsPlaying(false);
  };

  const handleSolve = async () => {
    setIsSolving(true);
    try {
      const result = await solveCube(cubeState, difficulty);
      setSolution(result.moves);
      setSolveResult(result);
      setCurrentMoveIndex(0);
    } catch (error) {
      console.error('Error solving cube:', error);
    } finally {
      setIsSolving(false);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleStepForward = () => {
    if (currentMoveIndex < solution.length) {
      const move = solution[currentMoveIndex];
      setCubeState(prev => applyMove(prev, move));
      setCurrentMoveIndex(prev => prev + 1);
    }
  };

  const handleStepBackward = () => {
    if (currentMoveIndex > 0) {
      // This would require implementing reverse moves
      // For now, we'll reset and replay up to the previous step
      let newState = createSolvedCube();
      const scramble = generateScramble(25);
      newState = applyAlgorithm(newState, scramble);
      
      for (let i = 0; i < currentMoveIndex - 1; i++) {
        newState = applyMove(newState, solution[i]);
      }
      
      setCubeState(newState);
      setCurrentMoveIndex(prev => prev - 1);
    }
  };

  const handleFaceClick = (face: CubeFace, row: number, col: number) => {
    if (!isEditing) return;
    
    setCubeState(prev => {
      const newState = { ...prev };
      newState[face] = prev[face].map(r => [...r]);
      newState[face][row][col] = selectedColor;
      return newState;
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Mock image processing - in a real app, this would use computer vision
      alert('Image upload feature is coming soon! For now, please manually set the cube colors.');
    }
  };

  const difficultyOptions = [
    { value: 'easy' as DifficultyLevel, label: 'Easy', description: 'Layer by Layer (Beginner)' },
    { value: 'medium' as DifficultyLevel, label: 'Medium', description: 'CFOP Method' },
    { value: 'hard' as DifficultyLevel, label: 'Hard', description: 'Kociemba Algorithm' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Rubik's Cube Solver
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Set your cube state and watch our algorithms solve it step by step
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 3D Cube Visualization */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Interactive Cube
                </h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      isEditing
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {isEditing ? 'Stop Editing' : 'Edit Colors'}
                  </button>
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    <Settings className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="h-96 mb-6">
                <ThreeJSCube 
                  cubeState={cubeState}
                  onFaceClick={handleFaceClick}
                  isAnimating={isPlaying}
                  autoRotate={false}
                />
              </div>

              {/* Color Palette for Editing */}
              {isEditing && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                    Select Color
                  </h3>
                  <div className="flex space-x-2">
                    {colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                          selectedColor === color 
                            ? 'border-gray-900 dark:border-white scale-110' 
                            : 'border-gray-400 dark:border-gray-600'
                        }`}
                        style={{ backgroundColor: colorMap[color] }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Controls */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleScramble}
                  className="btn-secondary inline-flex items-center"
                >
                  <Shuffle className="h-4 w-4 mr-2" />
                  Scramble
                </button>
                
                <button
                  onClick={handleReset}
                  className="btn-secondary inline-flex items-center"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </button>

                <label className="btn-secondary inline-flex items-center cursor-pointer">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>

                <button
                  onClick={handleSolve}
                  disabled={isSolving}
                  className="btn-primary inline-flex items-center"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  {isSolving ? 'Solving...' : 'Solve Cube'}
                </button>
              </div>
            </div>
          </div>

          {/* Control Panel */}
          <div className="space-y-6">
            {/* Difficulty Selection */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Difficulty Level
              </h3>
              <div className="space-y-3">
                {difficultyOptions.map(option => (
                  <label key={option.value} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="difficulty"
                      value={option.value}
                      checked={difficulty === option.value}
                      onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}
                      className="mr-3"
                    />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {option.label}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {option.description}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Solution Controls */}
            {solution.length > 0 && (
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Solution Controls
                </h3>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Step {currentMoveIndex} of {solution.length}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleStepBackward}
                      disabled={currentMoveIndex === 0}
                      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={handlePlayPause}
                      className="p-2 rounded-lg bg-primary-600 text-white"
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </button>
                    <button
                      onClick={handleStepForward}
                      disabled={currentMoveIndex >= solution.length}
                      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 mb-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Current move:
                  </div>
                  <div className="font-mono text-lg font-semibold text-gray-900 dark:text-white">
                    {currentMoveIndex < solution.length ? solution[currentMoveIndex] : 'Complete!'}
                  </div>
                </div>

                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <div className="font-mono">
                    {solution.slice(0, 20).join(' ')}
                    {solution.length > 20 && '...'}
                  </div>
                </div>
              </div>
            )}

            {/* Solution Info */}
            {solveResult && (
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Solution Information
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Method:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {solveResult.method}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Moves:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {solveResult.moves.length}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Solve Time:</span>
                    <span className="font-medium text-gray-900 dark:text-white flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {formatTime(solveResult.timeMs)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-line">
                    {getAlgorithmExplanation(difficulty)}
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