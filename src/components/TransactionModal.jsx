import React, { useState, useEffect } from 'react';
import { useFinance } from '../context/FinanceContext';
import { X, Check, AlertCircle } from 'lucide-react';
import { categories } from '../data/initialData';
import { animate } from 'animejs';

const TransactionModal = ({ isOpen, onClose, transactionToEdit }) => {
  const { addTransaction, updateTransaction } = useFinance();
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'Food',
    type: 'expense',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (transactionToEdit) {
      setFormData(transactionToEdit);
    } else {
      setFormData({
        description: '',
        amount: '',
        category: 'Food',
        type: 'expense',
        date: new Date().toISOString().split('T')[0]
      });
    }
  }, [transactionToEdit, isOpen]);

  useEffect(() => {
    if (isOpen) {
      animate('.modal-overlay', { opacity: [0, 1] }, { duration: 300, easing: 'ease-out' });
      animate('.modal-content', { 
        opacity: [0, 1], 
        scale: [0.9, 1],
        rotateX: [10, 0] 
      }, { duration: 400, easing: 'ease-out-back' });
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...formData, amount: parseFloat(formData.amount) };
    if (transactionToEdit) {
      updateTransaction(transactionToEdit.id, data);
    } else {
      addTransaction(data);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content glass">
        <div className="flex-between m-b-2">
          <h3>{transactionToEdit ? 'Edit Transaction' : 'Add Transaction'}</h3>
          <button onClick={onClose} className="action-btn"><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group m-b-1">
            <label>Description</label>
            <input 
              type="text" 
              className="glass"
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="e.g. Weekly Groceries"
            />
          </div>

          <div className="grid-2 gap-2 m-b-1">
            <div className="form-group">
              <label>Amount ($)</label>
              <input 
                type="number" 
                step="0.01"
                className="glass"
                required
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input 
                type="date" 
                className="glass"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
          </div>

          <div className="grid-2 gap-2 m-b-2">
            <div className="form-group">
              <label>Category</label>
              <select 
                className="glass"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Type</label>
              <select 
                className="glass"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
          </div>

          <div className="modal-footer flex-end gap-2">
            <button type="button" onClick={onClose} className="btn outline">Cancel</button>
            <button type="submit" className="btn primary">
              <Check size={18} />
              <span>{transactionToEdit ? 'Update' : 'Save'}</span>
            </button>
          </div>
        </form>
      </div>
      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
        }
        .modal-content {
          width: 500px;
          max-width: 90%;
          padding: 2rem;
          border-radius: var(--radius-lg);
          transform-style: preserve-3d;
        }
        .form-group label {
          display: block;
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
        }
        .form-group input, .form-group select {
          width: 100%;
          padding: 0.8rem 1rem;
          border-radius: var(--radius-md) !important;
          border: 1px solid var(--border);
          outline: none;
          color: var(--text-primary);
        }
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; }
        .flex-end { display: flex; justify-content: flex-end; }
      `}</style>
    </div>
  );
};

export default TransactionModal;
