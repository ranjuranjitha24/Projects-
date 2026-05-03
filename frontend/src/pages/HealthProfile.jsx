import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

export default function HealthProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="page-content">
      <header className="app-header" style={{ padding: '24px 0' }}>
        <h1 style={{ fontSize: '1.5rem' }}>Your Profile</h1>
      </header>

      <div className="card" style={{ textAlign: 'center', padding: '32px 16px', marginBottom: '24px' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 16px' }}>
          {user?.name?.charAt(0) || 'U'}
        </div>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '4px' }}>{user?.name}</h2>
        <p className="text-light">{user?.email}</p>
        <div style={{ marginTop: '16px', display: 'inline-block', background: 'rgba(18, 91, 80, 0.1)', color: 'var(--primary)', padding: '4px 12px', borderRadius: '99px', fontSize: '0.875rem', fontWeight: 'bold' }}>
          Condition: {user?.condition || 'Not set'}
        </div>
      </div>

      <button 
        onClick={handleLogout} 
        className="secondary" 
        style={{ width: '100%', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#EF4444', background: '#FEE2E2', border: 'none' }}
      >
        <LogOut size={20} />
        Logout
      </button>
    </div>
  );
}
