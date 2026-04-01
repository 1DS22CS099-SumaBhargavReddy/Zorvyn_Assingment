import React, { createContext, useState, useContext, useEffect } from 'react';
import { initialTransactions } from '../data/initialData';

const FinanceContext = createContext();

export const useFinance = () => useContext(FinanceContext);

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : initialTransactions;
  });
  
  const [role, setRole] = useState(() => localStorage.getItem('role') || 'Viewer');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [filters, setFilters] = useState({
    search: '',
    category: 'All',
    type: 'All'
  });

  useEffect(() => {
    localStorage.setItem('role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.className = theme === 'light' ? 'light-mode' : '';
  }, [theme]);

  const handleLogin = (username, password) => {
    if (username === 'admin' && password === 'admin@123') {
      setRole('Admin');
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials. Please try again.' };
  };

  const handleLogout = () => {
    setRole('Viewer');
  };

  const addTransaction = (transaction) => {
    if (role !== 'Admin') return;
    const newTransaction = {
      ...transaction,
      id: Date.now(),
      date: transaction.date || new Date().toISOString().split('T')[0]
    };
    setTransactions([newTransaction, ...transactions]);
  };

  const updateTransaction = (id, updatedData) => {
    if (role !== 'Admin') return;
    setTransactions(transactions.map(t => t.id === id ? { ...t, ...updatedData } : t));
  };

  const deleteTransaction = (id) => {
    if (role !== 'Admin') return;
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const stats = {
    income: transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0),
    expenses: transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0),
  };
  stats.balance = stats.income - stats.expenses;

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = (t.description?.toLowerCase().includes(filters.search.toLowerCase())) || 
                          (t.category?.toLowerCase().includes(filters.search.toLowerCase()));
    const matchesCategory = filters.category === 'All' || t.category === filters.category;
    const matchesType = filters.type === 'All' || t.type === filters.type;
    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <FinanceContext.Provider value={{
      transactions,
      filteredTransactions,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      role,
      handleLogin,
      handleLogout,
      theme,
      setTheme,
      filters,
      setFilters,
      stats
    }}>
      {children}
    </FinanceContext.Provider>
  );
};
