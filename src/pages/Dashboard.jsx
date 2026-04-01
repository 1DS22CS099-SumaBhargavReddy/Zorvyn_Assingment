import React, { useState } from 'react';
import StatsCard from '../components/StatsCard';
import FinanceChart from '../components/FinanceChart';
import TransactionTable from '../components/TransactionTable';
import TransactionModal from '../components/TransactionModal';
import { useFinance } from '../context/FinanceContext';
import { PieChart, TrendingUp, TrendingDown, DollarSign, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { stats, transactions, role } = useFinance();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  // Simple Insight: Highest Spending Category
  const categoryExpenses = transactions.reduce((acc, t) => {
    if (t.type === 'expense') {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
    }
    return acc;
  }, {});

  const highestCategory = Object.keys(categoryExpenses).reduce((a, b) => 
    categoryExpenses[a] > categoryExpenses[b] ? a : b, 'None');

  return (
    <div className="dashboard-page container fade-in">
      <header className="page-header m-b-3">
        <h1 className="gradient-text">Welcome back</h1>
        <p className="text-secondary">Your finances are looking healthy this month.</p>
      </header>

      <section className="stats-grid grid-3 m-b-3">
        <StatsCard title="Total Balance" amount={stats.balance} type="balance" />
        <StatsCard title="Monthly Income" amount={stats.income} type="income" />
        <StatsCard title="Monthly Expenses" amount={stats.expenses} type="expense" />
      </section>

      <div className="dashboard-main grid-lg">
        <section className="chart-section">
          <FinanceChart />
        </section>

        <section className="insights-section card glass">
          <div className="flex-align gap-2 m-b-2">
            <PieChart className="text-primary" />
            <h3>Highlights</h3>
          </div>
          <div className="insight-item m-b-2">
            <p className="font-sm text-secondary">Highest Spending</p>
            <h4 className="gradient-text">{highestCategory}</h4>
            <div className="progress-bar glass">
              <div className="progress-fill" style={{ width: '70%', background: 'var(--secondary)' }}></div>
            </div>
          </div>
          <div className="insight-item">
            <p className="font-sm text-secondary">Savings Goal</p>
            <h4 className="gradient-text">$5,000.00</h4>
            <div className="progress-bar glass">
              <div className="progress-fill" style={{ width: '45%', background: 'var(--success)' }}></div>
            </div>
          </div>
        </section>
      </div>

      <TransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        transactionToEdit={editingTransaction}
      />

      <section className="recent-transactions m-t-3">
        <div className="flex-between m-b-2">
          <h2>Recent Transactions</h2>
          <div className="flex-align gap-2">
            {role === 'Admin' && (
              <button className="btn outline" onClick={openAddModal}>
                <Plus size={18} />
                <span>Add New</span>
              </button>
            )}
            <button className="btn outline" onClick={() => navigate('/transactions')}>View All</button>
          </div>
        </div>
        <TransactionTable limit={5} onEdit={handleEdit} />
      </section>
    </div>
  );
};

export default Dashboard;
