import React, { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import { TrendingUp, TrendingDown, Wallet, DollarSign } from 'lucide-react';

const StatsCard = ({ title, amount, type, icon: Icon }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      animate(cardRef.current, {
        opacity: [0, 1],
        translateY: [20, 0],
      }, {
        duration: 800,
        easing: 'ease-out-elastic',
        delay: Math.random() * 300
      });
    }
  }, []);

  const getIcon = () => {
    if (Icon) return <Icon size={24} />;
    switch (type) {
      case 'income': return <TrendingUp size={24} className="text-success" />;
      case 'expense': return <TrendingDown size={24} className="text-danger" />;
      case 'balance': return <Wallet size={24} className="text-primary" />;
      default: return <DollarSign size={24} />;
    }
  };

  const getStatusColor = () => {
    switch (type) {
      case 'income': return 'var(--success)';
      case 'expense': return 'var(--danger)';
      case 'balance': return 'var(--primary)';
      default: return 'var(--text-primary)';
    }
  };

  const handleHover = () => {
    animate(cardRef.current, {
      rotateX: [-2, 5],
      rotateY: [-2, 5],
      scale: [1, 1.02],
    }, {
      duration: 400,
      easing: 'ease-out-quad'
    });
  };

  const handleHoverEnd = () => {
    animate(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
    }, {
      duration: 600,
      easing: 'ease-out-elastic'
    });
  };

  return (
    <div 
      className="card glass stats-card" 
      ref={cardRef}
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverEnd}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="flex-between m-b-1" style={{ transform: 'translateZ(20px)' }}>
        <div className="stats-icon" style={{ background: `rgba(${getStatusColor()}, 0.1)`, color: getStatusColor() }}>
          {getIcon()}
        </div>
        <div className="stats-percentage">
          <span className="text-success">+12.5%</span>
        </div>
      </div>
      <div className="stats-info" style={{ transform: 'translateZ(10px)' }}>
        <p className="stats-label text-secondary">{title}</p>
        <h2 className="stats-amount">
          ${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </h2>
      </div>
    </div>
  );
};

export default StatsCard;
