import React, { useState, useRef } from 'react';
import TransactionTable from '../components/TransactionTable';
import TransactionModal from '../components/TransactionModal';
import { useFinance } from '../context/FinanceContext';
import { Search, Filter, Plus, FileDown, FileText, FileUp, Download, ChevronDown } from 'lucide-react';
import { categories } from '../data/initialData';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const TransactionsPage = () => {
  const { filters, setFilters, role, importTransactions, filteredTransactions } = useFinance();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchChange = (e) => setFilters({ ...filters, search: e.target.value });
  const handleCategoryChange = (e) => setFilters({ ...filters, category: e.target.value });
  const handleTypeChange = (e) => setFilters({ ...filters, type: e.target.value });

  const handleEdit = (transaction) => {
    // Implement edit logic if needed, currently just opens modal
    setIsModalOpen(true);
  };

  const handleExportCSV = () => {
    const csvContent = [
      ['Date', 'Category', 'Type', 'Amount', 'Description'].join(','),
      ...filteredTransactions.map(t => [
        t.date,
        t.category,
        t.type,
        t.amount,
        `"${t.description.replace(/"/g, '""')}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text('Zorvyn Finance - Transactions Report', 14, 15);
    
    const tableData = filteredTransactions.map(t => [
      t.date,
      t.category,
      t.type.toUpperCase(),
      `$${t.amount.toLocaleString()}`,
      t.description
    ]);

    autoTable(doc, {
      head: [['Date', 'Category', 'Type', 'Amount', 'Description']],
      body: tableData,
      startY: 20,
      theme: 'grid',
      headStyles: { fillColor: [99, 102, 241] }
    });

    doc.save(`transactions_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target.result;
        let data = [];
        if (file.name.endsWith('.json')) {
          data = JSON.parse(text);
        } else if (file.name.endsWith('.csv')) {
          const lines = text.split('\n');
          data = lines.slice(1).filter(l => l.trim()).map(line => {
            const values = line.split(',');
            return {
              date: values[0],
              category: values[1],
              type: values[2],
              amount: parseFloat(values[3]),
              description: values[4]?.replace(/"/g, '')
            };
          });
        }
        importTransactions(data);
      } catch {
        alert('Failed to parse file. Please ensure it is a valid CSV or JSON.');
      }
    };
    reader.readAsText(file);
  };

  const fileInputRef = useRef(null);

  return (
    <div className="transactions-page container fade-in m-b-3">
      <header className="page-header m-b-3 flex-between flex-wrap gap-2">
        <div>
          <h1 className="gradient-text">Transactions</h1>
          <p className="text-secondary">Comprehensive financial record management.</p>
        </div>
        <div className="flex-align gap-2">
          {/* Export Dropdown - Available to All */}
          <div className="dropdown glass">
            <button className="action-btn flex-align gap-2 p-x-2">
              <Download size={18} />
              <span>Export</span>
              <ChevronDown size={14} />
            </button>
            <div className="dropdown-content">
              <button onClick={handleExportCSV} className="flex-align gap-2">
                <FileDown size={16} />
                CSV Format
              </button>
              <button onClick={handleExportPDF} className="flex-align gap-2">
                <FileText size={16} />
                PDF Report
              </button>
            </div>
          </div>

          {/* Import - Admin Only */}
          {role === 'Admin' && (
            <>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImport} 
                style={{ display: 'none' }} 
                accept=".csv,.json"
              />
              <button className="action-btn glass p-x-2" onClick={() => fileInputRef.current.click()}>
                <FileUp size={18} />
                <span>Import</span>
              </button>
            </>
          )}

          {/* Add - Admin Only */}
          {role === 'Admin' && (
            <button className="btn-primary flex-align gap-2" onClick={() => setIsModalOpen(true)}>
              <Plus size={18} />
              <span>Add Transaction</span>
            </button>
          )}
        </div>
      </header>

      <TransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
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
        <style>{`
        .dropdown { position: relative; display: inline-block; }
        .dropdown-content {
          display: none;
          position: absolute;
          right: 0;
          top: 100%;
          min-width: 160px;
          margin-top: 0.5rem;
          background: var(--glass-bg);
          backdrop-filter: blur(12px);
          border: 1px solid var(--border);
          border-radius: 12px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
          z-index: 100;
          overflow: hidden;
        }
        .dropdown:hover .dropdown-content { display: block; }
        .dropdown-content button {
          width: 100%;
          text-align: left;
          padding: 0.8rem 1rem;
          border: none;
          background: transparent;
          color: var(--text-light);
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .dropdown-content button:hover {
          background: var(--primary);
          color: white;
        }
      `}</style>
      </div>
    </div>
  );
};

export default TransactionsPage;
