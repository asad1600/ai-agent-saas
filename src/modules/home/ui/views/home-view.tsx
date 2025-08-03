'use client';

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import React from 'react';

export const HomeView = () => {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/sign-in'); // redirect to login page
        },
      },
    });
  };

  if (!session) {
    return <p>Loading ...</p>;
  }

  return (
    <div className="flex flex-col p-4 gap-y-4">
      <p>Logges in as {session?.user.name}</p>
      <Button className="max-w-sm cursor-pointer" onClick={signOut}>
        Sign out
      </Button>
    </div>
  );
};
