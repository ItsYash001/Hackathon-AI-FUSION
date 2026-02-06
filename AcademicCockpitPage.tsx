import { useState } from 'react';
import { useMockSession } from '../../hooks/useMockSession';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import WeeklyTimetable from '../../components/timetable/WeeklyTimetable';
import TimetableEntryForm from '../../components/timetable/TimetableEntryForm';
import { storage } from '../../lib/localStorage';
import type { TimetableEntry } from '../../lib/types';

export default function AcademicCockpitPage() {
  const { user } = useMockSession();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<TimetableEntry | null>(null);
  
  const allTimetables = storage.getTimetables();
  const userEntries = user ? (allTimetables[user.userId] || []) : [];
  const [entries, setEntries] = useState<TimetableEntry[]>(userEntries);

  const handleSaveEntry = (entry: TimetableEntry) => {
    if (!user) return;

    let updated: TimetableEntry[];
    if (editingEntry) {
      updated = entries.map(e => e.id === entry.id ? entry : e);
    } else {
      updated = [...entries, entry];
    }

    setEntries(updated);
    const allUpdated = { ...allTimetables, [user.userId]: updated };
    storage.saveTimetables(allUpdated);
    
    setIsDialogOpen(false);
    setEditingEntry(null);
  };

  const handleDeleteEntry = (entryId: string) => {
    if (!user) return;

    const updated = entries.filter(e => e.id !== entryId);
    setEntries(updated);
    
    const allUpdated = { ...allTimetables, [user.userId]: updated };
    storage.saveTimetables(allUpdated);
  };

  const handleEditEntry = (entry: TimetableEntry) => {
    setEditingEntry(entry);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Academic Cockpit</h1>
          <p className="text-muted-foreground">Manage your class schedule</p>
        </div>
        <Dialog 
          open={isDialogOpen} 
          onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) setEditingEntry(null);
          }}
        >
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Class
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingEntry ? 'Edit Class' : 'Add New Class'}</DialogTitle>
              <DialogDescription>
                {editingEntry ? 'Update class details' : 'Add a class to your timetable'}
              </DialogDescription>
            </DialogHeader>
            <TimetableEntryForm
              entry={editingEntry}
              onSave={handleSaveEntry}
              onCancel={() => {
                setIsDialogOpen(false);
                setEditingEntry(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Timetable</CardTitle>
          <CardDescription>Your class schedule for the week</CardDescription>
        </CardHeader>
        <CardContent>
          <WeeklyTimetable
            entries={entries}
            onEdit={handleEditEntry}
            onDelete={handleDeleteEntry}
          />
        </CardContent>
      </Card>
    </div>
  );
}
