import React, { useState, useEffect } from 'react';

const SimpleLogin: React.FC = () => {
  const [showButton, setShowButton] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    // Fade in the button after a delay to match video rhythm
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 2000); // 2 second delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      position: 'relative',
      margin: 0,
      padding: 0
    }}>
      {/* Pure Video Background */}
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
          zIndex: 1,
          opacity: showButton ? 1 : 0.3,
          transition: 'opacity 3s ease-in-out',
          filter: showButton ? 'brightness(1) saturate(1.1)' : 'brightness(0.7) saturate(0.8)',
        }}
      >
        <source src="/videos/3196427-uhd_3840_2160_25fps.mp4" type="video/mp4" />
      </video>

      {/* Expanded Dark Screen - Right Side */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '70%', // Expanded from 50% to 70%
          height: '100%',
          background: 'linear-gradient(270deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0.4) 80%, rgba(0,0,0,0.1) 95%, transparent 100%)', // More gradual fade
          zIndex: 2,
          pointerEvents: 'none', // Allow clicks to pass through
          opacity: showButton ? 1 : 0,
          transition: 'all 4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          transform: showButton ? 'translateX(0px)' : 'translateX(50px)'
        }}
      />

      {/* App Title & Tagline - Left Side */}
      <div
        style={{
          position: 'fixed',
          left: '50px',
          top: '20%',
          zIndex: 10,
          opacity: showButton ? 1 : 0,
          transition: 'all 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          transform: showButton ? 'translateY(0px)' : 'translateY(30px)',
        }}
      >
        <h1 style={{
          fontSize: '6rem', // Increased from 4.5rem to 6rem
          margin: '0 0 15px 0',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: '900',
          textShadow: '0 0 30px rgba(255, 255, 255, 0.3)',
          fontFamily: '"Arial", sans-serif',
          backgroundSize: '200% 200%',
          animation: showButton ? 'gradientShift 8s ease-in-out infinite, textPulse 4s ease-in-out infinite, textFloat 6s ease-in-out infinite' : 'none',
          transform: showButton ? 'scale(1)' : 'scale(0.8)',
          transition: 'transform 3s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}>
          MoodGroov
        </h1>
        <p style={{
          fontSize: '1.3rem',
          color: 'rgba(255, 255, 255, 0.9)',
          margin: '0',
          maxWidth: '400px',
          lineHeight: '1.4',
          fontWeight: '300',
          animation: showButton ? 'slideInFade 3s ease-out, textGlow 5s ease-in-out infinite' : 'none',
          transform: showButton ? 'translateY(0px)' : 'translateY(20px)',
          transition: 'transform 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }}>
          AI-powered music that reads your soul and curates the perfect emotional journey
        </p>
      </div>

      {/* Feature Highlights - Right Side */}
      <div
        style={{
          position: 'fixed',
          right: '50px',
          top: '20%',
          zIndex: 10,
          opacity: showButton ? 1 : 0,
          transition: 'all 3.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          transform: showButton ? 'translateX(0px)' : 'translateX(50px)',
        }}
      >
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{
            fontSize: '1.8rem',
            color: 'white',
            marginBottom: '20px',
            fontWeight: '700',
            transform: showButton ? 'translateX(0px)' : 'translateX(30px)',
            transition: 'transform 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            background: 'linear-gradient(45deg, #667eea, #764ba2, #f093fb)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundSize: '200% 200%',
            animation: showButton ? 'slideInRight 2.5s ease-out, headerGlow 6s ease-in-out infinite, gradientShift 10s ease-in-out infinite' : 'none'
          }}>
            Feel the Music Revolution
          </h2>
          
          {[
            { 
              title: 'AI Mood Detection', 
              desc: 'Smart algorithms understand your emotions',
              detailed: 'Our advanced AI analyzes facial expressions, voice patterns, and listening habits to detect your current emotional state with 95% accuracy, creating the perfect soundtrack for your mood.'
            },
            { 
              title: 'Personalized Playlists', 
              desc: 'Music that evolves with your feelings',
              detailed: 'Dynamic playlists that adapt in real-time to your emotional journey, seamlessly transitioning between genres and artists to match your evolving mood throughout the day.'
            },
            { 
              title: 'Global Discovery', 
              desc: 'Explore emotions through world music',
              detailed: 'Discover how different cultures express emotions through music. From Japanese lo-fi to Brazilian bossa nova, explore a vast library of international sounds that resonate with your feelings.'
            },
            { 
              title: 'Dynamic Themes', 
              desc: 'UI transforms based on your mood',
              detailed: 'Watch your app interface transform with beautiful color palettes, animations, and visual effects that reflect your current emotional state, creating an immersive and personalized experience.'
            }
          ].map((feature, index) => (
            <div
              key={index}
              style={{
                marginBottom: '15px',
                padding: hoveredCard === index ? '18px 25px' : '12px 20px',
                background: hoveredCard === index ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '15px',
                border: hoveredCard === index ? '1px solid rgba(255, 255, 255, 0.4)' : '1px solid rgba(255, 255, 255, 0.2)',
                opacity: showButton ? 1 : 0,
                transition: `all ${2 + index * 0.3}s cubic-bezier(0.25, 0.46, 0.45, 0.94), padding 0.3s ease, background 0.3s ease, border 0.3s ease, transform 0.3s ease`,
                transform: showButton 
                  ? (hoveredCard === index ? 'translateY(0px) scale(1.05) rotateX(2deg)' : 'translateY(0px) scale(1)') 
                  : 'translateY(20px) scale(1)',
                maxWidth: hoveredCard === index ? '400px' : '350px',
                cursor: 'pointer',
                animation: showButton ? `cardFloat${index % 4} ${5 + index}s ease-in-out infinite` : 'none',
                boxShadow: hoveredCard === index ? '0 20px 40px rgba(255, 255, 255, 0.1)' : '0 5px 15px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div>
                <div style={{ 
                  color: 'white', 
                  fontWeight: '600',
                  fontSize: hoveredCard === index ? '1.1rem' : '1rem',
                  marginBottom: '3px',
                  transition: 'font-size 0.3s ease',
                  animation: hoveredCard === index ? 'titlePulse 0.6s ease-in-out' : 'none'
                }}>
                  {feature.title}
                </div>
                <div style={{ 
                  color: 'rgba(255, 255, 255, 0.7)', 
                  fontSize: '0.85rem',
                  lineHeight: '1.3',
                  transition: 'all 0.3s ease',
                  animation: hoveredCard === index ? 'textSlideIn 0.5s ease-out' : 'none'
                }}>
                  {hoveredCard === index ? feature.detailed : feature.desc}
                </div>
              </div>
            </div>
          ))}
          
          {/* Spotify Login Button - Below Cards */}
          <div
            style={{
              marginTop: '25px',
              opacity: showButton ? 1 : 0,
              transition: 'all 4.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              transform: showButton ? 'translateY(0px) scale(1)' : 'translateY(30px) scale(0.9)',
            }}
          >
            <button
              style={{
                background: 'linear-gradient(135deg, #1DB954 0%, #1ed760 100%)',
                border: 'none',
                borderRadius: '50px',
                padding: '18px 35px',
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontFamily: '"Arial", sans-serif',
                width: '100%',
                maxWidth: '350px',
                justifyContent: 'center',
                animation: showButton ? 'buttonPulse 3s ease-in-out infinite, buttonFloat 4s ease-in-out infinite' : 'none',
                boxShadow: '0 8px 25px rgba(29, 185, 84, 0.3)'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.transform = 'scale(1.05) translateY(-2px) rotateX(5deg)';
                (e.target as HTMLButtonElement).style.boxShadow = '0 15px 35px rgba(29, 185, 84, 0.5)';
                (e.target as HTMLButtonElement).style.background = 'linear-gradient(135deg, #1ed760 0%, #1DB954 100%)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.transform = 'scale(1) translateY(0px) rotateX(0deg)';
                (e.target as HTMLButtonElement).style.boxShadow = '0 8px 25px rgba(29, 185, 84, 0.3)';
                (e.target as HTMLButtonElement).style.background = 'linear-gradient(135deg, #1DB954 0%, #1ed760 100%)';
              }}
              onClick={() => {
                console.log('Spotify login clicked');
                // Handle Spotify OAuth here
              }}
            >
              {/* Spotify Logo SVG */}
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="currentColor"
                style={{ 
                  flexShrink: 0
                }}
              >
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
              Login with Spotify
            </button>
          </div>
        </div>
      </div>

      {/* Floating Music Notes Animation */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 3, pointerEvents: 'none' }}>
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              fontSize: '1.5rem',
              color: 'rgba(255, 255, 255, 0.2)',
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
              opacity: showButton ? 1 : 0,
              transition: `all ${3 + i * 0.2}s ease-in-out`,
              animation: showButton ? `float${i} ${4 + i}s ease-in-out infinite, noteGlow${i % 4} ${6 + i}s ease-in-out infinite` : 'none',
              filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))'
            }}
          >
            {['♪', '♫', '♬', '♩'][i % 4]}
          </div>
        ))}
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          25% { background-position: 100% 50%; }
          50% { background-position: 50% 100%; }
          75% { background-position: 0% 100%; }
        }
        @keyframes textPulse {
          0%, 100% { text-shadow: 0 0 30px rgba(255, 255, 255, 0.3); }
          50% { text-shadow: 0 0 50px rgba(255, 255, 255, 0.6), 0 0 80px rgba(255, 255, 255, 0.2); }
        }
        @keyframes textFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-5px) scale(1.02); }
        }
        @keyframes slideInFade {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0px); }
        }
        @keyframes textGlow {
          0%, 100% { filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.2)); }
          50% { filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.4)); }
        }
        @keyframes slideInRight {
          0% { opacity: 0; transform: translateX(50px); }
          100% { opacity: 1; transform: translateX(0px); }
        }
        @keyframes headerGlow {
          0%, 100% { text-shadow: 0 0 15px rgba(255, 255, 255, 0.3); }
          50% { text-shadow: 0 0 25px rgba(255, 255, 255, 0.5); }
        }
        @keyframes cardFloat0 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        @keyframes cardFloat1 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        @keyframes cardFloat2 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-2px); }
        }
        @keyframes cardFloat3 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        @keyframes titlePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        @keyframes textSlideIn {
          0% { opacity: 0; transform: translateX(-10px); }
          100% { opacity: 1; transform: translateX(0px); }
        }
        @keyframes buttonPulse {
          0%, 100% { box-shadow: 0 8px 25px rgba(29, 185, 84, 0.3); }
          50% { box-shadow: 0 8px 25px rgba(29, 185, 84, 0.5); }
        }
        @keyframes buttonFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-2px); }
        }
        @keyframes iconSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes noteGlow0 {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.3)); }
          50% { filter: drop-shadow(0 0 15px rgba(102, 126, 234, 0.6)); }
        }
        @keyframes noteGlow1 {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.3)); }
          50% { filter: drop-shadow(0 0 15px rgba(240, 147, 251, 0.6)); }
        }
        @keyframes noteGlow2 {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.3)); }
          50% { filter: drop-shadow(0 0 15px rgba(245, 87, 108, 0.6)); }
        }
        @keyframes noteGlow3 {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.3)); }
          50% { filter: drop-shadow(0 0 15px rgba(79, 172, 254, 0.6)); }
        }
        @keyframes float0 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-20px) rotate(10deg); } }
        @keyframes float1 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-15px) rotate(-8deg); } }
        @keyframes float2 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-25px) rotate(12deg); } }
        @keyframes float3 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-18px) rotate(-6deg); } }
        @keyframes float4 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-22px) rotate(9deg); } }
        @keyframes float5 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-16px) rotate(-11deg); } }
        @keyframes float6 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-28px) rotate(7deg); } }
        @keyframes float7 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-19px) rotate(-9deg); } }
      `}</style>

    </div>
  );
};

export default SimpleLogin;
