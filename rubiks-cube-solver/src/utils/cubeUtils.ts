import { CubeState, CubeColor, CubeFace, Move, Algorithm } from '../types';

// Initialize a solved cube state
export const createSolvedCube = (): CubeState => ({
  front: Array(3).fill(null).map(() => Array(3).fill('green')),
  back: Array(3).fill(null).map(() => Array(3).fill('blue')),
  right: Array(3).fill(null).map(() => Array(3).fill('red')),
  left: Array(3).fill(null).map(() => Array(3).fill('orange')),
  up: Array(3).fill(null).map(() => Array(3).fill('white')),
  down: Array(3).fill(null).map(() => Array(3).fill('yellow')),
});

// Color mapping for display
export const colorMap: Record<CubeColor, string> = {
  white: '#ffffff',
  red: '#dc2626',
  orange: '#ea580c',
  yellow: '#eab308',
  green: '#16a34a',
  blue: '#2563eb',
};

// Check if cube is solved
export const isCubeSolved = (cubeState: CubeState): boolean => {
  const faces: CubeFace[] = ['front', 'back', 'right', 'left', 'up', 'down'];
  
  return faces.every(face => {
    const faceColors = cubeState[face];
    const firstColor = faceColors[0][0];
    return faceColors.every(row => 
      row.every(color => color === firstColor)
    );
  });
};

// Rotate a face 90 degrees clockwise
export const rotateFaceClockwise = (face: CubeColor[][]): CubeColor[][] => {
  const n = face.length;
  const rotated: CubeColor[][] = Array(n).fill(null).map(() => Array(n).fill('white'));
  
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      rotated[j][n - 1 - i] = face[i][j];
    }
  }
  
  return rotated;
};

// Rotate a face 90 degrees counter-clockwise
export const rotateFaceCounterClockwise = (face: CubeColor[][]): CubeColor[][] => {
  return rotateFaceClockwise(rotateFaceClockwise(rotateFaceClockwise(face)));
};

// Deep clone cube state
export const cloneCubeState = (cubeState: CubeState): CubeState => {
  const cloned: CubeState = {} as CubeState;
  
  Object.keys(cubeState).forEach(face => {
    cloned[face as CubeFace] = cubeState[face as CubeFace].map(row => [...row]);
  });
  
  return cloned;
};

// Apply a single move to the cube
export const applyMove = (cubeState: CubeState, move: Move): CubeState => {
  const newState = cloneCubeState(cubeState);
  
  switch (move) {
    case 'U':
      newState.up = rotateFaceClockwise(newState.up);
      // Rotate adjacent edges
      {
        const temp = newState.front[0];
        newState.front[0] = newState.right[0];
        newState.right[0] = newState.back[0];
        newState.back[0] = newState.left[0];
        newState.left[0] = temp;
      }
      break;
      
    case 'U\'':
      newState.up = rotateFaceCounterClockwise(newState.up);
      {
        const temp = newState.front[0];
        newState.front[0] = newState.left[0];
        newState.left[0] = newState.back[0];
        newState.back[0] = newState.right[0];
        newState.right[0] = temp;
      }
      break;
      
    case 'U2':
      return applyMove(applyMove(newState, 'U'), 'U');
      
    case 'R':
      newState.right = rotateFaceClockwise(newState.right);
      {
        const temp = [newState.front[0][2], newState.front[1][2], newState.front[2][2]];
        newState.front[0][2] = newState.down[0][2];
        newState.front[1][2] = newState.down[1][2];
        newState.front[2][2] = newState.down[2][2];
        newState.down[0][2] = newState.back[2][0];
        newState.down[1][2] = newState.back[1][0];
        newState.down[2][2] = newState.back[0][0];
        newState.back[2][0] = newState.up[0][2];
        newState.back[1][0] = newState.up[1][2];
        newState.back[0][0] = newState.up[2][2];
        newState.up[0][2] = temp[0];
        newState.up[1][2] = temp[1];
        newState.up[2][2] = temp[2];
      }
      break;
      
    case 'R\'':
      return applyMove(applyMove(applyMove(newState, 'R'), 'R'), 'R');
      
    case 'R2':
      return applyMove(applyMove(newState, 'R'), 'R');
      
    // Add more moves as needed...
    default:
      console.warn(`Move ${move} not implemented yet`);
  }
  
  return newState;
};

// Apply an algorithm (sequence of moves) to the cube
export const applyAlgorithm = (cubeState: CubeState, algorithm: Algorithm): CubeState => {
  return algorithm.reduce((state, move) => applyMove(state, move), cubeState);
};

// Generate a random scramble
export const generateScramble = (length: number = 25): Algorithm => {
  const moves: Move[] = ['U', 'U\'', 'U2', 'D', 'D\'', 'D2', 'R', 'R\'', 'R2', 'L', 'L\'', 'L2', 'F', 'F\'', 'F2', 'B', 'B\'', 'B2'];
  const scramble: Algorithm = [];
  
  for (let i = 0; i < length; i++) {
    const randomMove = moves[Math.floor(Math.random() * moves.length)];
    scramble.push(randomMove);
  }
  
  return scramble;
};

// Format time in MM:SS.mmm format
export const formatTime = (timeMs: number): string => {
  const minutes = Math.floor(timeMs / 60000);
  const seconds = Math.floor((timeMs % 60000) / 1000);
  const milliseconds = timeMs % 1000;
  
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
};

// Parse move notation
export const parseMove = (moveStr: string): Move | null => {
  const validMoves: Move[] = ['U', 'U\'', 'U2', 'D', 'D\'', 'D2', 'R', 'R\'', 'R2', 'L', 'L\'', 'L2', 'F', 'F\'', 'F2', 'B', 'B\'', 'B2'];
  return validMoves.includes(moveStr as Move) ? moveStr as Move : null;
};

// Parse algorithm from string
export const parseAlgorithm = (algorithmStr: string): Algorithm => {
  return algorithmStr
    .split(' ')
    .map(moveStr => parseMove(moveStr.trim()))
    .filter((move): move is Move => move !== null);
};