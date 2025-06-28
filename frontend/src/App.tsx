import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import SimpleLogin from './pages/SimpleLogin';
import Dashboard from './pages/Dashboard';
import { Mood, User } from './types';

function App() {
  // Development mode - set to false for production
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentMood, setCurrentMood] = useState<Mood>('happy');

  // Mock user for development
  const mockUser: User = {
    id: 'dev-user-123',
    display_name: 'Developer User',
    email: 'dev@example.com',
    images: [],
    country: 'US'
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const handleMoodChange = (mood: Mood) => {
    setCurrentMood(mood);
  };

  return (
    <ChakraProvider value={defaultSystem}>
      <Router>
        <motion.div
          style={{ minHeight: '100vh' }}
          key={currentMood} // Re-animate when mood changes
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Routes>
            <Route
              path="/login"
              element={
                !isAuthenticated ? (
                  <SimpleLogin />
                ) : (
                  <Navigate to="/dashboard" replace />
                )
              }
            />
            <Route
              path="/dashboard"
              element={
                isAuthenticated || isDevelopment ? (
                  <Dashboard
                    user={currentUser || (isDevelopment ? mockUser : undefined)}
                    currentMood={currentMood}
                    onMoodChange={handleMoodChange}
                    onLogout={handleLogout}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/"
              element={
                <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
              }
            />
          </Routes>
        </motion.div>
      </Router>
    </ChakraProvider>
  );
}

export default App;
