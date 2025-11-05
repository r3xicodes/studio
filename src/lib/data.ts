import { BookOpen, Calculator, FlaskConical, Globe, History, Palette } from 'lucide-react';
import type { Class } from './types';

export const CLASSES: Class[] = [
  { id: 'math', name: 'Mathematics', icon: Calculator },
  { id: 'english', name: 'English Literature', icon: BookOpen },
  { id: 'science', name: 'Science', icon: FlaskConical },
  { id: 'history', name: 'World History', icon: History },
  { id: 'geography', name: 'Geography', icon: Globe },
  { id: 'art', name: 'Art History', icon: Palette },
];
