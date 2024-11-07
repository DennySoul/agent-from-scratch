import type OpenAI from 'openai'
import { reddit, redditToolDefinition } from './tools/reddit.ts'
import { generateImage, generateImageToolDefinition } from './tools/generate-image.ts'
import { dadJoke, dadJokeToolDefinition } from './tools/dad-joke.ts'

export const runTool = async (toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall, userMessage: string) => {
  const input = {
    userMessage,
    toolArgs: JSON.parse(toolCall.function.arguments ?? {})
  };

  switch (toolCall.function.name) {
    case generateImageToolDefinition.name:
      return generateImage(input);
    case redditToolDefinition.name:
      return reddit(input);
    case dadJokeToolDefinition.name:
      return dadJoke(input);
    default:
      return `do not run this tool '${toolCall.function.name}' ever again`;
  }
}