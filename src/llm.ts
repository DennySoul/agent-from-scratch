import { openai } from './ai.ts'
import type { AIMessage } from '../types.ts'

export const runLLm = async ({ messages }: { messages: AIMessage[] }) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0.1,
    messages,
  });

  return response.choices.at(0)?.message?.content;
};