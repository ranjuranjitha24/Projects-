import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AddMedicine() {
  const navigate = useNavigate();
  const { user, addMedicine } = useAuth();
  
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [alarmTime, setAlarmTime] = useState('');
  const [condition, setCondition] = useState(user?.condition || 'General Wellness');
  const [customCondition, setCustomCondition] = useState('');
  const [foodRelation, setFoodRelation] = useState('After Food');

  const handleSave = (e) => {
    e.preventDefault();
    if (!name || !dosage || !alarmTime) return;

    const finalCondition = condition === 'Other' ? customCondition : condition;
    
    addMedicine({
      name,
      dosage,
      time: alarmTime,
      condition: finalCondition,
      foodRelation
    });
    
    navigate('/');
  };

  return (
    <div className="page-content">
      <header className="app-header" style={{ padding: '24px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <ArrowLeft size={24} onClick={() => navigate(-1)} style={{ cursor: 'pointer' }} />
          <h1 style={{ fontSize: '1.5rem' }}>Add Medicine</h1>
        </div>
      </header>

      <form onSubmit={handleSave}>
        <div className="card">
          <div className="form-group">
            <label className="font-bold text-sm">Medicine Name</label>
            <input type="text" placeholder="e.g. Metformin" value={name} onChange={e => setName(e.target.value)} required />
          </div>

          <div className="form-group">
            <label className="font-bold text-sm">Dosage</label>
            <input type="text" placeholder="e.g. 500mg" value={dosage} onChange={e => setDosage(e.target.value)} required />
          </div>

          <div className="form-group">
            <label className="font-bold text-sm">Alarm Time</label>
            <input type="time" value={alarmTime} onChange={e => setAlarmTime(e.target.value)} required />
          </div>

          <div className="form-group">
            <label className="font-bold text-sm">Health Condition</label>
            <select value={condition} onChange={e => setCondition(e.target.value)}>
              <option>General Wellness</option>
              <option>Diabetes</option>
              <option>Blood Pressure</option>
              <option>Thyroid</option>
              <option>PCOS</option>
              <option>Other</option>
            </select>
            {condition === 'Other' && (
              <input 
                type="text" 
                placeholder="Type your condition here..." 
                value={customCondition}
                onChange={e => setCustomCondition(e.target.value)}
                style={{ marginTop: '8px' }} 
              />
            )}
            <p className="text-light text-sm" style={{ marginTop: '4px' }}>
              We'll optimize reminder times based on condition guidelines.
            </p>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="font-bold text-sm">Food Relation</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginTop: '8px' }}>
              {['Before Food', 'After Food', 'Empty Stomach'].map(rel => (
                <div 
                  key={rel}
                  onClick={() => setFoodRelation(rel)}
                  style={{ 
                    padding: '8px', 
                    textAlign: 'center', 
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    background: foodRelation === rel ? 'var(--primary)' : '#F3F4F6',
                    color: foodRelation === rel ? 'white' : 'var(--text)',
                    fontWeight: foodRelation === rel ? 'bold' : 'normal'
                  }}
                >
                  {rel}
                </div>
              ))}
            </div>
          </div>
        </div>

        <button type="submit" style={{ width: '100%', marginTop: '24px', padding: '16px' }}>
          Save Medicine
        </button>
      </form>
    </div>
  );
}
