import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft } from 'lucide-react';

export default function Onboarding() {
  const [condition, setCondition] = useState('');
  const { updateCondition } = useAuth();
  const navigate = useNavigate();

  const handleNext = () => {
    if (!condition) return;
    updateCondition(condition);
    navigate('/routine');
  };

  const conditions = ["General Wellness", "Diabetes", "Blood Pressure", "Thyroid", "PCOS", "Other"];

  return (
    <div className="page-content" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <header className="app-header" style={{ padding: '24px 0', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <ArrowLeft size={24} onClick={() => navigate(-1)} style={{ cursor: 'pointer', color: 'var(--primary)' }} />
        <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Health Focus</h1>
      </header>

      <div style={{ marginBottom: '24px' }}>
        <p className="text-light">Select your primary health focus so we can tailor your insights and routines.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, overflowY: 'auto' }}>
        {conditions.map(c => (
          <div 
            key={c}
            onClick={() => setCondition(c)}
            className={`card ${condition === c ? 'primary' : ''}`}
            style={{ padding: '16px', cursor: 'pointer', margin: 0, border: condition === c ? 'none' : '1px solid #E5E7EB' }}
          >
            <span style={{ fontWeight: condition === c ? 'bold' : 'normal' }}>{c}</span>
          </div>
        ))}
      </div>

      <button 
        onClick={handleNext} 
        disabled={!condition}
        style={{ width: '100%', padding: '16px', marginTop: '16px', opacity: condition ? 1 : 0.5, cursor: condition ? 'pointer' : 'default' }}
      >
        Continue
      </button>
    </div>
  );
}
