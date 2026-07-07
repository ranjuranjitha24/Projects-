import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import AddMedicine from './pages/AddMedicine';
import HealthProfile from './pages/HealthProfile';
import Login from './pages/Login';
import Insights from './pages/Insights';
import Welcome from './pages/Welcome';
import Onboarding from './pages/Onboarding';
import Routine from './pages/Routine';
import { AuthProvider, useAuth } from './context/AuthContext';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (user && !user.onboardingComplete) return <Navigate to="/welcome" />;
  return children;
}

function AppContent() {
  const { user } = useAuth();
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/routine" element={<Routine />} />
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/add" element={<ProtectedRoute><AddMedicine /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><HealthProfile /></ProtectedRoute>} />
          <Route path="/insights" element={<ProtectedRoute><Insights /></ProtectedRoute>} />
        </Routes>
        {user && user.onboardingComplete && <Navbar />}
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
