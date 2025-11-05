'use client';

import { useAuth, useUser, initiateAnonymousSignIn } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);

  const handleSignIn = () => {
    initiateAnonymousSignIn(auth);
  };

  if (isUserLoading || user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background p-4">
        <div className="mx-auto flex w-full max-w-sm flex-col items-center justify-center space-y-6">
            <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Welcome to PlanItRight</h1>
            <p className="text-muted-foreground">Sign in to continue to your dashboard.</p>
            </div>
            <div className="w-full">
                <Button onClick={handleSignIn} className="w-full">
                    Sign In Anonymously
                </Button>
            </div>
        </div>
    </div>
  );
}
