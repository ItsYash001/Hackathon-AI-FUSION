import { useParams, useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { storage } from '../../../lib/localStorage';

export default function MarketplaceDetailPage() {
  const { listingId } = useParams({ from: '/student-exchange/marketplace/$listingId' });
  const navigate = useNavigate();
  
  const listings = storage.getMarketplaceListings();
  const listing = listings.find((l: any) => l.id === listingId);

  if (!listing) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => navigate({ to: '/student-exchange/marketplace' })} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Marketplace
        </Button>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Listing not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => navigate({ to: '/student-exchange/marketplace' })} className="gap-2">
        <ArrowLeft className="w-4 h-4" />
        Back to Marketplace
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2 flex-1">
              <CardTitle className="text-2xl">{listing.title}</CardTitle>
              <CardDescription>
                Posted on {format(new Date(Number(listing.timestamp / BigInt(1_000_000))), 'PPP')}
              </CardDescription>
            </div>
            <Badge variant="default" className="text-xl px-6 py-2 font-bold">
              ₹{listing.price}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Category</h3>
            <Badge variant="secondary">{listing.category}</Badge>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground whitespace-pre-wrap">{listing.description}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
