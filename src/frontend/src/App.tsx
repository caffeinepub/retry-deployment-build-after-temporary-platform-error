import ValentineExperience from './pages/ValentineExperience';
import { Toaster } from '@/components/ui/sonner';
import { BackgroundMusicProvider } from './music/BackgroundMusicProvider';
import MusicControlsPortal from './components/MusicControlsPortal';

function App() {
  return (
    <BackgroundMusicProvider>
      <ValentineExperience />
      <MusicControlsPortal />
      <Toaster />
    </BackgroundMusicProvider>
  );
}

export default App;
