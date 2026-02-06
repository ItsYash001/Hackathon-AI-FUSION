import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { TimetableEntry } from '../../lib/types';
import { DayOfWeek } from '../../lib/types';

interface TimetableEntryFormProps {
  entry?: TimetableEntry | null;
  onSave: (entry: TimetableEntry) => void;
  onCancel: () => void;
}

const DAYS = [
  { value: DayOfWeek.Monday, label: 'Monday' },
  { value: DayOfWeek.Tuesday, label: 'Tuesday' },
  { value: DayOfWeek.Wednesday, label: 'Wednesday' },
  { value: DayOfWeek.Thursday, label: 'Thursday' },
  { value: DayOfWeek.Friday, label: 'Friday' },
  { value: DayOfWeek.Saturday, label: 'Saturday' },
  { value: DayOfWeek.Sunday, label: 'Sunday' },
];

export default function TimetableEntryForm({ entry, onSave, onCancel }: TimetableEntryFormProps) {
  const [formData, setFormData] = useState({
    courseName: entry?.courseName || '',
    day: entry?.day || DayOfWeek.Monday,
    startTime: entry?.startTime || '',
    endTime: entry?.endTime || '',
    location: entry?.location || '',
  });

  useEffect(() => {
    if (entry) {
      setFormData({
        courseName: entry.courseName,
        day: entry.day,
        startTime: entry.startTime,
        endTime: entry.endTime,
        location: entry.location,
      });
    }
  }, [entry]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newEntry: TimetableEntry = {
      id: entry?.id || `tt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      courseName: formData.courseName,
      day: formData.day,
      startTime: formData.startTime,
      endTime: formData.endTime,
      location: formData.location,
    };

    onSave(newEntry);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="courseName">Course Name</Label>
        <Input
          id="courseName"
          placeholder="e.g., Computer Science 101"
          value={formData.courseName}
          onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="day">Day</Label>
        <Select
          value={formData.day}
          onValueChange={(value) => setFormData({ ...formData, day: value as DayOfWeek })}
        >
          <SelectTrigger id="day">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {DAYS.map(day => (
              <SelectItem key={day.value} value={day.value}>
                {day.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startTime">Start Time</Label>
          <Input
            id="startTime"
            type="time"
            value={formData.startTime}
            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endTime">End Time</Label>
          <Input
            id="endTime"
            type="time"
            value={formData.endTime}
            onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          placeholder="e.g., Room 301, Building A"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          required
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1">
          {entry ? 'Update' : 'Add'} Class
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
      </div>
    </form>
  );
}
