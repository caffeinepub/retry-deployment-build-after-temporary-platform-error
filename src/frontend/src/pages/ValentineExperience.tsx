import { useState, useEffect } from 'react';
import { Heart, ArrowRight, ArrowLeft, RotateCcw, Sparkles } from 'lucide-react';
import { valentineCards } from '../content/valentineCards';
import ValentineCardView from '../components/ValentineCardView';
import ValentineStepControls from '../components/ValentineStepControls';
import GiftCodeStep from '../components/GiftCodeStep';
import AuthControls from '../components/AuthControls';
import AmbientEffectsLayer from '../components/AmbientEffectsLayer';
import { useGiftCodeRedemption } from '../hooks/useGiftCodeRedemption';
import { useCardNavigationGestures } from '../hooks/useCardNavigationGestures';
import { useBackgroundMusic } from '../music/BackgroundMusicProvider';

type Step = 'welcome' | 'cards' | 'giftCode' | 'bonusCard' | 'end';

export default function ValentineExperience() {
  const [step, setStep] = useState<Step>('welcome');
  const [cardIndex, setCardIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const { isRedeemed, checkRedemption } = useGiftCodeRedemption();
  const { play } = useBackgroundMusic();

  useEffect(() => {
    checkRedemption();
  }, [checkRedemption]);

  const handleNext = () => {
    setFadeIn(false);
    setTimeout(() => {
      if (step === 'welcome') {
        setStep('cards');
        setCardIndex(0);
      } else if (step === 'cards') {
        if (cardIndex < valentineCards.length - 1) {
          setCardIndex(cardIndex + 1);
        } else {
          setStep('giftCode');
        }
      } else if (step === 'giftCode') {
        if (isRedeemed) {
          setStep('bonusCard');
        } else {
          setStep('end');
        }
      } else if (step === 'bonusCard') {
        setStep('end');
      }
      setFadeIn(true);
    }, 200);
  };

  const handleBack = () => {
    setFadeIn(false);
    setTimeout(() => {
      if (step === 'cards' && cardIndex > 0) {
        setCardIndex(cardIndex - 1);
      } else if (step === 'cards' && cardIndex === 0) {
        setStep('welcome');
      } else if (step === 'giftCode') {
        setCardIndex(valentineCards.length - 1);
        setStep('cards');
      } else if (step === 'bonusCard') {
        setStep('giftCode');
      } else if (step === 'end') {
        if (isRedeemed) {
          setStep('bonusCard');
        } else {
          setStep('giftCode');
        }
      }
      setFadeIn(true);
    }, 200);
  };

  const handleReplay = () => {
    setFadeIn(false);
    setTimeout(() => {
      setStep('welcome');
      setCardIndex(0);
      setFadeIn(true);
    }, 200);
  };

  const handleStart = () => {
    // Start music on user gesture
    play();
    handleNext();
  };

  const handleCodeSuccess = () => {
    setFadeIn(false);
    setTimeout(() => {
      setStep('bonusCard');
      setFadeIn(true);
    }, 200);
  };

  const canGoBack = step !== 'welcome';
  const canGoNext = step !== 'end';
  const showReplay = step === 'end';

  // Enable gesture navigation for cards step
  useCardNavigationGestures({
    onNext: handleNext,
    onBack: handleBack,
    canGoNext,
    canGoBack,
    enabled: step === 'cards' || step === 'bonusCard',
  });

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat parallax-bg"
        style={{ backgroundImage: 'url(/assets/generated/valentine-food-bg.dim_1920x1080.png)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-rose-900/40 via-pink-900/50 to-rose-950/60 backdrop-blur-[2px]" />
      </div>

      {/* Ambient Effects Layer */}
      <AmbientEffectsLayer />

      {/* Decorative Elements with Parallax */}
      <img 
        src="/assets/generated/choco-heart-icon.dim_512x512.png" 
        alt="" 
        className="fixed top-8 right-8 w-16 h-16 md:w-24 md:h-24 opacity-80 animate-pulse z-10 hidden sm:block parallax-slow"
      />
      <img 
        src="/assets/generated/cupcake-heart.dim_512x512.png" 
        alt="" 
        className="fixed bottom-8 left-8 w-16 h-16 md:w-24 md:h-24 opacity-80 animate-pulse z-10 hidden sm:block parallax-slow"
      />

      {/* Auth Controls */}
      <div className="fixed top-4 left-4 z-20">
        <AuthControls />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <div 
          className={`w-full max-w-2xl transition-opacity duration-200 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
        >
          {step === 'welcome' && (
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <Heart className="w-20 h-20 mx-auto text-rose-300 fill-rose-300 animate-pulse" />
                <h1 className="text-5xl md:text-7xl font-bold text-rose-50 drop-shadow-lg tracking-tight">
                  Happy Valentine's Day
                </h1>
                <p className="text-2xl md:text-3xl text-rose-100 drop-shadow-md font-light">
                  A Special Gift for You
                </p>
              </div>
              <ValentineStepControls
                onStart={handleStart}
                onNext={handleNext}
                onBack={handleBack}
                onReplay={handleReplay}
                canGoBack={canGoBack}
                canGoNext={canGoNext}
                showStart={true}
                showReplay={showReplay}
              />
            </div>
          )}

          {step === 'cards' && (
            <div className="space-y-6">
              <ValentineCardView card={valentineCards[cardIndex]} />
              <div className="text-center text-rose-200 text-sm">
                Card {cardIndex + 1} of {valentineCards.length}
              </div>
              <ValentineStepControls
                onStart={handleStart}
                onNext={handleNext}
                onBack={handleBack}
                onReplay={handleReplay}
                canGoBack={canGoBack}
                canGoNext={canGoNext}
                showStart={false}
                showReplay={showReplay}
              />
            </div>
          )}

          {step === 'giftCode' && (
            <div className="space-y-6">
              <GiftCodeStep onSuccess={handleCodeSuccess} />
              <ValentineStepControls
                onStart={handleStart}
                onNext={handleNext}
                onBack={handleBack}
                onReplay={handleReplay}
                canGoBack={canGoBack}
                canGoNext={canGoNext}
                showStart={false}
                showReplay={showReplay}
              />
            </div>
          )}

          {step === 'bonusCard' && (
            <div className="space-y-6">
              <ValentineCardView card={valentineCards[valentineCards.length - 1]} isBonus={true} />
              <ValentineStepControls
                onStart={handleStart}
                onNext={handleNext}
                onBack={handleBack}
                onReplay={handleReplay}
                canGoBack={canGoBack}
                canGoNext={canGoNext}
                showStart={false}
                showReplay={showReplay}
              />
            </div>
          )}

          {step === 'end' && (
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <Sparkles className="w-20 h-20 mx-auto text-amber-300 fill-amber-300 animate-pulse" />
                <h2 className="text-4xl md:text-6xl font-bold text-rose-50 drop-shadow-lg">
                  With All My Love
                </h2>
                <p className="text-xl md:text-2xl text-rose-100 drop-shadow-md font-light">
                  Happy Valentine's Day, Tanya Singh! 💕
                </p>
              </div>
              <ValentineStepControls
                onStart={handleStart}
                onNext={handleNext}
                onBack={handleBack}
                onReplay={handleReplay}
                canGoBack={canGoBack}
                canGoNext={false}
                showStart={false}
                showReplay={true}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="fixed bottom-4 left-0 right-0 text-center text-rose-200/80 text-sm z-20">
          <p>
            Built with <Heart className="inline w-4 h-4 fill-rose-300 text-rose-300" /> using{' '}
            <a 
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-rose-100 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
