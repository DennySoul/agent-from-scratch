import { JSONFilePreset} from 'lowdb/node';
import type { AIMessage } from '../types.ts'
import { v4 as uuidv4} from 'uuid';

export type MessageWithMetadata = AIMessage & {
  id: string;
  createdAt: string;
};

export type Data = {
  messages: MessageWithMetadata[],
}

const defaultData: Data = {
  messages: []
}

export const addMetadata = (message: AIMessage) => {
  return {
    ...message,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
  };
}

export const remoteMetadata = (message: MessageWithMetadata) => {
  const { id, createdAt, ...pureMessage } = message;

  return pureMessage;
}

export const getDb = async () => {
  const db = await JSONFilePreset<Data>('db.json', defaultData);

  return db;
}

export const getMessages = async () => {
  const db = await getDb();

  return db.data.messages.map(remoteMetadata);
};

export const addMessages = async (messages: AIMessage[]) => {
  const db = await getDb();

  db.data.messages.push(...messages.map(addMetadata));

  await db.write();
};
