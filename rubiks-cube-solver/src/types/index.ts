export type CubeColor = 'white' | 'red' | 'orange' | 'yellow' | 'green' | 'blue';

export type CubeFace = 'front' | 'back' | 'right' | 'left' | 'up' | 'down';

export type CubeState = {
  [key in CubeFace]: CubeColor[][];
};

export type Move = 'U' | 'U\'' | 'U2' | 'D' | 'D\'' | 'D2' | 'R' | 'R\'' | 'R2' | 
                  'L' | 'L\'' | 'L2' | 'F' | 'F\'' | 'F2' | 'B' | 'B\'' | 'B2';

export type Algorithm = Move[];

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface SolveResult {
  moves: Algorithm;
  timeMs: number;
  method: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: Date;
  scramble: Algorithm;
  solution: Algorithm;
  userTime?: number;
  systemTime: number;
  difficulty: DifficultyLevel;
}

export interface CubePosition {
  x: number;
  y: number;
  z: number;
}

export interface ThreeJSCubeProps {
  cubeState: CubeState;
  onFaceClick?: (face: CubeFace, row: number, col: number) => void;
  isAnimating?: boolean;
  autoRotate?: boolean;
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  steps: TutorialStep[];
  difficulty: DifficultyLevel;
}

export interface TutorialStep {
  id: string;
  title: string;
  description: string;
  moves: Algorithm;
  explanation: string;
}