import React, { useState, useEffect } from 'react';
import type { Mood, User } from '../types';

// Export the interface to make it clear this is a module
export interface DashboardProps {
  user?: User;
  currentMood: Mood;
  onMoodChange: (mood: Mood) => void;
  onLogout: () => void;
}

// Advanced mood colors and themes with gradients
const moodThemes = {
  happy: {
    primary: '#FFD700',
    secondary: '#FFA500', 
    gradient: 'linear-gradient(135deg, #FFD700, #FFA500, #FF6347)',
    dark: '#FF8C00',
    glow: '#FFD70080'
  },
  sad: {
    primary: '#4682B4',
    secondary: '#6495ED',
    gradient: 'linear-gradient(135deg, #4682B4, #6495ED, #87CEEB)',
    dark: '#2F4F4F',
    glow: '#4682B480'
  },
  energetic: {
    primary: '#FF6B35',
    secondary: '#FF4500',
    gradient: 'linear-gradient(135deg, #FF6B35, #FF4500, #DC143C)',
    dark: '#B22222',
    glow: '#FF6B3580'
  },
  calm: {
    primary: '#2E8B57',
    secondary: '#3CB371',
    gradient: 'linear-gradient(135deg, #2E8B57, #3CB371, #98FB98)',
    dark: '#006400',
    glow: '#2E8B5780'
  },
  romantic: {
    primary: '#FF69B4',
    secondary: '#FF1493',
    gradient: 'linear-gradient(135deg, #FF69B4, #FF1493, #C71585)',
    dark: '#8B008B',
    glow: '#FF69B480'
  },
  angry: {
    primary: '#DC143C',
    secondary: '#B22222',
    gradient: 'linear-gradient(135deg, #DC143C, #B22222, #8B0000)',
    dark: '#800000',
    glow: '#DC143C80'
  },
  nostalgic: {
    primary: '#9370DB',
    secondary: '#8A2BE2',
    gradient: 'linear-gradient(135deg, #9370DB, #8A2BE2, #4B0082)',
    dark: '#4B0082',
    glow: '#9370DB80'
  },
  focused: {
    primary: '#4169E1',
    secondary: '#0000FF',
    gradient: 'linear-gradient(135deg, #4169E1, #0000FF, #1E90FF)',
    dark: '#000080',
    glow: '#4169E180'
  },
  party: {
    primary: '#FF1493',
    secondary: '#FF69B4',
    gradient: 'linear-gradient(135deg, #FF1493, #FF69B4, #FFB6C1)',
    dark: '#C71585',
    glow: '#FF149380'
  },
  chill: {
    primary: '#20B2AA',
    secondary: '#48D1CC',
    gradient: 'linear-gradient(135deg, #20B2AA, #48D1CC, #00CED1)',
    dark: '#008B8B',
    glow: '#20B2AA80'
  }
};

// Enhanced mock data with album art and popularity
const mockTracks = [
  { 
    id: '1', 
    name: 'Good Vibes Only', 
    artist: 'Sunshine Band', 
    duration: '3:45', 
    mood: 'happy',
    albumArt: '🌞',
    popularity: 95,
    plays: '2.5M'
  },
  { 
    id: '2', 
    name: 'Midnight Blues', 
    artist: 'Blue Notes', 
    duration: '4:12', 
    mood: 'sad',
    albumArt: '🌙',
    popularity: 88,
    plays: '1.8M'
  },
  { 
    id: '3', 
    name: 'Energy Boost', 
    artist: 'Power Beats', 
    duration: '2:58', 
    mood: 'energetic',
    albumArt: '⚡',
    popularity: 92,
    plays: '3.2M'
  },
  { 
    id: '4', 
    name: 'Ocean Waves', 
    artist: 'Calm Sounds', 
    duration: '5:30', 
    mood: 'calm',
    albumArt: '🌊',
    popularity: 85,
    plays: '1.2M'
  },
  { 
    id: '5', 
    name: 'Love Song', 
    artist: 'Romance Kings', 
    duration: '3:22', 
    mood: 'romantic',
    albumArt: '💕',
    popularity: 90,
    plays: '2.1M'
  }
];

