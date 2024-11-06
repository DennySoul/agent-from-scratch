import 'dotenv/config'
import { runLLm } from './src/llm.ts'
import { getMessages, addMessages } from './src/memory.ts'

const userMessage = process.argv[2];

if (!userMessage) {
  console.error('Please provide a message')
  process.exit(1)
}

await addMessages([{ role: 'user', content: userMessage }]);

const messages = await getMessages();

console.log(messages)

const response = await runLLm({
  messages,
});

await addMessages([{ role: 'assistant', content: response }]);

console.log(response);
