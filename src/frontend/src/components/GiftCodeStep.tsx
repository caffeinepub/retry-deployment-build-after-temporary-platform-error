import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Gift, Lock, Unlock } from 'lucide-react';
import { useGiftCodeRedemption } from '../hooks/useGiftCodeRedemption';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { toast } from 'sonner';

interface GiftCodeStepProps {
  onSuccess: () => void;
}

export default function GiftCodeStep({ onSuccess }: GiftCodeStepProps) {
  const [code, setCode] = useState('');
  const { identity, login } = useInternetIdentity();
  const { redeemCode, isRedeeming, isRedeemed } = useGiftCodeRedemption();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!identity) {
      toast.error('Please sign in first to redeem your gift code');
      return;
    }

    if (!code.trim()) {
      toast.error('Please enter a gift code');
      return;
    }

    const success = await redeemCode(code);
    if (success) {
      toast.success('Gift code redeemed! Unlocking your bonus...');
      setTimeout(() => {
        onSuccess();
      }, 1000);
    }
  };

  if (isRedeemed) {
    return (
      <Card className="backdrop-blur-md bg-emerald-50/95 dark:bg-emerald-950/95 border-2 border-emerald-400 shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <Unlock className="w-12 h-12 mx-auto text-emerald-600 animate-pulse" />
          <CardTitle className="text-2xl md:text-3xl font-bold text-emerald-900 dark:text-emerald-100">
            Gift Code Unlocked!
          </CardTitle>
          <CardDescription className="text-emerald-700 dark:text-emerald-300 text-lg">
            You've already redeemed your special bonus. Click Next to view it again!
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="backdrop-blur-md bg-rose-50/95 dark:bg-rose-950/95 border-2 border-rose-300 dark:border-rose-700 shadow-2xl">
      <CardHeader className="text-center space-y-4">
        <Gift className="w-12 h-12 mx-auto text-rose-500 animate-pulse" />
        <CardTitle className="text-2xl md:text-3xl font-bold text-rose-900 dark:text-rose-100">
          Special Gift Code
        </CardTitle>
        <CardDescription className="text-rose-700 dark:text-rose-300 text-lg">
          Have a special code? Enter it below to unlock a bonus surprise!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 px-6 pb-8">
        {!identity ? (
          <div className="space-y-4 text-center">
            <div className="flex items-center justify-center gap-2 text-amber-700 dark:text-amber-300 bg-amber-100/80 dark:bg-amber-900/30 p-4 rounded-lg">
              <Lock className="w-5 h-5" />
              <p className="text-sm font-medium">
                Please sign in to redeem your gift code
              </p>
            </div>
            <Button
              onClick={login}
              size="lg"
              className="w-full bg-rose-600 hover:bg-rose-700 text-white"
            >
              Sign In to Continue
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Enter your gift code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="text-center text-lg bg-white/80 dark:bg-rose-900/30 border-rose-300 dark:border-rose-700"
                disabled={isRedeeming}
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full bg-rose-600 hover:bg-rose-700 text-white"
              disabled={isRedeeming || !code.trim()}
            >
              {isRedeeming ? 'Redeeming...' : 'Redeem Code'}
            </Button>
          </form>
        )}
        <p className="text-center text-sm text-rose-600 dark:text-rose-400">
          Don't have a code? No worries, click Next to continue!
        </p>
      </CardContent>
    </Card>
  );
}
