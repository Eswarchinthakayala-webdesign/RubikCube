import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Play, 
  Pause, 
  Square, 
  Trophy, 
  TrendingUp, 
  Calendar,
  BarChart3,
  Target,
  Zap,
  RotateCcw
} from 'lucide-react';
import { formatTime } from '../utils/cubeUtils';
import { HistoryEntry, DifficultyLevel } from '../types';

interface TimerState {
  time: number;
  isRunning: boolean;
  startTime: number | null;
}

interface Stats {
  totalSolves: number;
  averageTime: number;
  bestTime: number;
  averageMoves: number;
  bestMoves: number;
}

export const Dashboard: React.FC = () => {
  const [timer, setTimer] = useState<TimerState>({
    time: 0,
    isRunning: false,
    startTime: null
  });
  
  const [solveHistory, setSolveHistory] = useState<HistoryEntry[]>([
    {
      id: '1',
      timestamp: new Date(Date.now() - 86400000),
      scramble: ['R', 'U', 'R\'', 'F', 'R', 'F\''],
      solution: ['R', 'U', 'R\'', 'U\'', 'R', 'U', 'R\'', 'U\''],
      userTime: 45230,
      systemTime: 1250,
      difficulty: 'medium'
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 172800000),
      scramble: ['F', 'R', 'U\'', 'R\'', 'F\''],
      solution: ['R', 'U2', 'R\'', 'D', 'R', 'U\'', 'R\'', 'D\''],
      userTime: 52100,
      systemTime: 980,
      difficulty: 'easy'
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 259200000),
      scramble: ['U', 'R2', 'F', 'B', 'R'],
      solution: ['R\'', 'F', 'R\'', 'B2', 'R', 'F\'', 'R\'', 'B2', 'R2'],
      userTime: 38750,
      systemTime: 750,
      difficulty: 'hard'
    }
  ]);

  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'all'>('all');

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (timer.isRunning && timer.startTime) {
      interval = setInterval(() => {
        setTimer(prev => ({
          ...prev,
          time: Date.now() - (prev.startTime || 0)
        }));
      }, 10);
    }
    
    return () => clearInterval(interval);
  }, [timer.isRunning, timer.startTime]);

  const startTimer = () => {
    const now = Date.now();
    setTimer({
      time: 0,
      isRunning: true,
      startTime: now
    });
  };

  const stopTimer = () => {
    if (timer.isRunning) {
      const finalTime = timer.time;
      setTimer(prev => ({
        ...prev,
        isRunning: false
      }));
      
      // Add to solve history
      const newEntry: HistoryEntry = {
        id: Date.now().toString(),
        timestamp: new Date(),
        scramble: ['R', 'U', 'R\'', 'F'],
        solution: ['R', 'U', 'R\'', 'U\''],
        userTime: finalTime,
        systemTime: Math.floor(Math.random() * 2000) + 500,
        difficulty: 'medium'
      };
      
      setSolveHistory(prev => [newEntry, ...prev]);
    }
  };

  const resetTimer = () => {
    setTimer({
      time: 0,
      isRunning: false,
      startTime: null
    });
  };

  // Filter history by difficulty
  const filteredHistory = selectedDifficulty === 'all' 
    ? solveHistory 
    : solveHistory.filter(entry => entry.difficulty === selectedDifficulty);

  // Calculate statistics
  const calculateStats = (): Stats => {
    if (filteredHistory.length === 0) {
      return {
        totalSolves: 0,
        averageTime: 0,
        bestTime: 0,
        averageMoves: 0,
        bestMoves: 0
      };
    }

    const times = filteredHistory.map(entry => entry.userTime || 0).filter(time => time > 0);
    const moves = filteredHistory.map(entry => entry.solution.length);

    return {
      totalSolves: filteredHistory.length,
      averageTime: times.length > 0 ? times.reduce((a, b) => a + b, 0) / times.length : 0,
      bestTime: times.length > 0 ? Math.min(...times) : 0,
      averageMoves: moves.reduce((a, b) => a + b, 0) / moves.length,
      bestMoves: Math.min(...moves)
    };
  };

  const stats = calculateStats();

  // Get recent performance trend
  const getPerformanceTrend = () => {
    if (filteredHistory.length < 2) return 0;
    
    const recent = filteredHistory.slice(0, 5);
    const older = filteredHistory.slice(5, 10);
    
    if (older.length === 0) return 0;
    
    const recentAvg = recent.reduce((sum, entry) => sum + (entry.userTime || 0), 0) / recent.length;
    const olderAvg = older.reduce((sum, entry) => sum + (entry.userTime || 0), 0) / older.length;
    
    return ((olderAvg - recentAvg) / olderAvg) * 100;
  };

  const performanceTrend = getPerformanceTrend();

  const difficultyOptions = [
    { value: 'all' as const, label: 'All Difficulties', color: 'gray' },
    { value: 'easy' as const, label: 'Easy', color: 'green' },
    { value: 'medium' as const, label: 'Medium', color: 'yellow' },
    { value: 'hard' as const, label: 'Hard', color: 'red' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Dashboard
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Track your progress and analyze your solving performance
          </p>
        </div>

        {/* Timer Section */}
        <div className="card mb-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Manual Solve Timer
            </h2>
            
            <div className="mb-8">
              <div className="text-6xl md:text-8xl font-mono font-bold text-primary-600 dark:text-primary-400 mb-4">
                {formatTime(timer.time)}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                {timer.isRunning ? 'Solving...' : 'Ready to solve'}
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              {!timer.isRunning ? (
                <button
                  onClick={startTimer}
                  className="btn-primary inline-flex items-center px-8 py-4 text-lg"
                >
                  <Play className="h-6 w-6 mr-2" />
                  Start
                </button>
              ) : (
                <button
                  onClick={stopTimer}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-8 rounded-lg inline-flex items-center text-lg"
                >
                  <Square className="h-6 w-6 mr-2" />
                  Stop
                </button>
              )}
              
              <button
                onClick={resetTimer}
                className="btn-secondary inline-flex items-center px-8 py-4 text-lg"
              >
                <RotateCcw className="h-6 w-6 mr-2" />
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {stats.totalSolves}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total Solves
            </div>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {formatTime(stats.bestTime)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Best Time
            </div>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {formatTime(stats.averageTime)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Average Time
            </div>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {stats.bestMoves}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Best Move Count
            </div>
          </div>
        </div>

        {/* Performance Trend */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Performance Trend
            </h3>
            
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                performanceTrend > 0 
                  ? 'bg-green-100 dark:bg-green-900' 
                  : performanceTrend < 0 
                  ? 'bg-red-100 dark:bg-red-900'
                  : 'bg-gray-100 dark:bg-gray-800'
              }`}>
                <TrendingUp className={`h-6 w-6 ${
                  performanceTrend > 0 
                    ? 'text-green-600 dark:text-green-400' 
                    : performanceTrend < 0 
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-gray-600 dark:text-gray-400'
                }`} />
              </div>
              
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {performanceTrend > 0 ? '+' : ''}{performanceTrend.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  vs. previous sessions
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              {performanceTrend > 5 ? 'Great improvement! Keep it up!' :
               performanceTrend > 0 ? 'You\'re getting better!' :
               performanceTrend < -5 ? 'Don\'t worry, practice makes perfect!' :
               'Consistent performance'}
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Average Moves
            </h3>
            
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                <Zap className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.averageMoves.toFixed(1)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  moves per solve
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Efficiency Score
            </h3>
            
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                <Target className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {Math.max(0, 100 - (stats.averageMoves - 20) * 2).toFixed(0)}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  move efficiency
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Solve History */}
        <div className="card">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-0">
              Solve History
            </h2>
            
            <div className="flex space-x-2">
              {difficultyOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => setSelectedDifficulty(option.value)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    selectedDifficulty === option.value
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Difficulty
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Your Time
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    System Time
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Moves
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Scramble
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.map(entry => (
                  <tr key={entry.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="py-3 px-4 text-gray-900 dark:text-white">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>{entry.timestamp.toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        entry.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                        entry.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {entry.difficulty}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-gray-900 dark:text-white">
                      {entry.userTime ? formatTime(entry.userTime) : '-'}
                    </td>
                    <td className="py-3 px-4 font-mono text-gray-600 dark:text-gray-400">
                      {formatTime(entry.systemTime)}
                    </td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white">
                      {entry.solution.length}
                    </td>
                    <td className="py-3 px-4 font-mono text-sm text-gray-600 dark:text-gray-400">
                      {entry.scramble.slice(0, 6).join(' ')}
                      {entry.scramble.length > 6 && '...'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredHistory.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No solve history
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Start solving cubes to see your progress here!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};