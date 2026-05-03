import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [medicines, setMedicines] = useState([]);

  const login = (userData) => {
    setUser({ ...userData, condition: '', routines: {}, onboardingComplete: false });
  };

  const updateCondition = (condition) => {
    setUser(prev => ({ ...prev, condition }));
  };

  const updateRoutines = (routines) => {
    setUser(prev => ({ ...prev, routines, onboardingComplete: true }));
  };

  const addMedicine = (med) => {
    setMedicines(prev => [...prev, { ...med, id: Date.now(), taken: false }]);
  };

  const markMedicineTaken = (id) => {
    setMedicines(prev => prev.map(m => m.id === id ? { ...m, taken: true } : m));
  };

  const logout = () => {
    setUser(null);
    setMedicines([]);
  };

  return (
    <AuthContext.Provider value={{ user, medicines, login, updateCondition, updateRoutines, addMedicine, markMedicineTaken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
