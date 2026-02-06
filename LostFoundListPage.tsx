import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Search } from 'lucide-react';
import { format } from 'date-fns';
import { storage } from '../../../lib/localStorage';
import type { LostFoundPost } from '../../../lib/types';

export default function LostFoundListPage() {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [posts, setPosts] = useState<LostFoundPost[]>(() => storage.getLostFoundPosts());
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    isFound: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const post: LostFoundPost = {
      id: `lf_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title: formData.title,
      description: formData.description,
      isFound: formData.isFound,
      timestamp: BigInt(Date.now()) * BigInt(1_000_000),
    };
    
    const updated = [...posts, post];
    setPosts(updated);
    storage.saveLostFoundPosts(updated);
    setIsDialogOpen(false);
    setFormData({ title: '', description: '', isFound: false });
  };

  const handleCardClick = (postId: string) => {
    navigate({ to: '/student-exchange/lost-found/$postId', params: { postId } });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lost & Found</h1>
          <p className="text-muted-foreground">Report missing items and found items</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              New Post
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Lost & Found Post</DialogTitle>
              <DialogDescription>Report a lost or found item</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Lost Blue Backpack"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
              <div className="flex items-center gap-4">
                <Label>Type:</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={!formData.isFound ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFormData({ ...formData, isFound: false })}
                  >
                    Lost
                  </Button>
                  <Button
                    type="button"
                    variant={formData.isFound ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFormData({ ...formData, isFound: true })}
                  >
                    Found
                  </Button>
                </div>
              </div>
              <Button type="submit" className="w-full">
                Create Post
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {posts.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="hover:shadow-lg transition-all cursor-pointer h-full"
              onClick={() => handleCardClick(post.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg line-clamp-1">{post.title}</CardTitle>
                  <Badge variant={post.isFound ? 'default' : 'secondary'}>
                    {post.isFound ? 'Found' : 'Lost'}
                  </Badge>
                </div>
                <CardDescription className="line-clamp-2">
                  {post.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(Number(post.timestamp / BigInt(1_000_000))), 'PPp')}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Search className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No posts yet. Be the first to create one!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
