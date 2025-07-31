# CubeSolver - Professional Rubik's Cube Solver

A modern, interactive Rubik's Cube solver built with React, TypeScript, and Three.js. Features advanced solving algorithms, 3D visualization, and comprehensive learning tutorials.

![CubeSolver Demo](./demo-screenshot.png)

## 🎯 Features

### Core Features
- **Interactive 3D Cube Visualization** - Powered by Three.js with smooth animations
- **Multiple Solving Algorithms**:
  - **Easy**: Layer-by-layer method for beginners
  - **Medium**: CFOP (Cross, F2L, OLL, PLL) for intermediate users
  - **Hard**: Kociemba's algorithm for optimal solutions
- **Manual Cube Input** - Click faces to set colors or upload photos
- **Step-by-step Solution Playback** - Watch solutions with controls
- **Real-time Timer** - Track your manual solving times
- **Dark/Light Mode** - Automatic theme switching with system preference

### Learning Features
- **Interactive Tutorials** - Learn cube notation and solving methods
- **Algorithm Explanations** - Understand how each solving method works
- **Progress Tracking** - Monitor your improvement over time
- **Comprehensive Dashboard** - View statistics and solve history

### Technical Features
- **Fully Responsive** - Works perfectly on mobile, tablet, and desktop
- **SEO Optimized** - Proper meta tags and social media previews
- **Fast Performance** - Optimized React components and efficient algorithms
- **Type Safety** - Built with TypeScript for better development experience

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/rubiks-cube-solver.git
cd rubiks-cube-solver
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **3D Graphics**: Three.js for cube visualization
- **Styling**: Tailwind CSS with custom design system
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Build Tool**: Create React App
- **Animations**: Framer Motion (for enhanced UX)

## 📱 Usage

### Basic Solving
1. Navigate to the **Solver** page
2. Either scramble the cube or manually set colors by clicking faces
3. Choose your preferred difficulty level
4. Click "Solve Cube" to generate the solution
5. Use playback controls to follow the solution step-by-step

### Learning
1. Visit the **Learn** page for tutorials
2. Start with "Cube Notation" to understand move notation
3. Progress through "Layer by Layer" and "CFOP" methods
4. Practice with interactive examples

### Tracking Progress
1. Use the **Dashboard** to time your manual solves
2. View your solving statistics and history
3. Monitor your improvement over time

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ThreeJSCube.tsx # 3D cube visualization
│   ├── Navbar.tsx      # Navigation component
│   └── Footer.tsx      # Footer component
├── pages/              # Main application pages
│   ├── Home.tsx        # Landing page
│   ├── Solver.tsx      # Interactive solver
│   ├── Learn.tsx       # Tutorials and guides
│   ├── Dashboard.tsx   # User statistics
│   ├── About.tsx       # About page
│   └── Contact.tsx     # Contact form
├── algorithms/         # Solving algorithms
│   └── solvers.ts      # Algorithm implementations
├── utils/              # Utility functions
│   └── cubeUtils.ts    # Cube state management
├── hooks/              # Custom React hooks
│   └── useDarkMode.ts  # Dark mode functionality
├── types/              # TypeScript type definitions
│   └── index.ts        # Application types
└── assets/             # Static assets
```

## 🧮 Algorithms

### Layer by Layer (Easy)
- **Description**: Beginner-friendly method solving the cube layer by layer
- **Moves**: 50-100 typical moves
- **Best for**: New cubers learning the basics

### CFOP (Medium)
- **Description**: Cross, F2L, OLL, PLL - the most popular speedcubing method
- **Moves**: 50-60 typical moves  
- **Best for**: Intermediate cubers wanting to improve speed

### Kociemba's Algorithm (Hard)
- **Description**: Two-phase algorithm finding near-optimal solutions
- **Moves**: 20-25 optimal moves
- **Best for**: Finding the shortest possible solution

## 🎨 Customization

### Themes
The application supports both light and dark themes with automatic system preference detection. Themes can be customized in `tailwind.config.js`.

### Colors
Cube colors and application theme colors can be modified in the Tailwind configuration and `src/utils/cubeUtils.ts`.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and add tests
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Kociemba's Algorithm** - Herbert Kociemba for the two-phase algorithm
- **Three.js Community** - For the excellent 3D graphics library
- **Speedcubing Community** - For algorithm development and optimization
- **React Team** - For the amazing frontend framework

## 📞 Support

- **Email**: contact@cubesolver.com
- **GitHub Issues**: [Report a bug or request a feature](https://github.com/your-username/rubiks-cube-solver/issues)
- **Discord**: Join our community server for discussions

## 🗺️ Roadmap

- [ ] Advanced algorithm implementations (Roux, ZZ)
- [ ] Multiplayer solving competitions
- [ ] Mobile app versions (React Native)
- [ ] AI-powered cube scanning from photos
- [ ] Virtual reality cube solving experience
- [ ] Integration with physical smart cubes

---

**Built with ❤️ by the CubeSolver team**
