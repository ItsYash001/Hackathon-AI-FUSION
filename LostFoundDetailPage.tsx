import { useParams, useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { storage } from '../../../lib/localStorage';

export default function LostFoundDetailPage() {
  const { postId } = useParams({ from: '/student-exchange/lost-found/$postId' });
  const navigate = useNavigate();
  
  const posts = storage.getLostFoundPosts();
  const post = posts.find((p: any) => p.id === postId);

  if (!post) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => navigate({ to: '/student-exchange/lost-found' })} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to List
        </Button>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Post not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => navigate({ to: '/student-exchange/lost-found' })} className="gap-2">
        <ArrowLeft className="w-4 h-4" />
        Back to List
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2 flex-1">
              <CardTitle className="text-2xl">{post.title}</CardTitle>
              <CardDescription>
                Posted on {format(new Date(Number(post.timestamp / BigInt(1_000_000))), 'PPP')}
              </CardDescription>
            </div>
            <Badge variant={post.isFound ? 'default' : 'secondary'} className="text-base px-4 py-1">
              {post.isFound ? 'Found' : 'Lost'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground whitespace-pre-wrap">{post.description}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
