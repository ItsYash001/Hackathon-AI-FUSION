import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, MapPin, Star } from 'lucide-react';
import { storage } from '../../lib/localStorage';
import { calculateAverageRating } from '../../lib/ratings';
import type { Place } from '../../lib/types';

export default function PlacesListPage() {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [places, setPlaces] = useState<Place[]>(() => storage.getPlaces());
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    address: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const place: Place = {
      id: `place_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: formData.name,
      category: formData.category,
      description: formData.description,
      address: formData.address,
      reviews: [],
    };
    
    const updated = [...places, place];
    setPlaces(updated);
    storage.savePlaces(updated);
    setIsDialogOpen(false);
    setFormData({ name: '', category: '', description: '', address: '' });
  };

  const handleCardClick = (placeId: string) => {
    navigate({ to: '/explorers-guide/$placeId', params: { placeId } });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Explorer's Guide</h1>
          <p className="text-muted-foreground">Discover and review local places</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Place
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Place</DialogTitle>
              <DialogDescription>Share a local spot with the community</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Campus Cafe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  placeholder="e.g., Restaurant, Library"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  placeholder="e.g., Main Street, Block A"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the place..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Add Place
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {places.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {places.map((place) => {
            const avgRating = calculateAverageRating(place.reviews);
            
            return (
              <Card
                key={place.id}
                className="hover:shadow-lg transition-all cursor-pointer h-full"
                onClick={() => handleCardClick(place.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-lg line-clamp-1">{place.name}</CardTitle>
                    {avgRating > 0 && (
                      <Badge variant="secondary" className="gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        {avgRating.toFixed(1)}
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="line-clamp-1">
                    {place.category}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground line-clamp-2">{place.description}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    <span className="line-clamp-1">{place.address}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {place.reviews.length} review{place.reviews.length !== 1 ? 's' : ''}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <MapPin className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No places yet. Be the first to add one!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
