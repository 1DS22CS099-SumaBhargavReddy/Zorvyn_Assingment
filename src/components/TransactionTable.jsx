import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { Trash2, Edit3, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

const TransactionTable = ({ limit, onEdit }) => {
  const { filteredTransactions, deleteTransaction, role } = useFinance();
  
  const displayTransactions = limit ? filteredTransactions.slice(0, limit) : filteredTransactions;

  if (displayTransactions.length === 0) {
    return <div className="no-data glass p-3 text-center">No transactions found matching your criteria.</div>;
  }

  return (
    <div className="table-container glass overflow-hidden">
      <table className="finance-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th className="text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {displayTransactions.map((t) => (
            <tr key={t.id} className="table-row">
              <td className="text-secondary font-sm">{t.date}</td>
              <td>
                <div className="flex-align gap-2">
                  <div className={`type-icon ${t.type}`}>
                    {t.type === 'income' ? <ArrowUpRight size={14} /> : <ArrowDownLeft size={14} />}
                  </div>
                  <span className="font-medium">{t.description}</span>
                </div>
              </td>
              <td>
                <span className="badge glass">{t.category}</span>
              </td>
              <td>
                <span className={`font-bold ${t.type === 'income' ? 'text-success' : 'text-danger'}`}>
                  {t.type === 'income' ? '+' : '-'}${Math.abs(t.amount || 0).toFixed(2)}
                </span>
              </td>
              <td className="text-right">
                <div className="table-actions">
                  {role === 'Admin' ? (
                    <>
                      <button 
                        className="action-btn edit" 
                        title="Edit"
                        onClick={() => onEdit(t)}>
                        <Edit3 size={16} />
                      </button>
                      <button 
                        className="action-btn delete" 
                        title="Delete"
                        onClick={() => deleteTransaction(t.id)}>
                        <Trash2 size={16} />
                      </button>
                    </>
                  ) : (
                    <span className="text-secondary font-xs">View Only</span>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
