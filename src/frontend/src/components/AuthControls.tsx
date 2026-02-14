import { Button } from '@/components/ui/button';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { LogIn, LogOut, User } from 'lucide-react';

export default function AuthControls() {
  const { identity, login, clear, isLoggingIn } = useInternetIdentity();

  if (identity) {
    return (
      <div className="flex items-center gap-2 bg-rose-100/90 dark:bg-rose-950/90 backdrop-blur-sm px-4 py-2 rounded-full border border-rose-300 dark:border-rose-700 shadow-lg">
        <User className="w-4 h-4 text-rose-700 dark:text-rose-300" />
        <span className="text-sm text-rose-900 dark:text-rose-100 hidden sm:inline">
          Signed In
        </span>
        <Button
          onClick={clear}
          size="sm"
          variant="ghost"
          className="text-rose-700 hover:text-rose-900 dark:text-rose-300 dark:hover:text-rose-100 hover:bg-rose-200/50 dark:hover:bg-rose-900/50"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={login}
      size="sm"
      disabled={isLoggingIn}
      className="bg-rose-100/90 hover:bg-rose-200/90 text-rose-900 border border-rose-300 backdrop-blur-sm shadow-lg"
    >
      <LogIn className="w-4 h-4 mr-2" />
      {isLoggingIn ? 'Signing In...' : 'Sign In'}
    </Button>
  );
}
