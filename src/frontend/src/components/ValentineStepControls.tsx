import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, RotateCcw, Play } from 'lucide-react';

interface ValentineStepControlsProps {
  onStart: () => void;
  onNext: () => void;
  onBack: () => void;
  onReplay: () => void;
  canGoBack: boolean;
  canGoNext: boolean;
  showStart: boolean;
  showReplay: boolean;
}

export default function ValentineStepControls({
  onStart,
  onNext,
  onBack,
  onReplay,
  canGoBack,
  canGoNext,
  showStart,
  showReplay,
}: ValentineStepControlsProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      {canGoBack && !showStart && (
        <Button
          onClick={onBack}
          variant="outline"
          size="lg"
          className="bg-rose-100/90 hover:bg-rose-200/90 text-rose-900 border-rose-300 backdrop-blur-sm"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>
      )}

      {showStart && (
        <Button
          onClick={onStart}
          size="lg"
          className="bg-rose-600 hover:bg-rose-700 text-white shadow-lg"
        >
          <Play className="w-5 h-5 mr-2" />
          Start Experience
        </Button>
      )}

      {showReplay && (
        <Button
          onClick={onReplay}
          size="lg"
          className="bg-rose-600 hover:bg-rose-700 text-white shadow-lg"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Replay
        </Button>
      )}

      {canGoNext && !showStart && (
        <Button
          onClick={onNext}
          size="lg"
          className="bg-rose-600 hover:bg-rose-700 text-white shadow-lg"
        >
          Next
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      )}
    </div>
  );
}
