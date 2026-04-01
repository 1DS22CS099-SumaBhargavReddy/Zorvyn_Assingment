# Zorvyn Finance Dashboard

A modern, high-end finance tracking dashboard built with React, Chart.js, and Anime.js. This application features a glassmorphic design, interactive data visualizations, and simulated role-based access control.

## 🚀 Features

- **Dashboard Overview**:
  - Summary cards for Total Balance, Monthly Income, and Monthly Expenses.
  - Interactive **Balance Trend** line chart.
  - **Categorical Breakdown** doughnut chart (toggleable).
- **KPI Insights & Analytics**:
  - Dedicated **KPI Insights** page with advanced financial metrics.
  - **Savings Ratio** gauge and **Daily Burn Rate** tracker.
  - **Spending Profile** radar chart for category intensity analysis.
- **Transactions Management**:
  - Dynamic transaction list with filtering by category and type.
  - Search functionality for transaction descriptions.
  - Full **CRUD** (Create, Read, Update, Delete) with a modern modal.
- **Admin Security (RBAC Simulation)**:
  - **Admin Login**: Secure management access with username `admin` and password `admin@123`.
  - **Viewer Mode**: Read-only state for standard browsing.
  - Toggle between roles via the **Role Switcher** in the Navbar.
- **API Documentation**:
  - Integrated **Scalar API Reference** displaying a mock OpenAPI specification for financial services.
- **Advanced UI/UX**:
  - **3D Tilt Effects**: Dynamic card-tilt animations using **Anime.js** on hover.
  - **Dark/Light Themes**: Global theme management with persistent user preference.
  - Glassmorphic design with smooth staggered entry transitions.

## 🛠️ Tech Stack

- **Framework**: React (Vite)
- **Styling**: Vanilla CSS (Custom Glassmorphism Variable System)
- **Charts**: Chart.js & react-chartjs-2
- **Animations**: Anime.js (Perspective 3D)
- **Icons**: Lucide-React
- **Routing**: React Router DOM (v6+)
- **Documentation**: @scalar/api-reference-react

## 🏗️ Architecture

The Zorvyn Finance Dashboard follows a **Modular Frontend-Only Architecture**, prioritizing performance and interactive data visualization:

- **State Distribution**: Utilizes a centralized `FinanceContext` (Provider Pattern) to distribute financial data, user roles, and theme settings throughout the component tree.
- **Data Persistence**: Implemented a **LocalStorage Sync Layer** that automatically serializes and restores the application state, ensuring a persistent experience without a backend.
- **Component Hierarchy**:
  - **Containers**: `Dashboard`, `TransactionsPage`, `KPIPage`.
  - **Shared UI**: `Navbar`, `Modal`, `StatsCard`, `FinanceChart`.
- **Theme Engine**: A CSS variable-based system handles real-time theme swapping with 0-latency style updates.

## 🔌 Used APIs & Libraries

- **Chart.js (v4)**: Powered by `react-chartjs-2`, used for the Balance Trend (Line), Categorical Breakdown (Doughnut), and Spending Profile (Radar).
- **Anime.js**: Orchestrates high-end 3D perspective animations and staggered reveal effects.
- **Scalar API**: Integrated at `/docs` to provide a full-featured API documentation playground using OpenAPI 3.0.
- **Lucide React**: A comprehensive icon suite for semantic UI representation.

## 🪝 React Hooks Used

- **`useFinance` (Custom Hook)**: A high-level abstraction for accessing and modifying the global financial state.
- **`useState`**: For local component states (modal visibility, local toggles).
- **`useReducer`**: For managing complex transaction logic and stats calculations.
- **`useEffect`**: For lifecycle management, including theme application and localStorage synchronization.
- **`useMemo`**: Essential for performant on-the-fly calculations of KPIs and chart data structures.
- **`useRef`**: Used for imperative access to Chart.js instances (e.g., Reset Zoom functionality).

## 🌳 Architecture Tree

```text
Zorvyn_Assingment/
├── src/
│   ├── components/          # Reusable UI Components
│   │   ├── FinanceChart.jsx # Interactive Data Visuals (Zoomable)
│   │   ├── LoginModal.jsx   # Admin Security & Auth UI
│   │   ├── Navbar.jsx       # Global Navigation & Mode Toggles
│   │   ├── StatsCard.jsx    # Summary Metrics with 3D Interaction
│   │   ├── TransactionModal.jsx # Create/Edit Management Interface
│   │   └── TransactionTable.jsx # Dynamic Grid with Filtering
│   ├── context/
│   │   └── FinanceContext.jsx # Global State & Persistence (Context API)
│   ├── data/
│   │   └── initialData.js   # Seed Data & Category Definitions
│   ├── docs/
│   │   └── openapi.json     # Scalar API Reference (OpenAPI 3.0)
│   ├── pages/
│   │   ├── Dashboard.jsx    # Executive Overview Container
│   │   ├── KPIPage.jsx      # Advanced KPI Analytics (Radar & Gauges)
│   │   └── TransactionsPage.jsx # Full Transaction Management View
│   ├── App.jsx              # Main Router & Theme Wrapper
│   ├── index.css            # Global Design System (Glassmorphic Tokens)
│   └── main.jsx             # React Entry Point
├── project_details.txt      # Evaluator Cheat Sheet (8 Criteria)
├── package.json             # Core Dependencies & Scripts
└── README.md                # Project Documentation Hub
```

## 📦 Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/1DS22CS099-SumaBhargavReddy/Zorvyn_Assingment.git
   cd Zorvyn_Assingment
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## 📂 Project Structure

- `src/components`: Reusable UI components (StatsCard, Navbar, TransactionModal, LoginModal).
- `src/context`: State management for transactions, roles, and themes (`FinanceContext.jsx`).
- `src/data`: Initial mock data and category definitions.
- `src/pages`: Main application views (Dashboard, Transactions, KPIPage, Scalar Docs).
- `src/docs`: OpenAPI v3.0 specification for Scalar documentation.
- `index.css`: Global design system and glassmorphic tokens.

## 📝 Approach & Evaluation Criteria

- **Design & Creativity**: Implemented a high-end Glassmorphism system with custom backdrop filters and 3D hover interactions to create a premium, state-of-the-art feel.
- **Responsiveness**: Used flexible CSS Flexbox and Grid layouts to ensure a seamless experience on mobile, tablet, and desktop viewports.
- **Functionality**: Delivered a complete CRUD experience for transactions, reinforced by a simulated RBAC security layer.
- **State Management**: Leveraged the React Context API with `localStorage` persistence for a robust, "always-saved" user experience.
- **Attention to Detail**: Handled complex edge cases like zero-income states, animated entry paths, and inclusive UI features like password visibility toggles.
