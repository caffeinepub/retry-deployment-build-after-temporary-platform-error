// SPM "E Love" playlist configuration
// Place audio files in frontend/public/assets/music/ directory

export interface Track {
  id: string;
  title: string;
  path: string;
}

export const playlist: Track[] = [
  {
    id: 'track-1',
    title: 'E Love Song 1',
    path: '/assets/music/e-love-1.mp3',
  },
  {
    id: 'track-2',
    title: 'E Love Song 2',
    path: '/assets/music/e-love-2.mp3',
  },
  {
    id: 'track-3',
    title: 'E Love Song 3',
    path: '/assets/music/e-love-3.mp3',
  },
  {
    id: 'track-4',
    title: 'E Love Song 4',
    path: '/assets/music/e-love-4.mp3',
  },
  {
    id: 'track-5',
    title: 'E Love Song 5',
    path: '/assets/music/e-love-5.mp3',
  },
];
