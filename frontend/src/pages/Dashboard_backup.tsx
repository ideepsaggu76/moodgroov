import React from 'react';
import { Mood, User } from '../types';

interface DashboardProps {
  user?: User;
  currentMood: Mood;
  onMoodChange: (mood: Mood) => void;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  user,
  currentMood,
  onMoodChange,
  onLogout,
}) => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard</h1>
      <p>Welcome {user?.display_name || 'User'}!</p>
      <p>Current mood: {currentMood}</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;

// Empty export to ensure this file is treated as a module
export {};
