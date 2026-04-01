import React, { useMemo, useRef } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { Radar, Doughnut, Bar } from 'react-chartjs-2';
import { useFinance } from '../context/FinanceContext';
import { TrendingUp, Wallet, Target, Zap, ArrowDown, ArrowUp, RefreshCcw } from 'lucide-react';
import zoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  zoomPlugin
);

const KPIPage = () => {
  const { transactions, stats, theme } = useFinance();
  const radarRef = useRef(null);
  const isDark = theme === 'dark';
  const textColor = isDark ? '#cbd5e1' : '#475569';

  const handleResetRadar = () => {
    if (radarRef.current) {
      radarRef.current.resetZoom();
    }
  };

  // 1. Savings Rate Calculation
  // ... (keeping existing logic)
  const savingsRate = stats.income > 0 ? ((stats.income - stats.expenses) / stats.income) * 100 : 0;
  
  // 2. Radar Chart Data (Spending Intensity)
  // ... (keeping existing logic)
  const categorySpending = useMemo(() => {
    const map = transactions.filter(t => t.type === 'expense').reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
      return acc;
    }, {});
    return map;
  }, [transactions]);

  const radarData = {
    labels: Object.keys(categorySpending),
    datasets: [
      {
        label: 'Spending Intensity',
        data: Object.values(categorySpending),
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: '#6366f1',
        pointBackgroundColor: '#6366f1',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#6366f1'
      }
    ]
  };

  const radarOptions = {
    scales: {
      r: {
        angleLines: { color: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' },
        grid: { color: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' },
        pointLabels: { color: textColor, font: { size: 12 } },
        ticks: { display: false }
      }
    },
    plugins: {
      legend: { display: false },
      zoom: {
        zoom: {
          wheel: { enabled: true },
          pinch: { enabled: true },
          mode: 'xy',
        },
        pan: {
          enabled: true,
          mode: 'xy',
        }
      }
    }
  };

  // 3. Weekly Burn Rate (Average)
  const burnRate = stats.expenses / 30; // 30 days average
  const overheadRatio = stats.income > 0 ? (stats.expenses / stats.income) * 100 : 0;
  const efficiencyScore = stats.income > 0 ? Math.round(100 - overheadRatio) : 0;

  return (
    <div className="kpi-page container fade-in m-b-3">
      <header className="page-header m-b-3">
        <h1 className="gradient-text">KPI Insights</h1>
        <p className="text-secondary">Deep dive into your financial efficiency.</p>
      </header>

      <div className="grid-3 m-b-3">
        <div className="card glass kpi-card">
          <div className="flex-align gap-2 m-b-1">
            <div className="p-1 glass rounded-full text-success">
              <TrendingUp size={20} />
            </div>
            <span className="font-sm text-secondary">Savings Ratio</span>
          </div>
          <div className="flex-align flex-col gap-1">
            <h2 className={savingsRate > 20 ? 'text-success' : 'text-warning'}>
              {savingsRate.toFixed(1)}%
            </h2>
            <div className="w-full h-1 glass rounded-full overflow-hidden">
              <div 
                className="h-full bg-success transition-all duration-1000" 
                style={{ width: `${Math.min(Math.max(savingsRate, 0), 100)}%` }}
              />
            </div>
            <p className="font-xs text-secondary">Healthy benchmark: 20%+</p>
          </div>
        </div>

        <div className="card glass kpi-card">
          <div className="flex-align gap-2 m-b-1">
            <div className="p-1 glass rounded-full text-primary">
              <Zap size={20} />
            </div>
            <span className="font-sm text-secondary">Daily Burn Rate</span>
          </div>
          <div className="flex-align flex-col gap-1">
            <h2>${burnRate.toFixed(2)}</h2>
            <p className="font-xs text-secondary">Avg. spending per day</p>
          </div>
        </div>

        <div className="card glass kpi-card">
          <div className="flex-align gap-2 m-b-1">
            <div className="p-1 glass rounded-full text-secondary">
              <Target size={20} />
            </div>
            <span className="font-sm text-secondary">Expense Overhead</span>
          </div>
          <div className="flex-align flex-col gap-1">
            <h2>{overheadRatio.toFixed(1)}%</h2>
            <p className="font-xs text-secondary">Of your income is spent</p>
          </div>
        </div>
      </div>

      <div className="grid-2 gap-3" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr' }}>
        <div className="card glass p-3">
          <div className="flex-between m-b-2">
            <h3>Spending Profile</h3>
            <button className="action-btn glass p-1 font-xs flex-align gap-1" onClick={handleResetRadar} title="Reset Radar Zoom">
              <RefreshCcw size={14} />
              <span>Reset Zoom</span>
            </button>
          </div>
          <div style={{ height: '350px' }}>
            {Object.keys(categorySpending).length > 0 ? (
              <Radar ref={radarRef} data={radarData} options={radarOptions} />
            ) : (
              <div className="flex-center h-full text-secondary">Add expenses to see profile</div>
            )}
          </div>
        </div>

        <div className="flex-col gap-3">
          <div className="card glass p-3">
            <h3 className="m-b-2">Efficiency Score</h3>
            <div className="flex-center flex-col gap-2 p-y-2">
              <div 
                className="radial-progress-container flex-center" 
                style={{ 
                  width: '140px', 
                  height: '140px', 
                  borderRadius: '50%',
                  background: `conic-gradient(var(--primary) ${efficiencyScore * 3.6}deg, var(--glass-bg) 0deg)`,
                  position: 'relative',
                  boxShadow: 'inset 0 0 10px rgba(0,0,0,0.2)'
                }}
              >
                <div 
                  className="inner-circle glass rounded-full flex-center" 
                  style={{ 
                    width: '110px', 
                    height: '110px', 
                    background: 'var(--bg-dark)',
                    zIndex: 1
                  }}
                >
                  <span className="font-bold text-lg">{efficiencyScore}/100</span>
                </div>
              </div>
              <p className="text-center font-sm text-secondary">Based on income retention</p>
            </div>
          </div>
          
          <div className="card glass p-3">
            <h3 className="m-b-1">Highlights</h3>
            <ul className="kpi-list">
              <li className="flex-between p-y-1 border-b">
                <span className="font-sm">Primary Category</span>
                <span className="badge glass">{Object.keys(categorySpending)[0] || 'N/A'}</span>
              </li>
              <li className="flex-between p-y-1 border-b">
                <span className="font-sm">Profitability</span>
                <span className={`flex-align gap-1 font-sm ${stats.balance > 0 ? 'text-success' : 'text-danger'}`}>
                  {stats.balance > 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                  ${Math.abs(stats.balance).toLocaleString()}
                </span>
              </li>
              <li className="flex-between p-y-1">
                <span className="font-sm">Risk Factor</span>
                <span className="badge glass text-warning">Medium</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        .kpi-card h2 { font-size: 2rem; }
        .kpi-list { list-style: none; }
        .border-b { border-bottom: 1px solid var(--border); }
      `}</style>
    </div>
  );
};

export default KPIPage;
