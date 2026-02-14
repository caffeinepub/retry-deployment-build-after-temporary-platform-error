import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Sparkles, Eye } from 'lucide-react';

interface ValentineCard {
  title: string;
  message: string;
  icon?: 'heart' | 'sparkles';
}

interface ValentineCardViewProps {
  card: ValentineCard;
  isBonus?: boolean;
}

export default function ValentineCardView({ card, isBonus = false }: ValentineCardViewProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const Icon = card.icon === 'sparkles' ? Sparkles : Heart;

  const handleCardClick = () => {
    setIsRevealed(!isRevealed);
  };

  return (
    <div className="perspective-1000">
      <Card 
        className={`backdrop-blur-md cursor-pointer transition-all duration-500 shadow-2xl ${
          isBonus ? 'border-amber-400 shadow-amber-500/50' : 'border-rose-300 dark:border-rose-700'
        } ${
          isRevealed 
            ? 'bg-rose-50/95 dark:bg-rose-950/95 border-2 scale-100' 
            : 'bg-rose-100/80 dark:bg-rose-900/80 border-2 scale-95 hover:scale-98'
        }`}
        onClick={handleCardClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCardClick();
          }
        }}
        aria-label={isRevealed ? 'Hide message' : 'Tap to reveal message'}
      >
        <CardHeader className="text-center space-y-4 pb-4">
          <Icon className={`w-12 h-12 mx-auto ${isBonus ? 'text-amber-500 fill-amber-500' : 'text-rose-500 fill-rose-500'} ${isRevealed ? 'animate-pulse' : 'animate-pulse-slow'}`} />
          <CardTitle className="text-2xl md:text-3xl font-bold text-rose-900 dark:text-rose-100">
            {card.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center px-6 pb-8">
          {!isRevealed ? (
            <div className="space-y-4 animate-fade-in">
              <Eye className="w-8 h-8 mx-auto text-rose-400 dark:text-rose-300 animate-pulse" />
              <p className="text-base md:text-lg text-rose-700 dark:text-rose-300 font-medium">
                Tap to reveal
              </p>
              <p className="text-sm text-rose-600/70 dark:text-rose-400/70">
                A special message awaits...
              </p>
            </div>
          ) : (
            <p className="text-lg md:text-xl text-rose-800 dark:text-rose-200 leading-relaxed whitespace-pre-line animate-fade-in">
              {card.message}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
