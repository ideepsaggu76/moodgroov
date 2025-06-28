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
    dark: '#8B0000',
    glow: '#DC143C80'
  },
  nostalgic: {
    primary: '#9370DB',
    secondary: '#8A2BE2',
    gradient: 'linear-gradient(135deg, #9370DB, #8A2BE2, #9400D3)',
    dark: '#4B0082',
    glow: '#9370DB80'
  },
  focused: {
    primary: '#4169E1',
    secondary: '#6495ED',
    gradient: 'linear-gradient(135deg, #4169E1, #6495ED, #87CEEB)',
    dark: '#191970',
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
    gradient: 'linear-gradient(135deg, #20B2AA, #48D1CC, #AFEEEE)',
    dark: '#008B8B',
    glow: '#20B2AA80'
  }
};

// Enhanced mock data for demonstration
const mockTracks = [
  { 
    id: '1', 
    name: 'Good Vibes Only', 
    artist: 'Sunshine Band', 
    duration: '3:45', 
    mood: 'happy',
    albumArt: '🌞',
    popularity: 95,
    plays: '2.1M'
  },
  { 
    id: '2', 
    name: 'Midnight Blues', 
    artist: 'Blue Notes', 
    duration: '4:12', 
    mood: 'sad',
    albumArt: '🌙',
    popularity: 78,
    plays: '1.5M'
  },
  { 
    id: '3', 
    name: 'Energy Boost', 
    artist: 'Power Beats', 
    duration: '2:58', 
    mood: 'energetic',
    albumArt: '⚡',
    popularity: 89,
    plays: '3.2M'
  },
  { 
    id: '4', 
    name: 'Ocean Waves', 
    artist: 'Calm Sounds', 
    duration: '5:30', 
    mood: 'calm',
    albumArt: '🌊',
    popularity: 82,
    plays: '1.8M'
  },
  { 
    id: '5', 
    name: 'Love Song', 
    artist: 'Romance Kings', 
    duration: '3:22', 
    mood: 'romantic',
    albumArt: '💕',
    popularity: 91,
    plays: '2.7M'
  }
];

// Particle background component
const ParticleEffect: React.FC<{ theme: any }> = ({ theme }) => {
  const particles = Array.from({ length: 20 }, (_, i) => (
    <div
      key={i}
      style={{
        position: 'absolute',
        width: Math.random() * 4 + 2 + 'px',
        height: Math.random() * 4 + 2 + 'px',
        background: theme.primary,
        borderRadius: '50%',
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        opacity: Math.random() * 0.3 + 0.1,
        animation: `float ${Math.random() * 3 + 2}s ease-in-out infinite ${Math.random() * 2}s`
      }}
    />
  ));

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
      {particles}
    </div>
  );
};

