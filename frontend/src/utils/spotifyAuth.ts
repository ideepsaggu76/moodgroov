// Spotify API configuration
export const spotifyConfig = {
  clientId: '4104abbe70b0447aa14b2172e92b6db3',
  redirectUri: process.env.NODE_ENV === 'production' 
    ? 'https://moodgroov-e408b15fe749.herokuapp.com/callback'
    : 'http://localhost:3000/callback',
  scopes: [
    'user-read-private',
    'user-read-email',
    'user-read-recently-played',
    'user-read-playback-state',
    'user-read-currently-playing',
    'user-top-read',
    'playlist-read-private',
    'user-library-read'
  ].join(' ')
};

// Generate Spotify authorization URL
export const getSpotifyAuthUrl = (): string => {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: spotifyConfig.clientId,
    scope: spotifyConfig.scopes,
    redirect_uri: spotifyConfig.redirectUri,
    state: generateRandomString(16)
  });

  return `https://accounts.spotify.com/authorize?${params.toString()}`;
};

// Generate random string for state parameter
const generateRandomString = (length: number): string => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let text = '';
  
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  
  return text;
};

// Exchange authorization code for access token
export const exchangeCodeForToken = async (code: string): Promise<any> => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${btoa(`${spotifyConfig.clientId}:${process.env.REACT_APP_SPOTIFY_CLIENT_SECRET}`)}`
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: spotifyConfig.redirectUri
    })
  });

  if (!response.ok) {
    throw new Error('Failed to exchange code for token');
  }

  return response.json();
};

// Get user profile from Spotify
export const getSpotifyUserProfile = async (accessToken: string): Promise<any> => {
  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user profile');
  }

  return response.json();
};

// Get user's recently played tracks
export const getRecentlyPlayedTracks = async (accessToken: string, limit: number = 20): Promise<any> => {
  const response = await fetch(`https://api.spotify.com/v1/me/player/recently-played?limit=${limit}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch recently played tracks');
  }

  return response.json();
};

// Get user's current playing track
export const getCurrentPlayingTrack = async (accessToken: string): Promise<any> => {
  const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (response.status === 204) {
    return null; // No track currently playing
  }

  if (!response.ok) {
    throw new Error('Failed to fetch currently playing track');
  }

  return response.json();
};

// Get user's top tracks
export const getUserTopTracks = async (accessToken: string, timeRange: string = 'medium_term', limit: number = 20): Promise<any> => {
  const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=${limit}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch top tracks');
  }

  return response.json();
};

// Refresh access token
export const refreshAccessToken = async (refreshToken: string): Promise<any> => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${btoa(`${spotifyConfig.clientId}:${process.env.REACT_APP_SPOTIFY_CLIENT_SECRET}`)}`
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    })
  });

  if (!response.ok) {
    throw new Error('Failed to refresh access token');
  }

  return response.json();
};
