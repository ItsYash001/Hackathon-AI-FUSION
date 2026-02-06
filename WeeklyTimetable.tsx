import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import type { TimetableEntry } from '../../lib/types';
import { DayOfWeek } from '../../lib/types';

interface WeeklyTimetableProps {
  entries: TimetableEntry[];
  onEdit: (entry: TimetableEntry) => void;
  onDelete: (entryId: string) => void;
}

const DAYS_ORDER = [
  DayOfWeek.Monday,
  DayOfWeek.Tuesday,
  DayOfWeek.Wednesday,
  DayOfWeek.Thursday,
  DayOfWeek.Friday,
  DayOfWeek.Saturday,
  DayOfWeek.Sunday,
];

export default function WeeklyTimetable({ entries, onEdit, onDelete }: WeeklyTimetableProps) {
  const entriesByDay = DAYS_ORDER.map(day => ({
    day,
    entries: entries
      .filter(e => e.day === day)
      .sort((a, b) => a.startTime.localeCompare(b.startTime)),
  }));

  return (
    <div className="space-y-4">
      {entriesByDay.map(({ day, entries: dayEntries }) => (
        <Card key={day}>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg capitalize">{day}</CardTitle>
          </CardHeader>
          <CardContent>
            {dayEntries.length > 0 ? (
              <div className="space-y-2">
                {dayEntries.map(entry => (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold">{entry.courseName}</h4>
                      <p className="text-sm text-muted-foreground">
                        {entry.startTime} - {entry.endTime} • {entry.location}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(entry)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(entry.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                No classes scheduled
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
