import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, ShoppingBag, ArrowUpDown } from 'lucide-react';
import { format } from 'date-fns';
import { storage } from '../../../lib/localStorage';
import type { MarketplaceListing } from '../../../lib/types';

export default function MarketplaceListPage() {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sortAsc, setSortAsc] = useState(true);
  const [listings, setListings] = useState<MarketplaceListing[]>(() => storage.getMarketplaceListings());
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    description: '',
  });

  const sortedListings = [...listings].sort((a, b) => 
    sortAsc ? a.price - b.price : b.price - a.price
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const listing: MarketplaceListing = {
      id: `mp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title: formData.title,
      price: parseFloat(formData.price),
      category: formData.category,
      description: formData.description,
      timestamp: BigInt(Date.now()) * BigInt(1_000_000),
      isForSale: true,
    };
    
    const updated = [...listings, listing];
    setListings(updated);
    storage.saveMarketplaceListings(updated);
    setIsDialogOpen(false);
    setFormData({ title: '', price: '', category: '', description: '' });
  };

  const handleCardClick = (listingId: string) => {
    navigate({ to: '/student-exchange/marketplace/$listingId', params: { listingId } });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Marketplace</h1>
          <p className="text-muted-foreground">Buy and sell items within the campus community</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => setSortAsc(!sortAsc)}>
            <ArrowUpDown className="w-4 h-4" />
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                New Listing
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Marketplace Listing</DialogTitle>
                <DialogDescription>List an item for sale</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Textbook for CS101"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    placeholder="500"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    placeholder="e.g., Books, Electronics"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide details about the item..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Create Listing
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {sortedListings.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sortedListings.map((listing) => (
            <Card
              key={listing.id}
              className="hover:shadow-lg transition-all cursor-pointer h-full"
              onClick={() => handleCardClick(listing.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg line-clamp-1">{listing.title}</CardTitle>
                  <Badge variant="default" className="font-bold">
                    ₹{listing.price}
                  </Badge>
                </div>
                <CardDescription className="line-clamp-1">
                  {listing.category}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground line-clamp-2">{listing.description}</p>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(Number(listing.timestamp / BigInt(1_000_000))), 'PPp')}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ShoppingBag className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No listings yet. Be the first to create one!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
