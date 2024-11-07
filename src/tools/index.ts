import { generateImageToolDefinition } from './generate-image.ts'
import { dadJokeToolDefinition } from './dad-joke.ts'
import { redditToolDefinition } from './reddit.ts'

export const tools = [
  generateImageToolDefinition,
  dadJokeToolDefinition,
  redditToolDefinition,
];