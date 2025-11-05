'use client';

import { format, isPast, isToday } from 'date-fns';
import { MoreHorizontal, Trash2 } from 'lucide-react';
import { cn, findClassById } from '@/lib/utils';
import type { Assignment } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type AssignmentCardProps = {
  assignment: Assignment;
  onToggleComplete: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
};

export function AssignmentCard({ assignment, onToggleComplete, onDelete }: AssignmentCardProps) {
  const assignmentClass = findClassById(assignment.classId);
  const isOverdue = isPast(assignment.dueDate) && !isToday(assignment.dueDate) && !assignment.completed;
  const cardId = `assignment-${assignment.id}`;

  const dueDateText = () => {
    if (isOverdue) return `Overdue`;
    if (isToday(assignment.dueDate)) return 'Due Today';
    return `Due ${format(assignment.dueDate, 'PPP')}`;
  };

  return (
    <Card className={cn('transition-all hover:shadow-md', assignment.completed && 'bg-card/60')}>
      <CardContent className="flex items-start gap-4 p-4">
        <Checkbox
          id={cardId}
          checked={assignment.completed}
          onCheckedChange={() => onToggleComplete(assignment.id, assignment.completed)}
          aria-label={`Mark "${assignment.title}" as complete`}
          className="mt-1.5 h-5 w-5"
        />
        <div className="grid flex-1 gap-1">
          <label
            htmlFor={cardId}
            className={cn(
              'cursor-pointer font-semibold',
              assignment.completed && 'text-muted-foreground line-through'
            )}
          >
            {assignment.title}
          </label>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <p
              className={cn(
                'text-muted-foreground',
                isOverdue && 'font-semibold text-destructive'
              )}
            >
              {dueDateText()}
            </p>
            {assignmentClass && (
              <Badge variant="secondary" className="flex items-center gap-1.5">
                <assignmentClass.icon className="h-3.5 w-3.5" />
                {assignmentClass.name}
              </Badge>
            )}
          </div>
          {assignment.notes && !assignment.completed && (
            <p className="text-sm text-muted-foreground pt-1">{assignment.notes}</p>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onDelete(assignment.id)} className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  );
}
