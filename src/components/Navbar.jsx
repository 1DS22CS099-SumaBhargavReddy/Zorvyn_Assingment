import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useFinance } from '../context/FinanceContext';
import { LayoutDashboard, ReceiptText, ShieldCheck, User, Moon, Sun, ChartPie, Lock, LogOut, Zap } from 'lucide-react';
import LoginModal from './LoginModal';
import './Navbar.css';

const Navbar = () => {
  const { role, handleLogout, theme, setTheme } = useFinance();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const handleRoleClick = (newRole) => {
    if (newRole === 'Admin') {
      if (role !== 'Admin') setIsLoginOpen(true);
    } else {
      handleLogout();
    }
  };

  return (
    <nav className="navbar glass">
      <div className="nav-container container flex-between">
        <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

        <div className="nav-brand">
          <ChartPie className="brand-icon" />
          <span className="brand-name gradient-text">ZorvynFinance</span>
        </div>

        <div className="nav-links">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            <LayoutDashboard size={20} />
            <span>Overview</span>
          </NavLink>
          <NavLink to="/transactions" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            <ReceiptText size={20} />
            <span>Transactions</span>
          </NavLink>
          <NavLink to="/kpi" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            <Zap size={20} />
            <span>KPI Insights</span>
          </NavLink>
          <NavLink to="/docs" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
            <ShieldCheck size={20} />
            <span>API Docs</span>
          </NavLink>
        </div>

        <div className="nav-actions">
          <button className="theme-toggle action-btn glass" onClick={toggleTheme} title="Toggle Theme">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div className="role-switcher glass">
            <span className="role-label flex-align gap-1">
              {role === 'Admin' ? <ShieldCheck size={14} className="text-primary" /> : <User size={14} />}
              {role}
            </span>
            <div className="role-dropdown">
              <button
                onClick={() => handleRoleClick('Viewer')}
                className={role === 'Viewer' ? 'active' : ''}>
                <User size={14} />
                <span>Viewer Mode</span>
              </button>
              <button
                onClick={() => handleRoleClick('Admin')}
                className={role === 'Admin' ? 'active' : ''}>
                {role === 'Admin' ? <ShieldCheck size={14} /> : <Lock size={14} />}
                <span>{role === 'Admin' ? 'Admin Active' : 'Login as Admin'}</span>
              </button>
              {role === 'Admin' && (
                <button onClick={handleLogout} className="logout-btn">
                  <LogOut size={14} />
                  <span>Logout</span>
                </button>
              )}
            </div>
          </div>
          {/*           
          <div className="nav-profile">
            <div className="profile-img glass">
              <User size={18} />
            </div>
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
