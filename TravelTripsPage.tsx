import { useState } from 'react';
import { useMockSession } from '../../../hooks/useMockSession';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, MapPin, Users } from 'lucide-react';
import { format } from 'date-fns';
import { storage } from '../../../lib/localStorage';
import type { TravelTrip } from '../../../lib/types';

export default function TravelTripsPage() {
  const { user } = useMockSession();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [trips, setTrips] = useState<TravelTrip[]>(() => storage.getTravelTrips());
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    datetime: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trip: TravelTrip = {
      id: `trip_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      origin: formData.origin,
      destination: formData.destination,
      timestamp: BigInt(new Date(formData.datetime).getTime()) * BigInt(1_000_000),
      participants: [user?.userId || 'unknown'],
    };
    
    const updated = [...trips, trip];
    setTrips(updated);
    storage.saveTravelTrips(updated);
    setIsDialogOpen(false);
    setFormData({ origin: '', destination: '', datetime: '' });
  };

  const handleJoinTrip = (tripId: string) => {
    if (!user) return;
    
    const updated = trips.map(trip => {
      if (trip.id === tripId && !trip.participants.includes(user.userId)) {
        return { ...trip, participants: [...trip.participants, user.userId] };
      }
      return trip;
    });
    
    setTrips(updated);
    storage.saveTravelTrips(updated);
  };

  const handleLeaveTrip = (tripId: string) => {
    if (!user) return;
    
    const updated = trips.map(trip => {
      if (trip.id === tripId) {
        return { ...trip, participants: trip.participants.filter(p => p !== user.userId) };
      }
      return trip;
    });
    
    setTrips(updated);
    storage.saveTravelTrips(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Travel Sharing</h1>
          <p className="text-muted-foreground">Find travel companions and share rides</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              New Trip
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Travel Trip</DialogTitle>
              <DialogDescription>Share your travel plans</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="origin">Origin</Label>
                <Input
                  id="origin"
                  placeholder="e.g., Campus Gate"
                  value={formData.origin}
                  onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <Input
                  id="destination"
                  placeholder="e.g., City Center"
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="datetime">Date & Time</Label>
                <Input
                  id="datetime"
                  type="datetime-local"
                  value={formData.datetime}
                  onChange={(e) => setFormData({ ...formData, datetime: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Create Trip
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {trips.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {trips.map((trip) => {
            const isParticipant = user && trip.participants.includes(user.userId);
            
            return (
              <Card key={trip.id} className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    {trip.origin} → {trip.destination}
                  </CardTitle>
                  <CardDescription>
                    {format(new Date(Number(trip.timestamp / BigInt(1_000_000))), 'PPp')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {trip.participants.length} participant{trip.participants.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  {isParticipant ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => handleLeaveTrip(trip.id)}
                    >
                      Leave Trip
                    </Button>
                  ) : (
                    <Button
                      variant="default"
                      size="sm"
                      className="w-full"
                      onClick={() => handleJoinTrip(trip.id)}
                    >
                      Join Trip
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <MapPin className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No trips yet. Be the first to create one!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
