import React from 'react';
import './App.css';

function App() {
  return (
    <div style={{
      minHeight: '100vh',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#000',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Your Video Background */}
      <video
        autoPlay
        loop
        muted
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1
        }}
      >
        <source src="/videos/3196427-uhd_3840_2160_25fps.mp4" type="video/mp4" />
      </video>

      {/* Simple Overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1
      }} />

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        padding: '40px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)'
      }}>
        <h1 style={{
          fontSize: '4rem',
          margin: '0 0 20px 0',
          background: 'linear-gradient(45deg, #00d4ff, #ff6b9d)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          MoodGroov
        </h1>

        <p style={{
          fontSize: '1.2rem',
          margin: '0 0 30px 0',
          maxWidth: '500px'
        }}>
          Enter a realm where AI reads your soul and curates the perfect sonic landscape
        </p>

        <button style={{
          fontSize: '1.2rem',
          padding: '15px 40px',
          background: 'linear-gradient(45deg, #1DB954, #1ed760)',
          color: 'white',
          border: 'none',
          borderRadius: '50px',
          cursor: 'pointer',
          boxShadow: '0 10px 25px rgba(29, 185, 84, 0.3)',
          transition: 'transform 0.2s ease'
        }}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          🎵 Enter the MoodGroov Universe
        </button>
      </div>
    </div>
  );
}

export default App;
