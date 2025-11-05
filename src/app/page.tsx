'use client';

import { useState, useMemo } from 'react';
import type { Assignment, Class } from '@/lib/types';
import { ASSIGNMENTS, CLASSES } from '@/lib/data';
import Header from '@/components/header';
import { AddAssignmentDialog } from '@/components/add-assignment-dialog';
import { AssignmentList } from '@/components/assignment-list';

export default function Home() {
  const [assignments, setAssignments] = useState<Assignment[]>(ASSIGNMENTS);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleAddAssignment = (newAssignmentData: Omit<Assignment, 'id' | 'completed'>) => {
    const newAssignment: Assignment = {
      ...newAssignmentData,
      id: Date.now().toString(),
      completed: false,
    };
    setAssignments(prev => [...prev, newAssignment]);
    setIsAddDialogOpen(false);
  };

  const handleToggleComplete = (id: string) => {
    setAssignments(prev =>
      prev.map(a => (a.id === id ? { ...a, completed: !a.completed } : a))
    );
  };

  const handleDeleteAssignment = (id: string) => {
    setAssignments(prev => prev.filter(a => a.id !== id));
  };

  const sortedAssignments = useMemo(() => {
    return [...assignments].sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
  }, [assignments]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header onAddAssignment={() => setIsAddDialogOpen(true)} />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <AssignmentList
          assignments={sortedAssignments}
          classes={CLASSES}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDeleteAssignment}
        />
      </main>
      <AddAssignmentDialog
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAddAssignment={handleAddAssignment}
        classes={CLASSES}
      />
    </div>
  );
}
