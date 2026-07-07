import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft } from 'lucide-react';

export default function Routine() {
  const [routines, setRoutines] = useState({
    wakeUp: '06:00',
    breakfast: '08:00',
    lunch: '13:00',
    dinner: '20:00'
  });
  const { updateRoutines } = useAuth();
  const navigate = useNavigate();

  const handleFinish = () => {
    updateRoutines(routines);
    navigate('/');
  };

  const handleChange = (e) => {
    setRoutines({ ...routines, [e.target.name]: e.target.value });
  };

  return (
    <div className="page-content" style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: '24px' }}>
      <header className="app-header" style={{ padding: '24px 0', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <ArrowLeft size={24} onClick={() => navigate(-1)} style={{ cursor: 'pointer', color: 'var(--primary)' }} />
        <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Daily Routine</h1>
      </header>

      <div style={{ marginBottom: '24px' }}>
        <p className="text-light">Set your typical timings. We use this to schedule your pill reminders accurately.</p>
      </div>

      <div className="card flex-col gap-4">
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="font-bold text-sm">Wake up time</label>
          <input type="time" name="wakeUp" value={routines.wakeUp} onChange={handleChange} />
        </div>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="font-bold text-sm">Breakfast</label>
          <input type="time" name="breakfast" value={routines.breakfast} onChange={handleChange} />
        </div>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="font-bold text-sm">Lunch</label>
          <input type="time" name="lunch" value={routines.lunch} onChange={handleChange} />
        </div>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="font-bold text-sm">Dinner</label>
          <input type="time" name="dinner" value={routines.dinner} onChange={handleChange} />
        </div>
      </div>

      <button onClick={handleFinish} style={{ width: '100%', padding: '16px', marginTop: 'auto' }}>
        Finish Setup
      </button>
    </div>
  );
}
