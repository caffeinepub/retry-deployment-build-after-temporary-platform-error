import { Heart, Sparkles } from 'lucide-react';

export default function AmbientEffectsLayer() {
  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden" aria-hidden="true">
      {/* Floating hearts */}
      <Heart className="absolute top-[10%] left-[15%] w-6 h-6 text-rose-300/30 fill-rose-300/30 animate-float-slow" />
      <Heart className="absolute top-[25%] right-[20%] w-5 h-5 text-rose-400/25 fill-rose-400/25 animate-float-medium" />
      <Heart className="absolute top-[60%] left-[10%] w-7 h-7 text-pink-300/20 fill-pink-300/20 animate-float-slow delay-1000" />
      <Heart className="absolute bottom-[20%] right-[15%] w-6 h-6 text-rose-300/30 fill-rose-300/30 animate-float-medium delay-2000" />
      
      {/* Floating sparkles */}
      <Sparkles className="absolute top-[40%] right-[10%] w-5 h-5 text-amber-300/25 animate-float-slow delay-500" />
      <Sparkles className="absolute top-[70%] left-[25%] w-4 h-4 text-amber-400/20 animate-float-medium delay-1500" />
      <Sparkles className="absolute bottom-[30%] left-[20%] w-5 h-5 text-amber-300/25 animate-float-slow delay-2500" />
    </div>
  );
}
