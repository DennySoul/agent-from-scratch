import { z } from 'zod';
import type { ToolFn } from '../../types.ts'
import { openai } from '../ai.ts';

export const generateImageToolDefinition = {
  name: 'generate_image',
  parameters: z.object({
    prompt: z.string().describe('prompt for the image. Always consider users  original message when composing prompt.')
  }),
  description: 'generate an image',
};

export type GenerateImageArgs = z.infer<typeof generateImageToolDefinition.parameters>;

export const generateImage: ToolFn<GenerateImageArgs, string> = async ({ toolArgs }) => {
  const response = await openai.images.generate({
    model: 'dall-e-3',
    prompt: toolArgs.prompt,
    size: '1024x1024',
    n: 1,
  });

  return response.data[0].url ?? '';
}