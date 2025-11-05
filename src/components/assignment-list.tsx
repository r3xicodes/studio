'use client';

import { useMemo } from 'react';
import { isPast, isToday, isThisWeek } from 'date-fns';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Assignment } from '@/lib/types';
import { AssignmentCard } from './assignment-card';
import { findClassById } from '@/lib/utils';

type AssignmentListProps = {
  assignments: Assignment[];
  onToggleComplete: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
};

export function AssignmentList({ assignments, onToggleComplete, onDelete }: AssignmentListProps) {
  const upcomingAssignments = useMemo(() => assignments.filter(a => !a.completed), [assignments]);
  const completedAssignments = useMemo(() => assignments.filter(a => a.completed), [assignments]);

  const groupedByClass = useMemo(() => {
    const classes = upcomingAssignments.reduce((acc, assignment) => {
        const classInfo = findClassById(assignment.classId);
        if (classInfo) {
            if (!acc[classInfo.id]) {
            acc[classInfo.id] = { ...classInfo, assignments: [] };
            }
            acc[classInfo.id].assignments.push(assignment);
        }
        return acc;
    }, {} as Record<string, { id: string; name: string; icon: any; assignments: Assignment[] }>);
    
    return Object.values(classes);
  }, [upcomingAssignments]);

  const statusGroups = useMemo(() => {
    const groups = {
      overdue: upcomingAssignments.filter(a => isPast(a.dueDate) && !isToday(a.dueDate)),
      today: upcomingAssignments.filter(a => isToday(a.dueDate)),
      thisWeek: upcomingAssignments.filter(a => isThisWeek(a.dueDate, { weekStartsOn: 1 }) && !isToday(a.dueDate) && !isPast(a.dueDate)),
      later: upcomingAssignments.filter(a => !isThisWeek(a.dueDate, { weekStartsOn: 1 }) && !isToday(a.dueDate) && !isPast(a.dueDate)),
    };
    return groups;
  }, [upcomingAssignments]);

  const renderAssignmentList = (assignments: Assignment[]) => (
    <div className="space-y-3">
      {assignments.map(assignment => (
        <AssignmentCard
          key={assignment.id}
          assignment={assignment}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
        />
      ))}
    </div>
  );

  return (
    <Tabs defaultValue="status" className="w-full">
      <TabsList className="grid w-full grid-cols-2 sm:w-[400px]">
        <TabsTrigger value="status">By Status</TabsTrigger>
        <TabsTrigger value="class">By Class</TabsTrigger>
      </TabsList>
      <TabsContent value="status" className="mt-6 space-y-6">
        {Object.entries(statusGroups).map(([key, value]) =>
          value.length > 0 ? (
            <div key={key}>
              <h2 className="text-xl font-bold mb-3 capitalize font-headline">
                {key.replace(/([A-Z])/g, ' $1')}
              </h2>
              {renderAssignmentList(value)}
            </div>
          ) : null
        )}
        
        {upcomingAssignments.length === 0 && (
             <div className="flex h-40 flex-col items-center justify-center rounded-lg border-2 border-dashed bg-card/50">
                <p className="text-xl font-semibold text-foreground">All caught up!</p>
                <p className="text-muted-foreground">You have no upcoming assignments.</p>
            </div>
        )}

        {completedAssignments.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-3 font-headline">Completed</h2>
            {renderAssignmentList(completedAssignments.slice(0, 5).sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime()))}
             {completedAssignments.length > 5 && <p className="text-center text-sm text-muted-foreground mt-2">...and {completedAssignments.length - 5} more.</p>}
          </div>
        )}
      </TabsContent>
      <TabsContent value="class" className="mt-4">
        {groupedByClass.length > 0 ? (
          <Accordion type="multiple" defaultValue={groupedByClass.map(c => c.id)} className="w-full">
            {groupedByClass.map(c => (
              <AccordionItem value={c.id} key={c.id}>
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  <div className="flex items-center gap-3">
                    <c.icon className="h-5 w-5 text-primary" />
                    <span>{c.name}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2">
                  {renderAssignmentList(c.assignments)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
            <div className="flex h-40 flex-col items-center justify-center rounded-lg border-2 border-dashed bg-card/50">
                <p className="text-xl font-semibold text-foreground">All caught up!</p>
                <p className="text-muted-foreground">You have no upcoming assignments.</p>
            </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
