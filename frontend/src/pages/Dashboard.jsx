import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AlarmManager from '../components/AlarmManager';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const [showMotivation, setShowMotivation] = useState(false);
  const [alarmActive, setAlarmActive] = useState(false);
  const [alarmMessage, setAlarmMessage] = useState("Time for your medicine!");
  
  const { user, medicines, markMedicineTaken } = useAuth();
  const navigate = useNavigate();

  // Background Clock Logic for Phase 6
  useEffect(() => {
    const checkAlarms = setInterval(() => {
      const now = new Date();
      // Format time to HH:MM to match the HTML <input type="time"> format
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const currentTime = `${hours}:${minutes}`;

      if (medicines && medicines.length > 0) {
        medicines.forEach(med => {
          if (!med.taken && med.time === currentTime) {
            setAlarmMessage(`Time to take: ${med.name}`);
            setAlarmActive(true);
          }
        });
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(checkAlarms);
  }, [medicines]);

  const handleTakePill = (id) => {
    markMedicineTaken(id);
    setAlarmActive(false); // Stop alarm if ringing
    setShowMotivation(true);
    setTimeout(() => setShowMotivation(false), 4000);
  };

  const hasMedicines = medicines && medicines.length > 0;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="page-content">
      <AlarmManager triggerAlarm={alarmActive} message={alarmMessage} />
      
      {showMotivation && (
        <div style={{ position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', background: '#10B981', color: 'white', padding: '12px 24px', borderRadius: '99px', boxShadow: '0 4px 20px rgba(16, 185, 129, 0.4)', zIndex: 100, animation: 'fadeIn 0.3s ease-out' }}>
          Great job! Keep going and be healthy! 🎉
        </div>
      )}

      <header className="app-header" style={{ padding: '24px 0' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>{getGreeting()}, {user?.name?.split(' ')[0] || 'User'}</h1>
          <p className="text-light text-sm">Stay on track with your health</p>
        </div>
        <div className="profile-pic">{user?.name?.charAt(0) || 'U'}</div>
      </header>

      {!hasMedicines ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', textAlign: 'center', marginTop: '40px' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(18, 91, 80, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
            <PlusCircle size={40} color="var(--primary)" />
          </div>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>No medicines yet</h2>
          <p className="text-light mb-4">Add your first medicine to start tracking your health journey.</p>
          <button onClick={() => navigate('/add')} style={{ padding: '12px 24px' }}>
            Add Medicine
          </button>
        </div>
      ) : (
        <>
          <section className="mb-4">
            <h2 style={{ fontSize: '1.125rem', marginBottom: '12px' }}>Your Medicines</h2>
            
            {medicines.map(med => (
              <div key={med.id} className={`card primary ${med.taken ? 'taken-state' : ''}`} style={med.taken ? { filter: 'grayscale(1)', opacity: 0.8, marginBottom: '16px' } : { marginBottom: '16px' }}>
                <div className="flex-between">
                  <div>
                    <h3 style={{ fontSize: '1.25rem', textDecoration: med.taken ? 'line-through' : 'none' }}>{med.name} - {med.dosage}</h3>
                    <p className="text-light" style={{ marginTop: '4px' }}>{med.foodRelation} • {med.condition}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{med.time || '--:--'}</div>
                    <Clock size={16} color="rgba(255,255,255,0.8)" style={{ display: 'inline', marginTop: '4px' }} />
                  </div>
                </div>
                <div className="flex-between mt-4">
                  <span className="font-bold">Scheduled</span>
                  <button 
                    onClick={() => handleTakePill(med.id)}
                    disabled={med.taken}
                    style={{ background: med.taken ? 'transparent' : 'rgba(255,255,255,0.2)', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px', cursor: med.taken ? 'default' : 'pointer' }}
                  >
                    <CheckCircle size={18} />
                    {med.taken ? 'Taken' : 'Take Now'}
                  </button>
                </div>
              </div>
            ))}
          </section>
        </>
      )}
    </div>
  );
}