// Main Dashboard component
const Dashboard: React.FC<DashboardProps> = ({ user, currentMood, onMoodChange, onLogout }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(mockTracks[0]);
  const [volume, setVolume] = useState(75);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const moods: Mood[] = ['happy', 'sad', 'energetic', 'calm', 'romantic', 'angry', 'nostalgic', 'focused', 'party', 'chill'];
  const currentTheme = moodThemes[currentMood];

  // Add CSS animations and styles
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
      
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        33% { transform: translateY(-10px) rotate(1deg); }
        66% { transform: translateY(-5px) rotate(-1deg); }
      }
      
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
      
      @keyframes slideIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes glow {
        0%, 100% { box-shadow: 0 0 20px ${currentTheme.glow}; }
        50% { box-shadow: 0 0 40px ${currentTheme.glow}, 0 0 60px ${currentTheme.glow}; }
      }
      
      @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      
      .glassmorphic {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      }
      
      .playing-animation { animation: pulse 2s infinite; }
      .card-enter { animation: slideIn 0.6s ease-out; }
      .glow-effect { animation: glow 3s ease-in-out infinite; }
      .gradient-bg { animation: gradientShift 6s ease infinite; }
      .floating-element { animation: float 3s ease-in-out infinite; }
      
      .sidebar-item {
        transition: all 0.3s ease;
        border-radius: 12px;
        margin: 4px 0;
      }
      
      .sidebar-item:hover {
        background: rgba(255, 255, 255, 0.1);
        transform: translateX(4px);
      }
      
      .track-item {
        transition: all 0.3s ease;
        border-radius: 12px;
      }
      
      .track-item:hover {
        background: rgba(255, 255, 255, 0.05);
        transform: translateY(-2px);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
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
      background: `linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)`,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: '#ffffff',
      display: 'flex',
      position: 'relative' as const,
      overflow: 'hidden'
    },
    sidebar: {
      width: sidebarCollapsed ? '80px' : '280px',
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(20px)',
      borderRight: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '2rem 1rem',
      display: 'flex',
      flexDirection: 'column' as const,
      transition: 'all 0.3s ease',
      zIndex: 10
    },
    logo: {
      fontSize: '1.8rem',
      fontWeight: '700',
      background: currentTheme.gradient,
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      color: 'transparent',
      marginBottom: '2rem',
      textAlign: sidebarCollapsed ? ('center' as const) : ('left' as const)
    },
    sidebarItem: {
      padding: '12px 16px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      fontSize: '0.95rem',
      fontWeight: '500',
      color: '#b0b0b0',
      borderRadius: '12px',
      margin: '4px 0',
      transition: 'all 0.3s ease'
    },
    activeSidebarItem: {
      background: `linear-gradient(135deg, ${currentTheme.primary}20, ${currentTheme.primary}10)`,
      color: currentTheme.primary,
      border: `1px solid ${currentTheme.primary}30`
    },
    mainContent: {
      flex: 1,
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '2rem',
      overflowY: 'auto' as const,
      zIndex: 1
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem'
    },
    welcomeText: {
      fontSize: '2rem',
      fontWeight: '600',
      background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      color: 'transparent'
    },
    userProfile: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '20px',
      padding: '8px 16px'
    },
    contentGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 400px',
      gap: '2rem',
      height: 'calc(100vh - 200px)'
    },
    card: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '20px',
      padding: '2rem',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease'
    },
    cardHeader: {
      fontSize: '1.3rem',
      fontWeight: '600',
      marginBottom: '1.5rem',
      color: currentTheme.primary,
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    moodGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
      gap: '1rem'
    },
    moodButton: {
      padding: '1rem',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '600',
      textTransform: 'capitalize' as const,
      transition: 'all 0.3s ease',
      background: 'rgba(255, 255, 255, 0.05)',
      color: '#b0b0b0'
    },
    activeMoodButton: {
      background: currentTheme.gradient,
      color: 'white',
      transform: 'scale(1.05)',
      boxShadow: `0 8px 25px ${currentTheme.glow}`
    },
    nowPlayingCard: {
      background: `linear-gradient(135deg, ${currentTheme.primary}15, ${currentTheme.secondary}10)`,
      border: `1px solid ${currentTheme.primary}30`,
      textAlign: 'center' as const
    },
    albumArt: {
      fontSize: '4rem',
      marginBottom: '1rem'
    },
    trackTitle: {
      fontSize: '1.5rem',
      fontWeight: '600',
      marginBottom: '0.5rem',
      color: '#ffffff'
    },
    trackArtist: {
      fontSize: '1rem',
      color: '#b0b0b0',
      marginBottom: '2rem'
    },
    playerControls: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      marginBottom: '2rem'
    },
    playButton: {
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      border: 'none',
      background: currentTheme.gradient,
      color: 'white',
      fontSize: '1.5rem',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease',
      boxShadow: `0 8px 25px ${currentTheme.glow}`
    },
    controlButton: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      border: 'none',
      background: 'rgba(255, 255, 255, 0.1)',
      color: '#ffffff',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease'
    },
    trackList: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0.5rem',
      maxHeight: '400px',
      overflowY: 'auto' as const
    },
    trackItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '1rem',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      background: 'rgba(255, 255, 255, 0.02)'
    },
    activeTrackItem: {
      background: `linear-gradient(135deg, ${currentTheme.primary}20, ${currentTheme.primary}10)`,
      border: `1px solid ${currentTheme.primary}30`
    },
    trackAlbumArt: {
      fontSize: '2rem',
      width: '40px',
      textAlign: 'center' as const
    },
    trackInfo: {
      flex: 1
    },
    trackName: {
      fontWeight: '600',
      color: '#ffffff',
      marginBottom: '0.25rem'
    },
    trackArtistSmall: {
      fontSize: '0.85rem',
      color: '#b0b0b0'
    },
    trackStats: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'flex-end',
      gap: '0.25rem'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '1.5rem'
    },
    statItem: {
      textAlign: 'center' as const,
      padding: '1.5rem',
      background: 'rgba(255, 255, 255, 0.03)',
      borderRadius: '16px',
      border: '1px solid rgba(255, 255, 255, 0.05)'
    },
    statValue: {
      fontSize: '2rem',
      fontWeight: '700',
      color: currentTheme.primary,
      marginBottom: '0.5rem'
    },
    statLabel: {
      fontSize: '0.9rem',
      color: '#b0b0b0'
    },
    logoutButton: {
      background: 'linear-gradient(135deg, #ff4757, #ff3742)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      padding: '8px 16px',
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'all 0.3s ease'
    }
  };

  const sidebarItems = [
    { icon: '🏠', label: 'Home', active: true },
    { icon: '🎵', label: 'My Music', active: false },
    { icon: '📊', label: 'Analytics', active: false },
    { icon: '❤️', label: 'Liked Songs', active: false },
    { icon: '🎧', label: 'Playlists', active: false },
    { icon: '⚙️', label: 'Settings', active: false }
  ];

  return (
    <div style={styles.dashboard}>
      <ParticleEffect theme={currentTheme} />
      
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.logo}>
          {sidebarCollapsed ? '🎵' : '🎵 MoodGroov'}
        </div>
        
        <div style={{ marginBottom: '2rem' }}>
          {sidebarItems.map((item, index) => (
            <div
              key={index}
              style={{
                ...styles.sidebarItem,
                ...(item.active ? styles.activeSidebarItem : {})
              }}
              className="sidebar-item"
            >
              <span>{item.icon}</span>
              {!sidebarCollapsed && <span>{item.label}</span>}
            </div>
          ))}
        </div>
        
        <div style={{ marginTop: 'auto' }}>
          <button 
            style={styles.logoutButton}
            onClick={onLogout}
          >
            {sidebarCollapsed ? '🚪' : 'Logout'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <div style={styles.welcomeText}>
              Welcome back, {user?.display_name || 'User'}!
            </div>
            <p style={{ color: '#b0b0b0', margin: '0.5rem 0 0 0' }}>
              Discover music that matches your mood
            </p>
          </div>
          <div style={styles.userProfile}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              background: currentTheme.gradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem'
            }}>
              👤
            </div>
            <div>
              <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>
                {user?.display_name || 'User'}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#b0b0b0' }}>
                Premium Member
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div style={styles.contentGrid}>
          {/* Mood Selector */}
          <div style={styles.card} className="card-enter">
            <div style={styles.cardHeader}>
              🎭 Select Your Mood
            </div>
            <div style={styles.moodGrid}>
              {moods.map(mood => (
                <button
                  key={mood}
                  style={{
                    ...styles.moodButton,
                    ...(mood === currentMood ? styles.activeMoodButton : {})
                  }}
                  onClick={() => onMoodChange(mood)}
                  className={mood === currentMood ? 'glow-effect' : ''}
                >
                  {mood}
                </button>
              ))}
            </div>
            
            <div style={{ marginTop: '2rem', textAlign: 'center' as const }}>
              <p style={{ color: '#b0b0b0', marginBottom: '1rem' }}>Current Mood</p>
              <div style={{
                background: currentTheme.gradient,
                borderRadius: '20px',
                padding: '1rem',
                fontSize: '1.2rem',
                fontWeight: '600',
                textTransform: 'capitalize' as const
              }}>
                {currentMood}
              </div>
            </div>
          </div>

          {/* Track List */}
          <div style={styles.card} className="card-enter">
            <div style={styles.cardHeader}>
              🎶 Recommended Tracks
            </div>
            <div style={styles.trackList}>
              {mockTracks.map(track => (
                <div
                  key={track.id}
                  style={{
                    ...styles.trackItem,
                    ...(track.id === currentTrack.id ? styles.activeTrackItem : {})
                  }}
                  className="track-item"
                  onClick={() => handleTrackSelect(track)}
                >
                  <div style={styles.trackAlbumArt}>{track.albumArt}</div>
                  <div style={styles.trackInfo}>
                    <div style={styles.trackName}>{track.name}</div>
                    <div style={styles.trackArtistSmall}>{track.artist}</div>
                  </div>
                  <div style={styles.trackStats}>
                    <div style={{ fontSize: '0.8rem', color: '#b0b0b0' }}>
                      {track.duration}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: currentTheme.primary }}>
                      {track.plays}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Now Playing & Stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Now Playing */}
            <div style={{...styles.card, ...styles.nowPlayingCard}} className="card-enter">
              <div style={styles.cardHeader}>
                🎵 Now Playing
              </div>
              <div style={styles.albumArt} className="floating-element">
                {currentTrack.albumArt}
              </div>
              <div style={styles.trackTitle}>{currentTrack.name}</div>
              <div style={styles.trackArtist}>{currentTrack.artist}</div>
              
              <div style={styles.playerControls}>
                <button style={styles.controlButton}>⏮️</button>
                <button 
                  style={styles.playButton}
                  onClick={handlePlayPause}
                  className={isPlaying ? 'playing-animation' : ''}
                >
                  {isPlaying ? '⏸️' : '▶️'}
                </button>
                <button style={styles.controlButton}>⏭️</button>
              </div>

              <div style={{ width: '100%' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  fontSize: '0.8rem', 
                  color: '#b0b0b0',
                  marginBottom: '0.5rem'
                }}>
                  <span>1:23</span>
                  <span>3:45</span>
                </div>
                <div style={{
                  width: '100%',
                  height: '4px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '2px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: '35%',
                    height: '100%',
                    background: currentTheme.gradient,
                    borderRadius: '2px'
                  }} />
                </div>
              </div>
            </div>

            {/* Stats */}
            <div style={styles.card} className="card-enter">
              <div style={styles.cardHeader}>
                📊 Your Stats
              </div>
              <div style={styles.statsGrid}>
                <div style={styles.statItem}>
                  <div style={styles.statValue}>24</div>
                  <div style={styles.statLabel}>Songs Today</div>
                </div>
                <div style={styles.statItem}>
                  <div style={styles.statValue}>2h 45m</div>
                  <div style={styles.statLabel}>Time Listened</div>
                </div>
                <div style={styles.statItem}>
                  <div style={styles.statValue}>7</div>
                  <div style={styles.statLabel}>Playlists</div>
                </div>
                <div style={styles.statItem}>
                  <div style={styles.statValue}>156</div>
                  <div style={styles.statLabel}>Favorite Songs</div>
                </div>
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
