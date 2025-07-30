'use client';

import { authClient } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Home() {
  const { data: session } = authClient.useSession();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const OnSubmit = async () => {
    const { data, error } = await authClient.signUp.email(
      {
        email,
        name,
        password,
      },
      {
        onError: (ctx) => {
          toast('Something went wrong');
        },
        onSuccess: (ctx) => {
          toast('Success');
        },
      }
    );
  };

  const OnLogin = async () => {
    const { data, error } = await authClient.signIn.email(
      {
        /**
         * The user email
         */
        email,
        /**
         * The user password
         */
        password,
        /**
         * A URL to redirect to after the user verifies their email (optional)
         */
        rememberMe: false,
      },
      {
        onError: (ctx) => {
          toast('Something went wrong');
        },
        onSuccess: (ctx) => {
          toast('Login Successfull');
        },
      }
    );
  };

  const logout = async () => {
    await authClient.signOut();
  };

  if (session) {
    return (
      <div className="flex flex-col p-4 gap-y-4 max-w-md">
        <p>Logged in as {session.user.name}</p>
        <Button className="cursor-pointer" onClick={logout}>
          Sign out
        </Button>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center mx-auto gap-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col space-y-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  placeholder="email"
                  type="email"
                  value={email}
                  autoComplete="nope"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>password</Label>
                <Input
                  placeholder="password"
                  type="password"
                  value={password}
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button
                className="cursor-pointer"
                type="button"
                onClick={OnLogin}
              >
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign up to your account</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col space-y-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  placeholder="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  placeholder="email"
                  type="email"
                  value={email}
                  autoComplete="nope"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>password</Label>
                <Input
                  placeholder="password"
                  type="password"
                  value={password}
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button
                className="cursor-pointer"
                type="button"
                onClick={OnSubmit}
              >
                Create User
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
