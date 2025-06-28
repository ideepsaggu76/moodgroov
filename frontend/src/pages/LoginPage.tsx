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
  faPlay,
  faWaveSquare,
  faStar
} from '@fortawesome/free-solid-svg-icons';
import { pageVariants, cardVariants, buttonVariants } from '../utils';

const LoginPage: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const features = [
    { icon: faMusic, title: "AI Mood Detection", description: "Smart algorithms that understand your emotional state through music preferences", color: "#FF6B6B" },
    { icon: faHeart, title: "Emotion-Driven Playlists", description: "Curated soundtracks that evolve with your feelings in real-time", color: "#4ECDC4" },
    { icon: faPalette, title: "Dynamic Visual Themes", description: "Immersive UI that transforms colors and animations based on your mood", color: "#45B7D1" },
    { icon: faLanguage, title: "Global Music Discovery", description: "Explore emotions through music from every culture and language", color: "#96CEB4" },
    { icon: faMicrophone, title: "Voice Mood Analysis", description: "Speak your feelings and let AI find the perfect musical match", color: "#FFEAA7" },
    { icon: faMagic, title: "Predictive Recommendations", description: "Machine learning that anticipates your next emotional journey", color: "#DDA0DD" }
  ];

  // Mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePos({ x, y });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Feature rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [features.length]);

  const handleSpotifyLogin = () => {
    console.log('Entering the MoodGroov universe...');
  };

  // Dynamic gradient based on time
  const [gradientShift, setGradientShift] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setGradientShift(prev => (prev + 1) % 360);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: `linear-gradient(${gradientShift}deg, 
          #0f0f23 0%, 
          #1a1a2e 25%, 
          #16213e 50%, 
          #0f3460 75%, 
          #533483 100%)`,
        fontFamily: '"DM Sans", -apple-system, BlinkMacSystemFont, sans-serif'
      }}
    >
      {/* Animated Background Layers */}

      {/* Layer 1: Flowing Aurora */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at ${50 + mousePos.x * 20}% ${50 + mousePos.y * 20}%, 
            rgba(138, 43, 226, 0.3) 0%, 
            rgba(30, 144, 255, 0.2) 30%, 
            rgba(255, 20, 147, 0.1) 60%, 
            transparent 80%)`,
          zIndex: 1
        }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 2, -1, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Layer 2: Floating Particles */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 2 }}>
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            style={{
              position: 'absolute',
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              backgroundColor: `hsl(${(i * 137.5 + gradientShift) % 360}, 70%, 60%)`,
              borderRadius: '50%',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(1px)',
              boxShadow: `0 0 ${Math.random() * 20 + 10}px currentColor`
            }}
            animate={{
              y: [0, -30 - Math.random() * 50, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Layer 3: Musical Elements */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 3 }}>
        {/* Floating Musical Notes */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`note-${i}`}
            style={{
              position: 'absolute',
              fontSize: `${24 + Math.random() * 16}px`,
              color: `hsla(${(i * 30 + gradientShift) % 360}, 80%, 70%, 0.6)`,
              left: `${5 + i * 8}%`,
              top: `${10 + Math.random() * 80}%`,
              filter: 'drop-shadow(0 0 10px currentColor)',
              transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 15}px)`
            }}
            animate={{
              y: [0, -40, 0],
              rotate: [0, 360],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          >
            {['♪', '♫', '♬', '♩', '♭', '♯'][Math.floor(Math.random() * 6)]}
          </motion.div>
        ))}

        {/* Sound Wave Visualization */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`wave-${i}`}
            style={{
              position: 'absolute',
              left: `${20 + i * 10}%`,
              bottom: '10%',
              width: '4px',
              backgroundColor: `hsl(${(i * 45 + gradientShift) % 360}, 80%, 60%)`,
              borderRadius: '2px',
              boxShadow: `0 0 15px currentColor`,
              transform: `translateX(${mousePos.x * 10}px)`
            }}
            animate={{
              height: [`${20 + Math.random() * 30}px`, `${50 + Math.random() * 80}px`, `${20 + Math.random() * 30}px`],
            }}
            transition={{
              duration: 0.8 + Math.random() * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.1,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div style={{
        position: 'relative',
        zIndex: 4,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        transform: `translate(${mousePos.x * 5}px, ${mousePos.y * 3}px)`
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '40px',
          alignItems: 'center',
          width: '100%',
          maxWidth: '1200px'
        }}>

          {/* Logo and Title Section */}
          <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            transition={{ duration: 1.2 }}
            style={{ textAlign: 'center' }}
          >
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              alignItems: 'center'
            }}>
              {/* Animated Logo */}
              <motion.div
                style={{
                  position: 'relative',
                  display: 'inline-block'
                }}
                animate={{
                  rotateY: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: `conic-gradient(from ${gradientShift}deg, #FF6B6B, #4ECDC4, #45B7D1, #96CEB4, #FFEAA7, #DDA0DD, #FF6B6B)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 60px rgba(255, 107, 107, 0.5), inset 0 0 60px rgba(255, 255, 255, 0.1)',
                  animation: 'pulse 2s ease-in-out infinite'
                }}>
                  <FontAwesomeIcon
                    icon={faMusic}
                    size="3x"
                    color="white"
                    style={{
                      filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.8))',
                      animation: 'bounce 3s ease-in-out infinite'
                    }}
                  />
                </div>
              </motion.div>

              {/* App Title */}
              <motion.h1
                style={{
                  fontSize: '4.5rem',
                  fontWeight: '800',
                  background: `linear-gradient(45deg, 
                    hsl(${gradientShift % 360}, 80%, 70%), 
                    hsl(${(gradientShift + 60) % 360}, 80%, 70%), 
                    hsl(${(gradientShift + 120) % 360}, 80%, 70%))`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '0 0 30px rgba(255, 255, 255, 0.5)',
                  margin: 0,
                  letterSpacing: '2px'
                }}
                animate={{
                  textShadow: [
                    '0 0 30px rgba(255, 107, 107, 0.5)',
                    '0 0 30px rgba(78, 205, 196, 0.5)',
                    '0 0 30px rgba(69, 183, 209, 0.5)',
                    '0 0 30px rgba(255, 107, 107, 0.5)'
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                MoodGroov
              </motion.h1>

              {/* Tagline */}
              <motion.p
                style={{
                  fontSize: '1.4rem',
                  color: 'rgba(255, 255, 255, 0.9)',
                  maxWidth: '600px',
                  margin: 0,
                  lineHeight: 1.6,
                  textAlign: 'center',
                  fontWeight: '300',
                  textShadow: '0 0 20px rgba(255, 255, 255, 0.3)'
                }}
                animate={{
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Enter a realm where AI reads your soul and curates the perfect sonic landscape for your emotions
              </motion.p>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            variants={cardVariants}
            initial="initial"
            animate="animate"
            transition={{ duration: 1.5, delay: 0.3 }}
            style={{ width: '100%' }}
          >
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '30px',
              width: '100%'
            }}>
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{
                    scale: 1.05,
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                  transition={{ delay: index * 0.2 }}
                  style={{
                    background: currentFeature === index
                      ? `linear-gradient(135deg, ${feature.color}20, rgba(255, 255, 255, 0.05))`
                      : 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(20px)',
                    border: currentFeature === index
                      ? `2px solid ${feature.color}80`
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '20px',
                    padding: '30px',
                    height: '180px',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    boxShadow: currentFeature === index
                      ? `0 20px 40px ${feature.color}40, 0 0 80px ${feature.color}20`
                      : '0 8px 32px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  {/* Animated background effect */}
                  {currentFeature === index && (
                    <motion.div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `radial-gradient(circle at 50% 50%, ${feature.color}15, transparent 70%)`,
                        zIndex: 1,
                      }}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  )}

                  <div style={{
                    position: 'relative',
                    zIndex: 2,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '16px',
                    color: 'white'
                  }}>
                    <motion.div
                      animate={currentFeature === index ? {
                        scale: [1, 1.3, 1],
                        rotate: [0, 10, -5, 0],
                        color: [feature.color, '#ffffff', feature.color]
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{
                        fontSize: '3rem',
                        color: feature.color,
                        filter: `drop-shadow(0 0 20px ${feature.color})`
                      }}
                    >
                      <FontAwesomeIcon icon={feature.icon} />
                    </motion.div>

                    <h3 style={{
                      fontWeight: '700',
                      fontSize: '1.3rem',
                      textAlign: 'center',
                      margin: 0,
                      color: currentFeature === index ? feature.color : '#ffffff'
                    }}>
                      {feature.title}
                    </h3>

                    <p style={{
                      fontSize: '0.95rem',
                      textAlign: 'center',
                      opacity: 0.85,
                      margin: 0,
                      lineHeight: 1.4,
                      fontWeight: '300'
                    }}>
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Login Button Section */}
          <motion.div
            variants={cardVariants}
            initial="initial"
            animate="animate"
            transition={{ duration: 1.8, delay: 0.8 }}
          >
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '32px',
              alignItems: 'center'
            }}>
              <motion.p
                style={{
                  fontSize: '1.3rem',
                  color: 'rgba(255, 255, 255, 0.9)',
                  textAlign: 'center',
                  margin: 0,
                  fontWeight: '400',
                  textShadow: '0 0 20px rgba(255, 255, 255, 0.3)'
                }}
                animate={{
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                Ready to let AI decode your musical DNA?
              </motion.p>

              <motion.div
                variants={buttonVariants}
                whileHover={{
                  scale: 1.1,
                  y: -5
                }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <button
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: '600',
                    padding: '18px 60px',
                    background: isHovered
                      ? `linear-gradient(45deg, #1ed760, #1DB954, #17a74a)`
                      : `linear-gradient(45deg, #1DB954, #1ed760, #1DB954)`,
                    color: 'white',
                    border: '3px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '60px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: isHovered
                      ? '0 20px 40px rgba(29, 185, 84, 0.6), 0 0 80px rgba(29, 185, 84, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.1)'
                      : '0 10px 30px rgba(29, 185, 84, 0.4), 0 0 60px rgba(29, 185, 84, 0.2)',
                    fontFamily: 'inherit',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onClick={handleSpotifyLogin}
                >
                  {/* Button glow effect */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                      zIndex: 1
                    }}
                    animate={isHovered ? {
                      left: ['100%', '100%']
                    } : {}}
                    transition={{ duration: 0.6 }}
                  />

                  <motion.div
                    animate={isHovered ? { rotate: 360 } : {}}
                    transition={{ duration: 0.8 }}
                    style={{ position: 'relative', zIndex: 2 }}
                  >
                    <FontAwesomeIcon icon={faMusic} />
                  </motion.div>

                  <span style={{ position: 'relative', zIndex: 2 }}>
                    Enter the MoodGroov Universe
                  </span>

                  <motion.div
                    animate={isHovered ? { x: [0, 8, 0] } : {}}
                    transition={{ duration: 1, repeat: Infinity }}
                    style={{ position: 'relative', zIndex: 2 }}
                  >
                    <FontAwesomeIcon icon={faPlay} />
                  </motion.div>
                </button>
              </motion.div>

              <motion.p
                style={{
                  fontSize: '0.95rem',
                  color: 'rgba(255, 255, 255, 0.6)',
                  textAlign: 'center',
                  margin: 0,
                  maxWidth: '500px',
                  lineHeight: 1.5
                }}
                animate={{
                  opacity: [0.6, 0.8, 0.6]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                Connect your Spotify account and embark on an emotional journey through sound
              </motion.p>
            </div>
          </motion.div>

        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&display=swap');
      `}</style>
    </div>
  );
};

export default LoginPage;
