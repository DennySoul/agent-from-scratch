import { openai } from './ai.ts'

export const runLLm = async ({ userMessage }: { userMessage: string}) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0.1,
    messages: [{
      role: 'user',
      content: userMessage,
    }],
  });

  return response.choices.at(0)?.message?.content;
};