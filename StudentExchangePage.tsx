import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, ShoppingBag, Car, ArrowRight } from 'lucide-react';

const sections = [
  {
    title: 'Lost & Found',
    description: 'Report missing items and found items',
    icon: Search,
    to: '/student-exchange/lost-found',
    color: 'from-blue-500/10 to-cyan-500/10',
  },
  {
    title: 'Marketplace',
    description: 'Buy and sell textbooks, electronics, and more',
    icon: ShoppingBag,
    to: '/student-exchange/marketplace',
    color: 'from-green-500/10 to-emerald-500/10',
  },
  {
    title: 'Travel Sharing',
    description: 'Find travel companions and share rides',
    icon: Car,
    to: '/student-exchange/travel',
    color: 'from-purple-500/10 to-pink-500/10',
  },
];

export default function StudentExchangePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Student Exchange</h1>
        <p className="text-muted-foreground">Your campus marketplace and collaboration hub</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {sections.map((section) => (
          <Card key={section.to} className="group hover:shadow-lg transition-all">
            <CardHeader>
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${section.color} flex items-center justify-center mb-4`}>
                <section.icon className="w-6 h-6" />
              </div>
              <CardTitle>{section.title}</CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link to={section.to}>
                <Button className="w-full group-hover:gap-3 transition-all" variant="secondary">
                  Open
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
