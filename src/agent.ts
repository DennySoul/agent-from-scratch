import { addMessages, getMessages } from './memory.ts'
import { logMessage, showLoader } from './ui.ts'
import { runLLm } from './llm.ts'

export type Tools = any[];

export const runAgent = async ({ userMessage, tools }: { userMessage: string, tools: Tools }) => {
    logMessage({
      role: 'user',
      content: userMessage
    });


  await addMessages([
    {
      role: 'user',
      content: userMessage
    }
  ]);

  const loader = showLoader('Thinking... \n');

  const history = await getMessages();

  const result = await runLLm({ messages: history, tools });

  if (result === undefined) {
    console.log('LLm query returned nothing')
    return;
  }

  if (result.tool_calls) {
    console.log('Tools list: \n');

    console.log(result.tool_calls, '\n');
  }

  await addMessages([result]);

  loader.stop();

  return getMessages();

}