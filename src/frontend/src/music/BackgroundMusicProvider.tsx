import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';
import { playlist, Track } from './playlist';
import { toast } from 'sonner';

interface BackgroundMusicContextValue {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  currentTrack: Track | null;
  currentTrackIndex: number;
  play: () => Promise<void>;
  pause: () => void;
  togglePlay: () => Promise<void>;
  toggleMute: () => void;
  setVolume: (volume: number) => void;
  nextTrack: () => void;
  previousTrack: () => void;
}

const BackgroundMusicContext = createContext<BackgroundMusicContextValue | null>(null);

const STORAGE_KEYS = {
  VOLUME: 'valentine-music-volume',
  MUTED: 'valentine-music-muted',
};

export function BackgroundMusicProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.MUTED);
    return stored === 'true';
  });
  const [volume, setVolumeState] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.VOLUME);
    const parsed = stored ? parseFloat(stored) : 0.7;
    return isNaN(parsed) || parsed < 0 || parsed > 1 ? 0.7 : parsed;
  });
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [hasError, setHasError] = useState(false);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'auto';
    audioRef.current = audio;

    // Apply persisted settings
    audio.volume = volume;
    audio.muted = isMuted;

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Load track
  const loadTrack = useCallback((index: number) => {
    const audio = audioRef.current;
    if (!audio || index < 0 || index >= playlist.length) return;

    const track = playlist[index];
    audio.src = track.path;
    setCurrentTrackIndex(index);
    setHasError(false);
  }, []);

  // Handle track end - auto advance
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      // Auto-advance to next track if playing
      if (isPlaying) {
        const nextIndex = (currentTrackIndex + 1) % playlist.length;
        loadTrack(nextIndex);
        // Auto-play next track
        audio.play().catch((err) => {
          console.error('Auto-play next track failed:', err);
          setIsPlaying(false);
        });
      }
    };

    const handleError = () => {
      if (!hasError) {
        setHasError(true);
        toast.error(`Unable to load track: ${playlist[currentTrackIndex]?.title || 'Unknown'}`, {
          description: 'The audio file may be missing. The app will continue to work normally.',
        });
        setIsPlaying(false);
      }
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [isPlaying, currentTrackIndex, loadTrack, hasError]);

  // Load initial track
  useEffect(() => {
    loadTrack(0);
  }, [loadTrack]);

  // Persist volume
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.VOLUME, volume.toString());
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Persist mute
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MUTED, isMuted.toString());
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      await audio.play();
      setIsPlaying(true);
    } catch (err) {
      console.error('Play failed:', err);
      toast.error('Unable to play music', {
        description: 'Please interact with the page first, then try again.',
      });
      setIsPlaying(false);
    }
  }, []);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(async () => {
    if (isPlaying) {
      pause();
    } else {
      await play();
    }
  }, [isPlaying, play, pause]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const setVolume = useCallback((newVolume: number) => {
    const clamped = Math.max(0, Math.min(1, newVolume));
    setVolumeState(clamped);
  }, []);

  const nextTrack = useCallback(() => {
    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(nextIndex);
    if (isPlaying) {
      play();
    }
  }, [currentTrackIndex, isPlaying, loadTrack, play]);

  const previousTrack = useCallback(() => {
    const prevIndex = currentTrackIndex === 0 ? playlist.length - 1 : currentTrackIndex - 1;
    loadTrack(prevIndex);
    if (isPlaying) {
      play();
    }
  }, [currentTrackIndex, isPlaying, loadTrack, play]);

  const value: BackgroundMusicContextValue = {
    isPlaying,
    isMuted,
    volume,
    currentTrack: playlist[currentTrackIndex] || null,
    currentTrackIndex,
    play,
    pause,
    togglePlay,
    toggleMute,
    setVolume,
    nextTrack,
    previousTrack,
  };

  return (
    <BackgroundMusicContext.Provider value={value}>
      {children}
    </BackgroundMusicContext.Provider>
  );
}

/**
 * Hook to access background music context.
 * Throws an error if used outside BackgroundMusicProvider.
 */
export function useBackgroundMusic() {
  const context = useContext(BackgroundMusicContext);
  if (!context) {
    throw new Error('useBackgroundMusic must be used within BackgroundMusicProvider');
  }
  return context;
}

/**
 * Safe hook to check if BackgroundMusicProvider is available.
 * Returns null if context is not available (no throw).
 */
export function useBackgroundMusicSafe() {
  return useContext(BackgroundMusicContext);
}
