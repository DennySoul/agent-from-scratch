import { z } from 'zod';
import type { ToolFn } from '../../types.ts'
import fetch from 'node-fetch'

export const redditToolDefinition = {
  name: 'reddit_post_retrieval',
  parameters: z.object({}),
  description: 'fetch latest reddit posts',
};

export interface IRedditResponse {
  data: {
    children: {
      data: {
        [key: string]: string,
      }
    }[]
  },
}

export type RedditArgs = z.infer<typeof redditToolDefinition.parameters>;

export const reddit: ToolFn<RedditArgs, string> = async ({ toolArgs }) => {
  const response = await fetch('https://www.reddit.com/r/aww/.json', {
    headers: {
      Accept: 'application/json'
    }
  });
  const responseContent = await response.json() as IRedditResponse;

  console.log(responseContent)

  const processedPosts = responseContent.data.children.map(
    (child: { data: { [key: string]: string } }) => ({
      title: child?.data?.title,
      link: child?.data?.url,
      subreddit: child?.data?.subreddit_name_prefixed,
      author: child?.data?.author,
      upvotes: child?.data?.upvotesl
    })
  );

  return JSON.stringify(
    processedPosts,
    null,
    2
  );
}