// Particle animation for background
const ParticleEffect = ({ mood }: { mood: Mood }) => {
  const particles = Array.from({ length: 15 }, (_, i) => (
    <div
      key={i}
      style={{
        position: 'absolute',
        width: `${Math.random() * 4 + 2}px`,
        height: `${Math.random() * 4 + 2}px`,
        background: moodThemes[mood].primary,
        borderRadius: '50%',
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animation: `float ${Math.random() * 3 + 2}s ease-in-out infinite alternate`,
        opacity: 0.6,
        boxShadow: `0 0 10px ${moodThemes[mood].glow}`
      }}
    />
  ));
  
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
      {particles}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            100% { transform: translateY(-10px) rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

// Main Dashboard component
const Dashboard: React.FC<DashboardProps> = ({ user, currentMood, onMoodChange, onLogout }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(mockTracks[0]);
  const [volume, setVolume] = useState(75);
  const [activeSection, setActiveSection] = useState('home');

  const moods: Mood[] = ['happy', 'sad', 'energetic', 'calm', 'romantic', 'angry', 'nostalgic', 'focused', 'party', 'chill'];
  const currentTheme = moodThemes[currentMood];

  useEffect(() => {
    // Add custom CSS animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }
      @keyframes slideIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes glow {
        0% { box-shadow: 0 0 20px ${currentTheme.glow}; }
        50% { box-shadow: 0 0 40px ${currentTheme.glow}, 0 0 60px ${currentTheme.glow}; }
        100% { box-shadow: 0 0 20px ${currentTheme.glow}; }
      }
      .playing-animation {
        animation: pulse 2s infinite;
      }
      .card-enter {
        animation: slideIn 0.6s ease-out;
      }
      .glow-effect {
        animation: glow 3s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, [currentTheme]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTrackSelect = (track: any) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const styles = {
    dashboard: {
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${currentTheme.primary}20 0%, ${currentTheme.primary}10 100%)`,
      fontFamily: 'Arial, sans-serif',
      color: '#333'
    },
    header: {
      background: 'rgba(255, 255, 255, 0.95)',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      backdropFilter: 'blur(10px)'
    },
    logo: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      color: currentTheme.primary
    },
    userInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    mainContent: {
      display: 'grid',
      gridTemplateColumns: '1fr 350px',
      gap: '2rem',
      padding: '2rem',
      maxWidth: '1400px',
      margin: '0 auto'
    },
    leftColumn: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '2rem'
    },
    rightColumn: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '2rem'
    },
    card: {
      background: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '15px',
      padding: '1.5rem',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      backdropFilter: 'blur(10px)'
    },
    moodSelector: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
      gap: '1rem',
      marginTop: '1rem'
    },
    moodButton: {
      padding: '0.75rem 1rem',
      border: 'none',
      borderRadius: '25px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: 'bold',
      transition: 'all 0.3s ease',
      textTransform: 'capitalize' as const
    },
    activeMoodButton: {
      background: currentTheme.primary,
      color: 'white',
      transform: 'scale(1.05)'
    },
    inactiveMoodButton: {
      background: 'rgba(0,0,0,0.1)',
      color: '#666'
    },
    playerCard: {
      background: `linear-gradient(135deg, ${currentTheme.primary}30, ${currentTheme.primary}10)`,
      border: `2px solid ${currentTheme.primary}30`
    },
    playerControls: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      marginTop: '1rem'
    },
    playButton: {
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      border: 'none',
      background: currentTheme.primary,
      color: 'white',
      fontSize: '1.5rem',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease'
    },
    controlButton: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      border: 'none',
      background: 'rgba(0,0,0,0.1)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    trackList: {
      maxHeight: '400px',
      overflowY: 'auto' as const
    },
    track: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.75rem',
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      marginBottom: '0.5rem'
    },
    activeTrack: {
      background: `${currentTheme.primary}20`,
      border: `1px solid ${currentTheme.primary}40`
    },
    inactiveTrack: {
      background: 'rgba(0,0,0,0.02)'
    },
    volumeControl: {
      width: '100%',
      marginTop: '1rem'
    },
    slider: {
      width: '100%',
      height: '4px',
      borderRadius: '2px',
      background: 'rgba(0,0,0,0.2)',
      appearance: 'none' as const,
      outline: 'none'
    },
    button: {
      padding: '0.75rem 1.5rem',
      border: 'none',
      borderRadius: '25px',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: 'bold',
      transition: 'all 0.3s ease'
    },
    logoutButton: {
      background: '#ff4757',
      color: 'white'
    }
  };

  return (
    <div style={styles.dashboard}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logo}>🎵 MoodGroov</div>
        <div style={styles.userInfo}>
          <span>Welcome, {user?.display_name || 'User'}!</span>
          <button 
            style={{...styles.button, ...styles.logoutButton}}
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Left Column */}
        <div style={styles.leftColumn}>
          {/* Mood Selector */}
          <div style={styles.card}>
            <h2 style={{margin: '0 0 1rem 0', color: currentTheme.primary}}>
              Select Your Mood
            </h2>
            <p>Current mood: <strong style={{color: currentTheme.primary}}>{currentMood}</strong></p>
            <div style={styles.moodSelector}>
              {moods.map(mood => (
                <button
                  key={mood}
                  style={{
                    ...styles.moodButton,
                    ...(mood === currentMood ? styles.activeMoodButton : styles.inactiveMoodButton),
                    ...(mood === currentMood ? {} : {background: `${moodThemes[mood].primary}20`, color: moodThemes[mood].primary})
                  }}
                  onClick={() => onMoodChange(mood)}
                >
                  {mood}
                </button>
              ))}
            </div>
          </div>

          {/* Music Player */}
          <div style={{...styles.card, ...styles.playerCard}}>
            <h2 style={{margin: '0 0 1rem 0', color: currentTheme.primary}}>
              Now Playing
            </h2>
            <div style={{textAlign: 'center'}}>
              <h3 style={{margin: '0.5rem 0', fontSize: '1.3rem'}}>{currentTrack.name}</h3>
              <p style={{margin: '0.5rem 0', color: '#666'}}>{currentTrack.artist}</p>
              <p style={{margin: '0.5rem 0', fontSize: '0.9rem', color: '#888'}}>{currentTrack.duration}</p>
            </div>
            
            <div style={styles.playerControls}>
              <button style={styles.controlButton}>⏮️</button>
              <button 
                style={styles.playButton}
                onClick={handlePlayPause}
              >
                {isPlaying ? '⏸️' : '▶️'}
              </button>
              <button style={styles.controlButton}>⏭️</button>
            </div>

            <div style={styles.volumeControl}>
              <label style={{fontSize: '0.9rem', color: '#666'}}>Volume: {volume}%</label>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                style={styles.slider}
              />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div style={styles.rightColumn}>
          {/* Track List */}
          <div style={styles.card}>
            <h2 style={{margin: '0 0 1rem 0', color: currentTheme.primary}}>
              Recommended Tracks
            </h2>
            <div style={styles.trackList}>
              {mockTracks.map(track => (
                <div
                  key={track.id}
                  style={{
                    ...styles.track,
                    ...(track.id === currentTrack.id ? styles.activeTrack : styles.inactiveTrack)
                  }}
                  onClick={() => handleTrackSelect(track)}
                >
                  <div>
                    <div style={{fontWeight: 'bold'}}>{track.name}</div>
                    <div style={{fontSize: '0.9rem', color: '#666'}}>{track.artist}</div>
                  </div>
                  <div style={{fontSize: '0.9rem', color: '#888'}}>
                    {track.duration}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Card */}
          <div style={styles.card}>
            <h2 style={{margin: '0 0 1rem 0', color: currentTheme.primary}}>
              Your Stats
            </h2>
            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <span>Songs played today:</span>
                <strong>24</strong>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <span>Favorite mood:</span>
                <strong style={{color: currentTheme.primary}}>{currentMood}</strong>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <span>Time listened:</span>
                <strong>2h 45m</strong>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <span>Playlists created:</span>
                <strong>7</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Default export
export default Dashboard;

// Empty export to ensure this file is treated as a module
export {};
