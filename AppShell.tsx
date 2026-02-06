import { ReactNode } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useMockSession } from '../hooks/useMockSession';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, LogOut, Home, Calendar, Users, MapPin, GraduationCap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AppShellProps {
  children: ReactNode;
}

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: Home },
  { to: '/daily-pulse', label: 'Daily Pulse', icon: Calendar },
  { to: '/student-exchange', label: 'Student Exchange', icon: Users },
  { to: '/explorers-guide', label: "Explorer's Guide", icon: MapPin },
  { to: '/academic-cockpit', label: 'Academic Cockpit', icon: GraduationCap },
];

export default function AppShell({ children }: AppShellProps) {
  const { user, logout } = useMockSession();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate({ to: '/login' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <nav className="flex flex-col gap-2 mt-8">
                  {navItems.map((item) => (
                    <Link key={item.to} to={item.to}>
                      <Button variant="ghost" className="w-full justify-start gap-2">
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </Button>
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link to="/dashboard" className="flex items-center gap-2">
              <img
                src="/assets/generated/campus-logo.dim_512x512.png"
                alt="Campus Logo"
                className="h-8 w-8"
              />
              <span className="font-bold text-lg hidden sm:inline-block">Campus Super-App</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 ml-6">
              {navItems.map((item) => (
                <Link key={item.to} to={item.to}>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>

          {/* User Info & Logout */}
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="hidden sm:flex">
              Demo Mode
            </Badge>
            <span className="text-sm font-medium hidden sm:inline-block">{user?.displayName}</span>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline-block">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container py-8 px-4">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t py-6 bg-muted/30">
        <div className="container px-4 text-center text-sm text-muted-foreground">
          <p>© 2026. Built with ❤️ using <a href="https://caffeine.ai" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">caffeine.ai</a></p>
        </div>
      </footer>
    </div>
  );
}
