import type { ToolFn} from '../../types.ts'
import { z } from 'zod';

export const dadJokeToolDefinition = {
  name: 'dad_joke',
  parameters: z.object({}),
  description: 'write a dad joke',
};

export type DadJokeArgs = z.infer<typeof dadJokeToolDefinition.parameters>;

export const dadJoke: ToolFn<DadJokeArgs, string> = async ({ toolArgs }) => {
  const response = await fetch('https://icanhazdadjoke.com/', {
    headers: {
      Accept: 'application/json'
    }
  });
  const jokeJson = await response.json() as { joke: string };

  return jokeJson?.joke || '';
}