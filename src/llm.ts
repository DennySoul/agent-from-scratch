import { openai } from './ai.ts'
import type { AIMessage } from '../types.ts'
import { zodFunction } from 'openai/helpers/zod'
import type { Tools } from './agent.ts'
import { systemPrompt } from './systemPrompt.ts'

export const runLLm = async ({ messages, tools = [] }: { messages: AIMessage[], tools: Tools }) => {
  const formattedTools = tools.map(zodFunction);
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0.1,
    messages: [{ role: 'system', content: systemPrompt }, ...messages],
    tools: formattedTools,
    tool_choice: 'auto',
    parallel_tool_calls: false,
  });

  return response.choices.at(0)?.message;
};