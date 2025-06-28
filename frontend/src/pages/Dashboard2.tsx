import React from 'react';
import type { Mood, User } from '../types';

export interface DashboardProps {
  user?: User;
  currentMood: Mood;
  onMoodChange: (mood: Mood) => void;
  onLogout: () => void;
}

export default function Dashboard({ user, currentMood, onMoodChange, onLogout }: DashboardProps) {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🎵 MoodGroov Dashboard</h1>
      <div style={{ marginBottom: '20px' }}>
        <p><strong>Welcome, {user?.display_name || 'User'}!</strong></p>
        <p>Current mood: <span style={{ color: '#007bff', fontWeight: 'bold' }}>{currentMood}</span></p>
      </div>
      <button 
        onClick={onLogout}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;

// Empty export to ensure this file is treated as a module
export {};
