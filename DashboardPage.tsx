import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Users, MapPin, GraduationCap, ArrowRight } from 'lucide-react';

const modules = [
  {
    title: 'Daily Pulse',
    description: 'Real-time campus information at your fingertips',
    icon: Calendar,
    to: '/daily-pulse',
    features: ['Live Mess Menu', 'Mail Summarizer', 'Campus Updates'],
    color: 'from-amber-500/10 to-orange-500/10',
  },
  {
    title: 'Student Exchange',
    description: 'Your campus marketplace and collaboration hub',
    icon: Users,
    to: '/student-exchange',
    features: ['Lost & Found', 'Buy/Sell Marketplace', 'Travel Sharing'],
    color: 'from-emerald-500/10 to-teal-500/10',
  },
  {
    title: "Explorer's Guide",
    description: 'Discover and navigate your local ecosystem',
    icon: MapPin,
    to: '/explorers-guide',
    features: ['Nearby Hub', 'Reviews & Ratings', 'Hidden Spots'],
    color: 'from-rose-500/10 to-pink-500/10',
  },
  {
    title: 'Academic Cockpit',
    description: 'Your command center for academic success',
    icon: GraduationCap,
    to: '/academic-cockpit',
    features: ['Live Timetable', 'Class Management', 'Schedule Updates'],
    color: 'from-indigo-500/10 to-purple-500/10',
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Welcome to Campus Super-App</h1>
        <p className="text-lg text-muted-foreground">
          Your all-in-one platform for campus life. Explore the four foundational modules below.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {modules.map((module) => (
          <Card key={module.to} className="group hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${module.color} flex items-center justify-center mb-4`}>
                <module.icon className="w-6 h-6" />
              </div>
              <CardTitle className="text-2xl">{module.title}</CardTitle>
              <CardDescription className="text-base">{module.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {module.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link to={module.to}>
                <Button className="w-full group-hover:gap-3 transition-all" variant="secondary">
                  Explore {module.title}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
