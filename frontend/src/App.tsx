import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import SimpleLogin from './pages/SimpleLogin';
import Dashboard from './pages/Dashboard';
import SpotifyCallback from './pages/SpotifyCallback';
import { Mood, User } from './types';
import { getSpotifyUserProfile } from './utils/spotifyAuth';

function App() {
  // Development mode - set to false for production
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentMood, setCurrentMood] = useState<Mood>('happy');
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing authentication on app load
  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = localStorage.getItem('spotify_access_token');
      const expiresAt = localStorage.getItem('spotify_expires_at');
      
      if (accessToken && expiresAt && Date.now() < parseInt(expiresAt)) {
        try {
          // Token is valid, get user profile
          const userProfile = await getSpotifyUserProfile(accessToken);
          setCurrentUser(userProfile);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Failed to get user profile:', error);
          // Clear invalid tokens
          localStorage.removeItem('spotify_access_token');
          localStorage.removeItem('spotify_refresh_token');
          localStorage.removeItem('spotify_expires_at');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

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
    // Clear Spotify tokens
    localStorage.removeItem('spotify_access_token');
    localStorage.removeItem('spotify_refresh_token');
    localStorage.removeItem('spotify_expires_at');
  };

  const handleMoodChange = (mood: Mood) => {
    setCurrentMood(mood);
  };

  // Show loading screen while checking authentication
  if (isLoading) {
    return (
      <ChakraProvider value={defaultSystem}>
        <div style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          color: '#ffffff'
        }}>
          <div style={{
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '3rem',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '1rem',
              animation: 'spin 2s linear infinite'
            }}>
              🎵
            </div>
            <h2 style={{
              fontSize: '1.5rem',
              marginBottom: '0.5rem'
            }}>
              MoodGroov
            </h2>
            <p style={{ opacity: 0.8 }}>Loading...</p>
          </div>
          <style>{`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </ChakraProvider>
    );
  }

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
              path="/callback"
              element={<SpotifyCallback onLogin={handleLogin} />}
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
