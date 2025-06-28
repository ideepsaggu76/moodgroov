import { Mood, MoodTheme } from '../types';

// Mood-based color themes for dynamic UI
export const moodThemes: Record<Mood, MoodTheme> = {
  happy: {
    primary: '#FFD700',
    secondary: '#FFA500',
    background: '#FFF8DC',
    backgroundGradient: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF6347 100%)',
    text: '#333333',
    accent: '#FF6347',
    cardBackground: 'rgba(255, 255, 255, 0.9)'
  },
  sad: {
    primary: '#4682B4',
    secondary: '#6495ED',
    background: '#F0F8FF',
    backgroundGradient: 'linear-gradient(135deg, #4682B4 0%, #6495ED 50%, #87CEEB 100%)',
    text: '#2F4F4F',
    accent: '#87CEEB',
    cardBackground: 'rgba(255, 255, 255, 0.8)'
  },
  energetic: {
    primary: '#FF4500',
    secondary: '#FF6347',
    background: '#FFE4E1',
    backgroundGradient: 'linear-gradient(135deg, #FF4500 0%, #FF6347 50%, #FF1493 100%)',
    text: '#8B0000',
    accent: '#FF1493',
    cardBackground: 'rgba(255, 255, 255, 0.9)'
  },
  calm: {
    primary: '#20B2AA',
    secondary: '#48D1CC',
    background: '#F0FFFF',
    backgroundGradient: 'linear-gradient(135deg, #20B2AA 0%, #48D1CC 50%, #7FFFD4 100%)',
    text: '#2F4F4F',
    accent: '#7FFFD4',
    cardBackground: 'rgba(255, 255, 255, 0.8)'
  },
  romantic: {
    primary: '#FF69B4',
    secondary: '#FF1493',
    background: '#FFF0F5',
    backgroundGradient: 'linear-gradient(135deg, #FF69B4 0%, #FF1493 50%, #DC143C 100%)',
    text: '#8B0000',
    accent: '#DC143C',
    cardBackground: 'rgba(255, 255, 255, 0.9)'
  },
  angry: {
    primary: '#DC143C',
    secondary: '#B22222',
    background: '#FFF8DC',
    backgroundGradient: 'linear-gradient(135deg, #DC143C 0%, #B22222 50%, #8B0000 100%)',
    text: '#FFFFFF',
    accent: '#FF4500',
    cardBackground: 'rgba(0, 0, 0, 0.7)'
  },
  nostalgic: {
    primary: '#DDA0DD',
    secondary: '#DA70D6',
    background: '#F5F5DC',
    backgroundGradient: 'linear-gradient(135deg, #DDA0DD 0%, #DA70D6 50%, #9370DB 100%)',
    text: '#4B0082',
    accent: '#9370DB',
    cardBackground: 'rgba(255, 255, 255, 0.8)'
  },
  focused: {
    primary: '#708090',
    secondary: '#778899',
    background: '#F5F5F5',
    backgroundGradient: 'linear-gradient(135deg, #708090 0%, #778899 50%, #B0C4DE 100%)',
    text: '#2F4F4F',
    accent: '#B0C4DE',
    cardBackground: 'rgba(255, 255, 255, 0.9)'
  },
  party: {
    primary: '#9400D3',
    secondary: '#8A2BE2',
    background: '#E6E6FA',
    backgroundGradient: 'linear-gradient(135deg, #9400D3 0%, #8A2BE2 50%, #FF00FF 100%)',
    text: '#FFFFFF',
    accent: '#FF00FF',
    cardBackground: 'rgba(0, 0, 0, 0.7)'
  },
  chill: {
    primary: '#32CD32',
    secondary: '#00FA9A',
    background: '#F0FFF0',
    backgroundGradient: 'linear-gradient(135deg, #32CD32 0%, #00FA9A 50%, #00CED1 100%)',
    text: '#006400',
    accent: '#00CED1',
    cardBackground: 'rgba(255, 255, 255, 0.8)'
  }
};

// Utility function to get theme by mood
export const getThemeByMood = (mood: Mood): MoodTheme => {
  return moodThemes[mood];
};

// Utility function to format duration
export const formatDuration = (ms: number): string => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

// Utility function to get mood from audio features
export const getMoodFromFeatures = (valence: number, energy: number): Mood => {
  if (valence > 0.7 && energy > 0.7) return 'party';
  if (valence > 0.6 && energy > 0.6) return 'energetic';
  if (valence > 0.6 && energy < 0.5) return 'happy';
  if (valence < 0.4 && energy < 0.4) return 'sad';
  if (valence > 0.4 && valence < 0.6 && energy < 0.4) return 'calm';
  if (valence > 0.5 && energy > 0.3 && energy < 0.7) return 'romantic';
  if (valence < 0.3 && energy > 0.6) return 'angry';
  if (valence < 0.5 && energy > 0.4 && energy < 0.7) return 'nostalgic';
  if (valence > 0.3 && valence < 0.6 && energy > 0.2 && energy < 0.6) return 'focused';
  return 'chill';
};

// Animation variants for Framer Motion
export const pageVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 }
};

export const cardVariants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.2 } }
};

export const buttonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.1 },
  tap: { scale: 0.95 }
};
