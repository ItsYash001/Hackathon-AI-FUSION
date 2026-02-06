import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Utensils, Mail } from 'lucide-react';
import { format } from 'date-fns';
import { summarizeEmail } from '../../lib/summarizer';
import { storage } from '../../lib/localStorage';
import type { MessMenu } from '../../lib/types';

export default function DailyPulsePage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [emailText, setEmailText] = useState('');
  const [summary, setSummary] = useState<string[]>([]);
  const [messMenus, setMessMenus] = useState<Record<string, MessMenu>>(() => storage.getMessMenus());

  const [menuForm, setMenuForm] = useState({
    breakfast: '',
    lunch: '',
    dinner: '',
  });

  const dateKey = format(selectedDate, 'yyyy-MM-dd');
  const currentMenu = messMenus[dateKey];

  const handleAddMenu = () => {
    const menu: MessMenu = {
      date: BigInt(selectedDate.getTime()) * BigInt(1_000_000),
      breakfast: menuForm.breakfast.split(',').map(s => s.trim()).filter(Boolean),
      lunch: menuForm.lunch.split(',').map(s => s.trim()).filter(Boolean),
      dinner: menuForm.dinner.split(',').map(s => s.trim()).filter(Boolean),
    };
    
    const updated = { ...messMenus, [dateKey]: menu };
    setMessMenus(updated);
    storage.saveMessMenus(updated);
    setMenuForm({ breakfast: '', lunch: '', dinner: '' });
  };

  const handleSummarize = () => {
    const result = summarizeEmail(emailText);
    setSummary(result);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Daily Pulse</h1>
        <p className="text-muted-foreground">Real-time campus information at your fingertips</p>
      </div>

      <Tabs defaultValue="mess-menu" className="space-y-4">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="mess-menu" className="gap-2">
            <Utensils className="w-4 h-4" />
            Mess Menu
          </TabsTrigger>
          <TabsTrigger value="mail-summarizer" className="gap-2">
            <Mail className="w-4 h-4" />
            Mail Summarizer
          </TabsTrigger>
        </TabsList>

        <TabsContent value="mess-menu" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Live Mess Menu</CardTitle>
              <CardDescription>View and manage daily meal schedules</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Label>Select Date:</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <CalendarIcon className="w-4 h-4" />
                      {format(selectedDate, 'PPP')}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => date && setSelectedDate(date)}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {currentMenu ? (
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Breakfast</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-1">
                          {currentMenu.breakfast.map((item, i) => (
                            <li key={i} className="text-sm">{item}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Lunch</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-1">
                          {currentMenu.lunch.map((item, i) => (
                            <li key={i} className="text-sm">{item}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Dinner</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-1">
                          {currentMenu.dinner.map((item, i) => (
                            <li key={i} className="text-sm">{item}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No menu available for this date. Add one below.
                </p>
              )}

              <div className="border-t pt-6 space-y-4">
                <h3 className="font-semibold">Add/Update Menu</h3>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="breakfast">Breakfast (comma-separated)</Label>
                    <Input
                      id="breakfast"
                      placeholder="Idli, Sambar, Chutney"
                      value={menuForm.breakfast}
                      onChange={(e) => setMenuForm({ ...menuForm, breakfast: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lunch">Lunch (comma-separated)</Label>
                    <Input
                      id="lunch"
                      placeholder="Rice, Dal, Sabzi, Roti"
                      value={menuForm.lunch}
                      onChange={(e) => setMenuForm({ ...menuForm, lunch: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dinner">Dinner (comma-separated)</Label>
                    <Input
                      id="dinner"
                      placeholder="Paneer, Roti, Rice, Dal"
                      value={menuForm.dinner}
                      onChange={(e) => setMenuForm({ ...menuForm, dinner: e.target.value })}
                    />
                  </div>
                  <Button onClick={handleAddMenu} className="w-full">
                    Save Menu
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mail-summarizer" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mail Summarizer</CardTitle>
              <CardDescription>
                Paste lengthy college emails and get concise action items
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Content</Label>
                <Textarea
                  id="email"
                  placeholder="Paste your email here..."
                  value={emailText}
                  onChange={(e) => setEmailText(e.target.value)}
                  rows={10}
                  className="font-mono text-sm"
                />
              </div>
              <Button
                onClick={handleSummarize}
                disabled={!emailText.trim()}
                className="w-full"
              >
                Summarize
              </Button>

              {summary.length > 0 && (
                <div className="border rounded-lg p-4 space-y-3 bg-muted/50">
                  <h3 className="font-semibold">Action Items:</h3>
                  <ul className="space-y-2">
                    {summary.map((item, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="font-semibold text-primary">{i + 1}.</span>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
