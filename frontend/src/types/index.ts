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
