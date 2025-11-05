'use client';

import { useState, useMemo } from 'react';
import type { Assignment } from '@/lib/types';
import { CLASSES } from '@/lib/data';
import Header from '@/components/header';
import { AddAssignmentDialog } from '@/components/add-assignment-dialog';
import { AssignmentList } from '@/components/assignment-list';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { addDocumentNonBlocking, deleteDocumentNonBlocking, updateDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { collection, doc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();

  const assignmentsCollection = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return collection(firestore, `users/${user.uid}/assignments`);
  }, [user, firestore]);

  const { data: assignments, isLoading } = useCollection<Omit<Assignment, 'dueDate' | 'suggestedStartDate'> & { dueDate: string, suggestedStartDate?: string }>(assignmentsCollection);

  const mappedAssignments = useMemo(() => {
    return assignments?.map(a => ({
      ...a,
      dueDate: new Date(a.dueDate),
      suggestedStartDate: a.suggestedStartDate ? new Date(a.suggestedStartDate) : undefined,
    })) || [];
  }, [assignments]);

  const handleAddAssignment = (newAssignmentData: Omit<Assignment, 'id' | 'completed'>) => {
    if (!assignmentsCollection) return;
    const newAssignment: Omit<Assignment, 'id'> & { createdAt: Date } = {
      ...newAssignmentData,
      completed: false,
      createdAt: new Date(),
    };
    addDocumentNonBlocking(assignmentsCollection, newAssignment);
    setIsAddDialogOpen(false);
  };

  const handleToggleComplete = (id: string, completed: boolean) => {
    if (!user || !firestore) return;
    const assignmentDoc = doc(firestore, `users/${user.uid}/assignments`, id);
    updateDocumentNonBlocking(assignmentDoc, { completed: !completed });
  };

  const handleDeleteAssignment = (id: string) => {
    if (!user || !firestore) return;
    const assignmentDoc = doc(firestore, `users/${user.uid}/assignments`, id);
    deleteDocumentNonBlocking(assignmentDoc);
  };

  const sortedAssignments = useMemo(() => {
    return [...mappedAssignments].sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
  }, [mappedAssignments]);

  if (isUserLoading || isLoading) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background">
        <div className="text-2xl font-bold">Loading...</div>
      </div>
    );
  }

  if (!user) {
    router.push('/login');
    return null;
  }

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
