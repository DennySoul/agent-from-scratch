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
  parameters: z.object({}),
};

const getWeather = () => 'Freezing cold, -1 outside';

const response = await runAgent({ userMessage, tools: [weatherTool] });

console.log('Response: \n');
console.log(JSON.stringify(response));