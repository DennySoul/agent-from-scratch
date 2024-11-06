import 'dotenv/config'
import { runLLm } from './src/llm.ts'

const userMessage = process.argv[2]

const response = await runLLm({ userMessage });

console.log(response);

if (!userMessage) {
  console.error('Please provide a message')
  process.exit(1)
}
