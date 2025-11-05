import { BookOpen, Calculator, FlaskConical, Globe, History, Palette } from 'lucide-react';
import type { Assignment, Class } from './types';

export const CLASSES: Class[] = [
  { id: 'math', name: 'Mathematics', icon: Calculator },
  { id: 'english', name: 'English Literature', icon: BookOpen },
  { id: 'science', name: 'Science', icon: FlaskConical },
  { id: 'history', name: 'World History', icon: History },
  { id: 'geography', name: 'Geography', icon: Globe },
  { id: 'art', name: 'Art History', icon: Palette },
];

export const ASSIGNMENTS: Assignment[] = [
  {
    id: '1',
    title: 'Complete Algebra Chapter 5 problems',
    classId: 'math',
    dueDate: new Date(new Date().setDate(new Date().getDate() - 1)),
    notes: 'Focus on quadratic equations and factoring.',
    completed: false,
    estimatedWorkload: 5,
  },
  {
    id: '2',
    title: 'Essay on "To Kill a Mockingbird"',
    classId: 'english',
    dueDate: new Date(new Date().setDate(new Date().getDate() + 3)),
    notes: '3-page essay on the themes of justice and prejudice.',
    completed: false,
    estimatedWorkload: 8,
  },
  {
    id: '3',
    title: 'Lab Report: Photosynthesis Experiment',
    classId: 'science',
    dueDate: new Date(new Date().setDate(new Date().getDate())),
    notes: 'Include all sections: abstract, intro, methods, results, conclusion.',
    completed: false,
  },
  {
    id: '4',
    title: 'Presentation on the Roman Empire',
    classId: 'history',
    dueDate: new Date(new Date().setDate(new Date().getDate() + 7)),
    notes: '10-minute presentation covering the rise and fall.',
    completed: false,
    estimatedWorkload: 6,
  },
  {
    id: '5',
    title: 'Read Chapter 1 & 2',
    classId: 'english',
    dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    notes: 'Be prepared for a pop quiz.',
    completed: true,
  },
  {
    id: '6',
    title: 'Study for Midterm Exam',
    classId: 'math',
    dueDate: new Date(new Date().setDate(new Date().getDate() + 12)),
    notes: 'Covers chapters 1-6.',
    completed: false,
    estimatedWorkload: 15,
  },
  {
    id: '7',
    title: 'Map of South American countries',
    classId: 'geography',
    dueDate: new Date(new Date().setDate(new Date().getDate() + 5)),
    notes: 'Label all capitals and major rivers.',
    completed: true,
  },
  {
    id: '8',
    title: 'Analysis of Renaissance Art',
    classId: 'art',
    dueDate: new Date(new Date().setDate(new Date().getDate() + 14)),
    notes: 'Choose one artist and analyze three of their works.',
    completed: false,
    estimatedWorkload: 10,
  },
];
