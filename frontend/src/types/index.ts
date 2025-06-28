// Types for MoodGroov App

export interface User {
  id: string;
  display_name: string;
  email: string;
  images: Array<{
    url: string;
    height: number;
    width: number;
  }>;
  country: string;
  followers?: {
    total: number;
  };
  product?: string; // premium, free, etc.
}

export interface SpotifyTokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{
    id: string;
    name: string;
  }>;
  album: {
    id: string;
    name: string;
    images: Array<{
      url: string;
      height: number;
      width: number;
    }>;
  };
  duration_ms: number;
  popularity: number;
  preview_url?: string;
  external_urls: {
    spotify: string;
  };
}

export interface RecentlyPlayedItem {
  track: SpotifyTrack;
  played_at: string;
  context?: {
    type: string;
    href: string;
    external_urls: {
      spotify: string;
    };
  };
}

export interface CurrentlyPlaying {
  is_playing: boolean;
  item: SpotifyTrack;
  progress_ms: number;
  timestamp: number;
}

export interface Track {
  id: string;
  name: string;
  artists: Array<{
    id: string;
    name: string;
  }>;
  album: {
    id: string;
    name: string;
    images: Array<{
      url: string;
      height: number;
      width: number;
    }>;
  };
  preview_url: string | null;
  duration_ms: number;
  external_urls: {
    spotify: string;
  };
  valence: number; // Musical positivity measure (0.0 to 1.0)
  energy: number; // Energy level (0.0 to 1.0)
  danceability: number; // How suitable a track is for dancing (0.0 to 1.0)
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  images: Array<{
    url: string;
    height: number;
    width: number;
  }>;
  tracks: {
    total: number;
    items: Array<{
      track: Track;
    }>;
  };
}

export type Mood =
  | 'happy'
  | 'sad'
  | 'energetic'
  | 'calm'
  | 'romantic'
  | 'angry'
  | 'nostalgic'
  | 'focused'
  | 'party'
  | 'chill';

export interface MoodTheme {
  primary: string;
  secondary: string;
  background: string;
  backgroundGradient: string;
  text: string;
  accent: string;
  cardBackground: string;
}

export interface MoodFilter {
  mood: Mood;
  language?: string;
  artist?: string;
  genre?: string;
  year?: number;
  energy?: [number, number]; // Range [min, max]
  valence?: [number, number]; // Range [min, max]
}

export interface AppState {
  user: User | null;
  currentMood: Mood;
  isAuthenticated: boolean;
  isLoading: boolean;
  currentTrack: Track | null;
  recommendations: Track[];
  playlists: Playlist[];
}
