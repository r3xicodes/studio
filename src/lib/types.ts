import type { LucideIcon } from 'lucide-react';

export type Class = {
  id: string;
  name: string;
  icon: LucideIcon;
};

export type Assignment = {
  id: string;
  title: string;
  classId: string;
  dueDate: Date;
  notes: string;
  completed: boolean;
  suggestedStartDate?: Date;
  estimatedWorkload?: number;
};
