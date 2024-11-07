import 'dotenv/config'
import { runAgent } from './src/agent.ts'
import { z } from 'zod'

const userMessage = process.argv[2];

if (!userMessage) {
  console.error('Please provide a message')
  process.exit(1)
}

const weatherTool = {
  name: 'get_weather',
  description: 'use this tool to get weather, it does not required city or location',
  parameters: z.object({
    reasoning: z.string().describe('define why did you choose this tool'),
  }),
};

await runAgent({ userMessage, tools: [weatherTool], runs: 10 });