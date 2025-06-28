import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { exchangeCodeForToken, getSpotifyUserProfile } from '../utils/spotifyAuth';
import type { User, SpotifyTokens } from '../types';

interface SpotifyCallbackProps {
  onLogin: (user: User) => void;
}

const SpotifyCallback: React.FC<SpotifyCallbackProps> = ({ onLogin }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('Processing...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code');
        const error = searchParams.get('error');
        const state = searchParams.get('state');

        if (error) {
          setError('User denied access or an error occurred');
          setTimeout(() => navigate('/login'), 3000);
          return;
        }

        if (!code) {
          setError('No authorization code received');
          setTimeout(() => navigate('/login'), 3000);
          return;
        }

        setStatus('Exchanging code for tokens...');

        // Exchange authorization code for tokens
        const tokenData = await exchangeCodeForToken(code);
        
        setStatus('Getting user profile...');

        // Get user profile
        const userProfile = await getSpotifyUserProfile(tokenData.access_token);

        // Store tokens in localStorage
        localStorage.setItem('spotify_access_token', tokenData.access_token);
        localStorage.setItem('spotify_refresh_token', tokenData.refresh_token);
        localStorage.setItem('spotify_expires_at', (Date.now() + tokenData.expires_in * 1000).toString());

        setStatus('Login successful! Redirecting...');

        // Call the onLogin callback with user data
        onLogin(userProfile);

        // Navigate to dashboard
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);

      } catch (err) {
        console.error('Spotify callback error:', err);
        setError('Failed to authenticate with Spotify. Please try again.');
        setTimeout(() => navigate('/login'), 3000);
      }
    };

    handleCallback();
  }, [searchParams, navigate, onLogin]);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: '#ffffff'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        padding: '3rem',
        textAlign: 'center',
        maxWidth: '400px',
        width: '90%'
      }}>
        {error ? (
          <>
            <div style={{
              fontSize: '3rem',
              marginBottom: '1rem'
            }}>
              ❌
            </div>
            <h2 style={{
              fontSize: '1.5rem',
              marginBottom: '1rem',
              color: '#ff4757'
            }}>
              Authentication Failed
            </h2>
            <p style={{
              color: '#b0b0b0',
              marginBottom: '1rem'
            }}>
              {error}
            </p>
            <p style={{
              fontSize: '0.9rem',
              color: '#888'
            }}>
              Redirecting to login page...
            </p>
          </>
        ) : (
          <>
            <div style={{
              fontSize: '3rem',
              marginBottom: '1rem',
              animation: 'spin 2s linear infinite'
            }}>
              🎵
            </div>
            <h2 style={{
              fontSize: '1.5rem',
              marginBottom: '1rem',
              background: 'linear-gradient(135deg, #1DB954, #1ed760)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent'
            }}>
              Connecting to Spotify
            </h2>
            <p style={{
              color: '#b0b0b0'
            }}>
              {status}
            </p>
          </>
        )}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default SpotifyCallback;
