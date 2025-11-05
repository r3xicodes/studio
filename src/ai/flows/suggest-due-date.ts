'use server';

/**
 * @fileOverview A flow to suggest an optimal start date for an assignment based on its details.
 *
 * - suggestDueDate - A function that suggests the optimal start date for an assignment.
 * - SuggestDueDateInput - The input type for the suggestDueDate function.
 * - SuggestDueDateOutput - The return type for the suggestDueDate function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestDueDateInputSchema = z.object({
  assignmentTitle: z.string().describe('The title of the assignment.'),
  dueDate: z.string().describe('The due date of the assignment (ISO format).'),
  estimatedWorkload: z.string().describe('The estimated workload in hours.'),
  classInfo: z.string().describe('Information about the class for the assignment.'),
});
export type SuggestDueDateInput = z.infer<typeof SuggestDueDateInputSchema>;

const SuggestDueDateOutputSchema = z.object({
  suggestedStartDate: z.string().describe('The suggested start date for the assignment (ISO format).'),
  reasoning: z.string().describe('The reasoning behind the suggested start date.'),
});
export type SuggestDueDateOutput = z.infer<typeof SuggestDueDateOutputSchema>;

export async function suggestDueDate(input: SuggestDueDateInput): Promise<SuggestDueDateOutput> {
  return suggestDueDateFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestDueDatePrompt',
  input: {schema: SuggestDueDateInputSchema},
  output: {schema: SuggestDueDateOutputSchema},
  prompt: `You are a helpful assistant that suggests the best start date for an assignment.

  Given the following assignment details, suggest a start date that allows the student to complete the assignment without rushing.
  Consider the workload, due date, and class information when making your suggestion.

  Assignment Title: {{{assignmentTitle}}}
  Due Date: {{{dueDate}}}
  Estimated Workload: {{{estimatedWorkload}}} hours
  Class Info: {{{classInfo}}}

  Provide the suggested start date in ISO format and explain your reasoning.
  Remember to output in the JSON format.
`,
});

const suggestDueDateFlow = ai.defineFlow(
  {
    name: 'suggestDueDateFlow',
    inputSchema: SuggestDueDateInputSchema,
    outputSchema: SuggestDueDateOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
