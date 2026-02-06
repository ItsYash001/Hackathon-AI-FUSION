import { Badge } from '@/components/ui/badge';
import { Info } from 'lucide-react';

export default function DemoSessionIndicator() {
  return (
    <Badge variant="outline" className="gap-2 py-1.5 px-3">
      <Info className="w-3.5 h-3.5" />
      <span>Demo Mode</span>
    </Badge>
  );
}
