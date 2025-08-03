'use client';

import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { OctagonAlertIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z
  .object({
    name: z.string().nonempty({ message: 'Name is required' }),
    email: z
      .string()
      .nonempty({ message: 'Email is required' })
      .email({ message: 'Please enter a valid email address.' }),
    password: z
      .string()
      .nonempty({ message: 'Password is required' })
      .min(7, { message: 'Password must be at least 7 characters.' }),
    confirmPassword: z
      .string()
      .nonempty({ message: 'Confirmed Password is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const SignUpView = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setError(null);
    await authClient.signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      {
        onRequest: () => {
          setPending(true);
        },
        onSuccess: () => {
          setPending(false);
          router.push('/');
        },
        onError: ({ error }) => {
          // display the error message
          setError(error.message);
          setPending(false);
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="p-0 overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-medium text-balance">
                    Let&apos;s get Started
                  </h1>
                  <p className="text-muted-foreground">Create your account</p>
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter your name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="********"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="********"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {!!error && (
                  <Alert className="bg-destructive/10 border-none">
                    <OctagonAlertIcon className="!size-4 !text-destructive" />
                    <AlertTitle>{error}</AlertTitle>
                  </Alert>
                )}
                <Button
                  disabled={pending}
                  className="w-full bg-green-600 hover:bg-green-600 cursor-pointer"
                  type="submit"
                >
                  Sign Up
                </Button>
                <div
                  className="after:border-border relative text-center text-sm 
                             after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t"
                >
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Or Continue with
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <Button
                    disabled={pending}
                    variant={'outline'}
                    type="button"
                    className="w-full"
                  >
                    Google
                  </Button>
                  <Button
                    disabled={pending}
                    variant={'outline'}
                    type="button"
                    className="w-full"
                  >
                    Github
                  </Button>
                  <Button
                    disabled={pending}
                    variant={'outline'}
                    type="button"
                    className="w-full"
                  >
                    Apple
                  </Button>
                </div>
                <div className="text-sm text-center">
                  Already have an account?{' '}
                  <a
                    href="/sign-in"
                    className="underline hover:underline underline-offset-2"
                  >
                    Sign In
                  </a>
                </div>
              </div>
            </form>
          </Form>
          <div className="flex flex-col gap-2 justify-center items-center text-center bg-radial from-green-800 to-green-900">
            <img src="/logo.svg" alt="image" className="h-[92px] w-[92px]" />
            <h1 className="text-2xl font-medium text-white">Meet.AI</h1>
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-sm text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, youe agree to our <a href="#">Terms of Service</a>{' '}
        and <a href="#">privacy policy</a>
      </div>
    </div>
  );
};
