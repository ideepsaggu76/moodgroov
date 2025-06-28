import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMusic,
  faHeart,
  faMagic,
  faPalette,
  faLanguage,
  faMicrophone,
  faPlay
} from '@fortawesome/free-solid-svg-icons';

const LoginPageEnhanced: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const features = [
    { icon: faMusic, title: "AI Mood Detection", description: "Smart algorithms that understand your emotional state", color: "#00d4ff" },
    { icon: faHeart, title: "Emotion-Driven Playlists", description: "Curated soundtracks that evolve with your feelings", color: "#ff6b9d" },
    { icon: faPalette, title: "Dynamic Visual Themes", description: "Immersive UI that transforms based on your mood", color: "#c77dff" },
    { icon: faLanguage, title: "Global Music Discovery", description: "Explore emotions through music from every culture", color: "#7209b7" },
    { icon: faMicrophone, title: "Voice Mood Analysis", description: "Speak your feelings and let AI find the perfect match", color: "#ffd23f" },
    { icon: faMagic, title: "Predictive Recommendations", description: "Machine learning that anticipates your next journey", color: "#06ffa5" }
  ];

  // Feature rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  const handleSpotifyLogin = () => {
    console.log('Entering the MoodGroov universe...');
  };

  return (
    <div style={{
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: '"DM Sans", -apple-system, BlinkMacSystemFont, sans-serif'
    }}>
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
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

      {/* Dark Overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.6)',
        zIndex: 1
      }} />

      {/* Floating Elements */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 2 }}>
        {/* Simple particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            style={{
              position: 'absolute',
              width: '4px',
              height: '4px',
              backgroundColor: `hsl(${i * 30}, 80%, 70%)`,
              borderRadius: '50%',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: `0 0 10px currentColor`
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}

        {/* Musical notes */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`note-${i}`}
            style={{
              position: 'absolute',
              fontSize: '24px',
              color: `hsl(${i * 60}, 80%, 70%)`,
              left: `${20 + i * 15}%`,
              top: `${20 + Math.random() * 60}%`,
              filter: 'drop-shadow(0 0 10px currentColor)'
            }}
            animate={{
              y: [0, -30, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.6,
            }}
          >
            {['♪', '♫', '♬', '♩', '♭'][i]}
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div style={{
        position: 'relative',
        zIndex: 5,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '40px',
          alignItems: 'center',
          width: '100%',
          maxWidth: '1100px'
        }}>

          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              textAlign: 'center',
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '30px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              alignItems: 'center'
            }}>
              {/* Logo */}
              <div style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: 'linear-gradient(45deg, #00d4ff, #ff6b9d, #c77dff)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 40px rgba(0, 212, 255, 0.5)',
                border: '2px solid rgba(255, 255, 255, 0.2)'
              }}>
                <FontAwesomeIcon
                  icon={faMusic}
                  size="2x"
                  color="#f0f0f0"
                  style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))' }}
                />
              </div>

              {/* Title */}
              <h1 style={{
                fontSize: '3.5rem',
                fontWeight: '900',
                background: 'linear-gradient(45deg, #f0f0f0, #00d4ff, #ff6b9d)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: 0,
                letterSpacing: '2px'
              }}>
                MoodGroov
              </h1>

              {/* Tagline */}
              <p style={{
                fontSize: '1.2rem',
                color: '#f0f0f0',
                maxWidth: '600px',
                margin: 0,
                lineHeight: 1.5,
                textAlign: 'center',
                fontWeight: '300'
              }}>
                Enter a realm where AI reads your soul and curates the perfect sonic landscape
              </p>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ width: '100%' }}
          >
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px',
              width: '100%'
            }}>
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    background: currentFeature === index
                      ? 'rgba(255, 255, 255, 0.1)'
                      : 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: currentFeature === index
                      ? `2px solid ${feature.color}80`
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '15px',
                    padding: '25px',
                    height: '150px',
                    cursor: 'pointer',
                    boxShadow: currentFeature === index
                      ? `0 10px 30px ${feature.color}30`
                      : '0 5px 20px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  <div style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    color: '#f0f0f0'
                  }}>
                    <div style={{
                      fontSize: '2rem',
                      color: feature.color,
                      filter: `drop-shadow(0 0 10px ${feature.color})`
                    }}>
                      <FontAwesomeIcon icon={feature.icon} />
                    </div>

                    <h3 style={{
                      fontWeight: '600',
                      fontSize: '1.1rem',
                      textAlign: 'center',
                      margin: 0,
                      color: currentFeature === index ? feature.color : '#f0f0f0'
                    }}>
                      {feature.title}
                    </h3>

                    <p style={{
                      fontSize: '0.85rem',
                      textAlign: 'center',
                      opacity: 0.8,
                      margin: 0,
                      lineHeight: 1.3,
                      fontWeight: '300'
                    }}>
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Login Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '30px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '25px',
              alignItems: 'center'
            }}>
              <p style={{
                fontSize: '1.2rem',
                color: '#f0f0f0',
                textAlign: 'center',
                margin: 0,
                fontWeight: '400'
              }}>
                Ready to let AI decode your musical DNA?
              </p>

              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  padding: '18px 50px',
                  background: 'linear-gradient(45deg, #1DB954, #1ed760)',
                  color: '#f0f0f0',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  transition: 'all 0.3s ease',
                  boxShadow: isHovered
                    ? '0 15px 30px rgba(29, 185, 84, 0.5)'
                    : '0 10px 25px rgba(29, 185, 84, 0.3)',
                  fontFamily: 'inherit',
                  backdropFilter: 'blur(5px)'
                }}
                onClick={handleSpotifyLogin}
              >
                <FontAwesomeIcon icon={faMusic} />
                Enter the MoodGroov Universe
                <FontAwesomeIcon icon={faPlay} />
              </motion.button>

              <p style={{
                fontSize: '0.9rem',
                color: 'rgba(240, 240, 240, 0.7)',
                textAlign: 'center',
                margin: 0,
                maxWidth: '500px',
                lineHeight: 1.5
              }}>
                Connect your Spotify account and embark on an emotional journey through sound
              </p>
            </div>
          </motion.div>

        </div>
      </div>

      {/* CSS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800;900&display=swap');
        
        body {
          overflow-x: hidden;
          background: #000;
        }
        
        * {
          box-sizing: border-box;
        }

        video {
          filter: brightness(0.8) contrast(1.1);
        }
      `}</style>
    </div>
  );
};

export default LoginPageEnhanced;
