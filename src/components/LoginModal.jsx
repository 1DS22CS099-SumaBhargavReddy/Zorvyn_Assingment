import React, { useState, useEffect } from 'react';
import { useFinance } from '../context/FinanceContext';
import { X, Lock, User, AlertCircle, Loader2, Eye, EyeOff } from 'lucide-react';
import { animate } from 'animejs';

const LoginModal = ({ isOpen, onClose }) => {
  const { handleLogin } = useFinance();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      animate('.login-content', { 
        opacity: [0, 1], 
        translateY: [30, 0],
        scale: [0.95, 1]
      }, { duration: 500, easing: 'ease-out-back' });
      setFormData({ username: '', password: '' });
      setError('');
      setShowPassword(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate network delay for a more professional feel
    setTimeout(() => {
      const result = handleLogin(formData.username, formData.password);
      if (result.success) {
        onClose();
      } else {
        setError(result.message);
        animate('.login-content', { translateX: [0, -10, 10, -10, 10, 0] }, { duration: 400 });
      }
      setLoading(false);
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay login-overlay">
      <div className="modal-content login-content glass p-3">
        <div className="flex-between m-b-2">
          <div className="flex-align gap-2">
            <div className="lock-icon glass p-1">
              <Lock size={20} className="text-primary" />
            </div>
            <h3>Admin Access</h3>
          </div>
          <button onClick={onClose} className="action-btn"><X size={20} /></button>
        </div>

        <p className="text-secondary font-sm m-b-2 text-center">
          Please enter admin credentials to unlock management features.
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group m-b-1">
            <div className="input-with-icon glass">
              <User size={18} className="text-secondary" />
              <input 
                type="text" 
                placeholder="Username" 
                required
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group m-b-2">
            <div className="input-with-icon glass">
              <Lock size={18} className="text-secondary" />
              <input 
                type={showPassword ? 'text' : 'password'} 
                placeholder="Password" 
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button 
                type="button" 
                className="action-btn p-0" 
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
              >
                {showPassword ? <EyeOff size={18} className="text-secondary" /> : <Eye size={18} className="text-secondary" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="error-message m-b-2 flex-align gap-1 text-danger font-sm">
              <AlertCircle size={14} />
              <span>{error}</span>
            </div>
          )}

          <button type="submit" className="btn primary w-full flex-center gap-2" disabled={loading}>
            {loading ? <Loader2 size={18} className="animate-spin" /> : <span>Unlock Admin Mode</span>}
          </button>
        </form>

        <div className="hint m-t-2 text-center font-xs text-secondary">
          Hint: admin / admin@123
        </div>
      </div>
      <style>{`
        .login-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(2, 6, 23, 0.85) !important;
          backdrop-filter: blur(8px) !important;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }
        .login-content {
          width: 400px !important;
          margin: auto;
          border-radius: var(--radius-lg);
          transform-style: preserve-3d;
        }
        .input-with-icon {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border: 1px solid var(--border);
          border-radius: var(--radius-md) !important;
        }
        .input-with-icon input {
          border: none;
          background: none;
          color: var(--text-primary);
          outline: none;
          width: 100%;
          font-family: inherit;
        }
        .error-message {
          background: rgba(239, 68, 68, 0.1);
          padding: 0.5rem;
          border-radius: var(--radius-sm);
        }
        .w-full { width: 100%; }
        .flex-center { display: flex; align-items: center; justify-content: center; }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  );
};

export default LoginModal;
