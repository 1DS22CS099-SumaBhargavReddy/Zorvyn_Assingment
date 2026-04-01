import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FinanceProvider } from './context/FinanceContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import TransactionsPage from './pages/TransactionsPage';
import KPIPage from './pages/KPIPage';
import { ApiReferenceReact } from '@scalar/api-reference-react';
import '@scalar/api-reference-react/style.css';
import spec from './docs/openapi.json';
import { useFinance } from './context/FinanceContext';
import './App.css';

function App() {
  const { theme } = useFinance();

  return (
    <Router>
      <div className={`app-shell ${theme === 'light' ? 'light-mode' : ''}`}>
        <Navbar />
        <main className="main-content m-t-3">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/kpi" element={<KPIPage />} />
            <Route 
              path="/docs" 
              element={
                <div className="glass container m-t-3 p-0 overflow-hidden" style={{ height: '80vh' }}>
                  <ApiReferenceReact configuration={{ spec: { content: spec } }} />
                </div>
              } 
            />
          </Routes>
        </main>
        <footer className="footer m-t-3 p-3 text-center text-secondary font-sm">
          &copy; 2024 Zorvyn Finance. Built with React & AnimeJS.
        </footer>
      </div>
    </Router>
  );
}

export default App;
