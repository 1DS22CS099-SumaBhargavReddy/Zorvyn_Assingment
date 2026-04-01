import React, { useState } from 'react';
import TransactionTable from '../components/TransactionTable';
import TransactionModal from '../components/TransactionModal';
import { useFinance } from '../context/FinanceContext';
import { Search, Filter, Plus, FileDown } from 'lucide-react';
import { categories } from '../data/initialData';

const TransactionsPage = () => {
  const { filters, setFilters, role } = useFinance();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const handleSearchChange = (e) => setFilters({ ...filters, search: e.target.value });
  const handleCategoryChange = (e) => setFilters({ ...filters, category: e.target.value });
  const handleTypeChange = (e) => setFilters({ ...filters, type: e.target.value });

  const openAddModal = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  return (
    <div className="transactions-page container fade-in">
      <header className="page-header m-b-3">
        <div className="flex-between">
          <div>
            <h1 className="gradient-text">Transactions</h1>
            <p className="text-secondary">Track every penny with precision.</p>
          </div>
          <div className="flex-align gap-2">
            <button className="btn outline">
              <FileDown size={18} />
              <span>Export</span>
            </button>
            {role === 'Admin' && (
              <button className="btn primary" onClick={openAddModal}>
                <Plus size={18} />
                <span>Add New</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <TransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        transactionToEdit={editingTransaction}
      />

      <div className="filter-bar glass m-b-2 p-1 flex-between flex-wrap gap-2">
        <div className="search-wrap glass">
          <Search size={18} className="text-secondary" />
          <input 
            type="text" 
            placeholder="Search transactions..." 
            value={filters.search}
            onChange={handleSearchChange}
          />
        </div>
        
        <div className="flex-align gap-2 flex-wrap">
          <div className="select-wrap glass">
            <Filter size={16} className="text-secondary" />
            <select value={filters.category} onChange={handleCategoryChange}>
              <option value="All">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="select-wrap glass">
            <select value={filters.type} onChange={handleTypeChange}>
              <option value="All">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
        </div>
      </div>

      <div className="transactions-container">
        <TransactionTable onEdit={handleEdit} />
      </div>
    </div>
  );
};

export default TransactionsPage;
