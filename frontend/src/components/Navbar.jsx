import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, PlusCircle, Settings, Activity } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <nav className="bottom-nav">
      <Link to="/" className={`nav-item ${path === '/' ? 'active' : ''}`}>
        <Home size={24} />
        <span>Home</span>
      </Link>
      <Link to="/add" className={`nav-item ${path === '/add' ? 'active' : ''}`}>
        <PlusCircle size={24} />
        <span>Add</span>
      </Link>
      <Link to="/insights" className={`nav-item ${path === '/insights' ? 'active' : ''}`}>
        <Activity size={24} />
        <span>Insights</span>
      </Link>
      <Link to="/profile" className={`nav-item ${path === '/profile' ? 'active' : ''}`}>
        <Settings size={24} />
        <span>Profile</span>
      </Link>
    </nav>
  );
}
