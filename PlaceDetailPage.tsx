import { useState } from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import { useMockSession } from '../../hooks/useMockSession';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Star, MapPin } from 'lucide-react';
import { storage } from '../../lib/localStorage';
import { calculateAverageRating } from '../../lib/ratings';
import type { PlaceReview } from '../../lib/types';

export default function PlaceDetailPage() {
  const { placeId } = useParams({ from: '/explorers-guide/$placeId' });
  const navigate = useNavigate();
  const { user } = useMockSession();
  
  const [places, setPlaces] = useState(() => storage.getPlaces());
  const place = places.find((p: any) => p.id === placeId);
  
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !place) return;

    const review: PlaceReview = {
      userId: user.userId,
      rating,
      comment,
    };

    const updatedPlaces = places.map((p: any) => {
      if (p.id === placeId) {
        return { ...p, reviews: [...p.reviews, review] };
      }
      return p;
    });

    setPlaces(updatedPlaces);
    storage.savePlaces(updatedPlaces);
    setComment('');
    setRating(5);
  };

  if (!place) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => navigate({ to: '/explorers-guide' })} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Places
        </Button>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Place not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const avgRating = calculateAverageRating(place.reviews);

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => navigate({ to: '/explorers-guide' })} className="gap-2">
        <ArrowLeft className="w-4 h-4" />
        Back to Places
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2 flex-1">
              <CardTitle className="text-2xl">{place.name}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Badge variant="secondary">{place.category}</Badge>
                {avgRating > 0 && (
                  <Badge variant="outline" className="gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    {avgRating.toFixed(1)} ({place.reviews.length} reviews)
                  </Badge>
                )}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground">{place.description}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Address
            </h3>
            <p className="text-muted-foreground">{place.address}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reviews</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {place.reviews.length > 0 ? (
            <div className="space-y-4">
              {place.reviews.map((review: PlaceReview, idx: number) => (
                <div key={idx} className="border-b pb-4 last:border-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? 'fill-primary text-primary' : 'text-muted'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">by User {review.userId.slice(-8)}</span>
                  </div>
                  <p className="text-sm">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              No reviews yet. Be the first to review!
            </p>
          )}

          <form onSubmit={handleSubmitReview} className="border-t pt-6 space-y-4">
            <h3 className="font-semibold">Add Your Review</h3>
            <div className="space-y-2">
              <Label>Rating</Label>
              <div className="flex gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setRating(i + 1)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-6 h-6 transition-colors ${
                        i < rating ? 'fill-primary text-primary' : 'text-muted hover:text-primary/50'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="comment">Comment</Label>
              <Textarea
                id="comment"
                placeholder="Share your experience..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Submit Review
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
