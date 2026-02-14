import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Play, Pause, Volume2, VolumeX, SkipForward, SkipBack, AlertCircle } from 'lucide-react';
import { useBackgroundMusicSafe } from '../music/BackgroundMusicProvider';
import { useEffect } from 'react';

export default function MusicControls() {
  const context = useBackgroundMusicSafe();

  // Diagnostic: warn if context is missing
  useEffect(() => {
    if (!context) {
      console.warn(
        '[MusicControls] BackgroundMusicProvider context is not available. ' +
        'Music controls will not function. Ensure MusicControls is rendered within BackgroundMusicProvider.'
      );
    }
  }, [context]);

  // Graceful fallback when context is unavailable
  if (!context) {
    return (
      <div 
        data-testid="music-controls"
        className="fixed bottom-20 right-4 z-[9999] bg-rose-950/90 backdrop-blur-md border border-rose-800/50 rounded-lg shadow-xl p-3 w-64 pointer-events-auto"
      >
        <div className="flex items-center gap-2 text-rose-200 text-xs">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>Music controls unavailable</span>
        </div>
      </div>
    );
  }

  const {
    isPlaying,
    isMuted,
    volume,
    currentTrack,
    togglePlay,
    toggleMute,
    setVolume,
    nextTrack,
    previousTrack,
  } = context;

  return (
    <TooltipProvider>
      <div 
        data-testid="music-controls"
        className="fixed bottom-20 right-4 z-[9999] bg-rose-950/90 backdrop-blur-md border border-rose-800/50 rounded-lg shadow-xl p-3 space-y-2 w-64 pointer-events-auto"
        style={{
          // Safe area support for mobile devices
          paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))',
        }}
      >
        {/* Current Track */}
        <div className="text-xs text-rose-200 text-center truncate px-2">
          {currentTrack?.title || 'No track loaded'}
        </div>

        {/* Playback Controls */}
        <div className="flex items-center justify-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={previousTrack}
                className="h-8 w-8 text-rose-200 hover:text-rose-50 hover:bg-rose-900/50"
                aria-label="Previous track"
              >
                <SkipBack className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Previous Track</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="default"
                size="icon"
                onClick={togglePlay}
                className="h-10 w-10 bg-rose-600 hover:bg-rose-700 text-white"
                aria-label={isPlaying ? 'Pause music' : 'Play music'}
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{isPlaying ? 'Pause' : 'Play'}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={nextTrack}
                className="h-8 w-8 text-rose-200 hover:text-rose-50 hover:bg-rose-900/50"
                aria-label="Next track"
              >
                <SkipForward className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Next Track</TooltipContent>
          </Tooltip>
        </div>

        {/* Volume Controls */}
        <div className="flex items-center gap-2 px-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMute}
                className="h-8 w-8 text-rose-200 hover:text-rose-50 hover:bg-rose-900/50 flex-shrink-0"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{isMuted ? 'Unmute' : 'Mute'}</TooltipContent>
          </Tooltip>

          <Slider
            value={[isMuted ? 0 : volume * 100]}
            onValueChange={(values) => setVolume(values[0] / 100)}
            max={100}
            step={1}
            className="flex-1"
            aria-label="Volume control"
          />
        </div>
      </div>
    </TooltipProvider>
  );
}
