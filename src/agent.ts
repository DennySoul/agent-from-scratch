import { addMessages, getMessages, saveToolResponse } from './memory.ts'
import { logMessage, showLoader } from './ui.ts'
import { runLLm } from './llm.ts'
import { z } from 'zod'
import { runTool } from './toolRunner.ts'

export type Tools = { name: string, parameters: z.AnyZodObject, }[];

export const runAgent = async ({ runs = 10, userMessage, tools }: { runs: number, userMessage: string, tools: Tools }) => {
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

  console.log('Thinking... \n');

  let runsCount = 0;

  while (runsCount < runs) {
    const history = await getMessages();
    const result = await runLLm({ messages: history, tools });

    runsCount++;

    if (result === undefined) {
      console.log('LLm query returned nothing')
      return;
    }

    await addMessages([result]);

    if (result.content) {
      // final answer
      logMessage(result);

      runsCount = runs;
    }

    if (result.tool_calls) {
      const toolCall = result.tool_calls[0];

      console.info(`Executing tool: ${toolCall.function.name}`);

      const response = await runTool(toolCall, userMessage);

      await saveToolResponse(response, toolCall.id);

      console.info(`Done with: ${toolCall.function.name}`);
    }
  }

  return getMessages();
}