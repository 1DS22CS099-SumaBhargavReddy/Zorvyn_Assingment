import React, { useState, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { useFinance } from '../context/FinanceContext';
import zoomPlugin from 'chartjs-plugin-zoom';
import { Search, RefreshCcw } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  zoomPlugin
);

const FinanceChart = () => {
  const { transactions, theme } = useFinance();
  const [chartType, setChartType] = useState('trend'); // trend, category
  const chartRef = useRef(null);

  const isDark = theme === 'dark';
  const textColor = isDark ? '#cbd5e1' : '#475569';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
  const tooltipBg = isDark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.95)';
  const tooltipText = isDark ? '#fff' : '#1e293b';

  const handleResetZoom = () => {
    if (chartRef.current) {
      chartRef.current.resetZoom();
    }
  };

  // Process data for Trend Chart
  const trendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Balance Trend',
        data: [2000, 2500, 2200, 2800, 3100, 3500],
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ]
  };

  // Process data for Category Chart
  const categoriesMap = transactions.reduce((acc, t) => {
    if (t.type === 'expense') {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
    }
    return acc;
  }, {});

  const categoryData = {
    labels: Object.keys(categoriesMap),
    datasets: [
      {
        label: 'Expenses by Category',
        data: Object.values(categoriesMap),
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
        ],
        borderWidth: 0,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: tooltipBg,
        titleColor: tooltipText,
        bodyColor: tooltipText,
        borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
      },
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
    },
    scales: {
      y: {
        grid: { color: gridColor },
        ticks: { color: textColor }
      },
      x: {
        grid: { display: false },
        ticks: { color: textColor }
      }
    }
  };

  return (
    <div className="card glass chart-container">
      <div className="flex-between m-b-2">
        <div className="flex-align gap-2">
          <h3 className="chart-title">Insights</h3>
          <button className="action-btn glass p-1 font-xs flex-align gap-1" onClick={handleResetZoom} title="Reset Chart Zoom">
            <RefreshCcw size={14} />
            <span>Reset Zoom</span>
          </button>
        </div>
        <div className="chart-toggles glass">
          <button 
            className={chartType === 'trend' ? 'active' : ''} 
            onClick={() => setChartType('trend')}>
            Trend
          </button>
          <button 
            className={chartType === 'category' ? 'active' : ''} 
            onClick={() => setChartType('category')}>
            Categories
          </button>
        </div>
      </div>
      
      <div className="chart-wrapper" style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {transactions.length === 0 ? (
          <div className="no-data text-secondary text-center">
            <p>No financial activity recorded yet.</p>
            <p className="font-xs">Add transactions to see your trends.</p>
          </div>
        ) : chartType === 'trend' ? (
          <Line ref={chartRef} data={trendData} options={options} />
        ) : (
          <Doughnut 
            data={categoryData} 
            options={{
              ...options,
              scales: { x: { display: false }, y: { display: false } },
              plugins: { legend: { display: true, position: 'right', labels: { color: textColor } } }
            }} 
          />
        )}
      </div>
    </div>
  );
};

export default FinanceChart;
