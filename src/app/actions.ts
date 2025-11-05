'use server';

import { suggestDueDate, type SuggestDueDateInput } from '@/ai/flows/suggest-due-date';
import { z } from 'zod';

const actionSchema = z.object({
  assignmentTitle: z.string().min(1, 'Title is required.'),
  dueDate: z.string().min(1, 'Due date is required.'),
  estimatedWorkload: z.string().min(1, 'Estimated workload is required.'),
  classInfo: z.string().min(1, 'Class is required.'),
});

export async function getAiSuggestion(input: SuggestDueDateInput) {
  try {
    const validatedInput = actionSchema.parse(input);
    const result = await suggestDueDate(validatedInput);
    return { success: true, data: result };
  } catch (error) {
    console.error('AI Suggestion Error:', error);
    if (error instanceof z.ZodError) {
      return { success: false, error: 'Invalid input for AI suggestion.' };
    }
    return { success: false, error: 'An unexpected error occurred while getting AI suggestion.' };
  }
}
