import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useMockSession } from '../hooks/useMockSession';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const PRESET_USERS = [
  'Alex Kumar',
  'Priya Sharma',
  'Rahul Verma',
  'Sneha Patel',
];

export default function MockLoginPage() {
  const [displayName, setDisplayName] = useState('');
  const { login, isLoggedIn } = useMockSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate({ to: '/dashboard' });
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = (name: string) => {
    if (name.trim()) {
      login(name.trim());
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(displayName);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background p-4">
      <div className="w-full max-w-4xl mb-8">
        <img
          src="/assets/generated/campus-hero.dim_1600x600.png"
          alt="Campus Hero"
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>

      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <img
              src="/assets/generated/campus-logo.dim_512x512.png"
              alt="Campus Logo"
              className="w-24 h-24"
            />
          </div>
          <CardTitle className="text-3xl font-bold">Campus Super-App</CardTitle>
          <CardDescription className="text-base">
            Demo Login - Enter your name to explore the prototype
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                type="text"
                placeholder="Enter your name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="text-base"
              />
            </div>
            <Button type="submit" className="w-full" size="lg" disabled={!displayName.trim()}>
              Continue
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or choose a preset</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {PRESET_USERS.map((name) => (
              <Button
                key={name}
                variant="outline"
                onClick={() => handleLogin(name)}
                className="text-sm"
              >
                {name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>© 2026. Built with ❤️ using <a href="https://caffeine.ai" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">caffeine.ai</a></p>
      </footer>
    </div>
  );
}
