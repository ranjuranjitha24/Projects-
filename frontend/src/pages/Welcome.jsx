import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="page-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: '0 24px', textAlign: 'center' }}>
      <div style={{ marginBottom: '40px', animation: 'fadeIn 0.8s ease-out' }}>
        <h1 style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '16px' }}>Welcome!</h1>
        <p className="text-light" style={{ fontSize: '1.125rem', lineHeight: '1.5' }}>
          We are so glad you are here. Let's build a healthier, happier you together. 
        </p>
      </div>
      
      <button onClick={() => navigate('/onboarding')} style={{ width: '100%', padding: '16px', fontSize: '1.125rem' }}>
        Let's Get Started
      </button>
    </div>
  );
}
