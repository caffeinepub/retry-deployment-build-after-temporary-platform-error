import { useState, useCallback } from 'react';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import { toast } from 'sonner';

export function useGiftCodeRedemption() {
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [isRedeemed, setIsRedeemed] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const checkRedemption = useCallback(async () => {
    if (!actor || !identity) {
      setIsRedeemed(false);
      return;
    }

    try {
      setIsChecking(true);
      const redeemed = await actor.hasRedeemedCode();
      setIsRedeemed(redeemed);
    } catch (error) {
      console.error('Error checking redemption status:', error);
      setIsRedeemed(false);
    } finally {
      setIsChecking(false);
    }
  }, [actor, identity]);

  const redeemCode = useCallback(async (code: string): Promise<boolean> => {
    if (!actor || !identity) {
      toast.error('Please sign in to redeem your code');
      return false;
    }

    try {
      setIsRedeeming(true);
      await actor.redeemCode(code);
      setIsRedeemed(true);
      return true;
    } catch (error: any) {
      console.error('Error redeeming code:', error);
      
      if (error.message?.includes('Invalid code')) {
        toast.error('Invalid gift code. Please try again!');
      } else if (error.message?.includes('already redeemed')) {
        toast.error('This code has already been redeemed');
        setIsRedeemed(true);
      } else if (error.message?.includes('authentication')) {
        toast.error('Please sign in to redeem your code');
      } else {
        toast.error('Failed to redeem code. Please try again!');
      }
      
      return false;
    } finally {
      setIsRedeeming(false);
    }
  }, [actor, identity]);

  return {
    redeemCode,
    checkRedemption,
    isRedeeming,
    isRedeemed,
    isChecking,
  };
}
