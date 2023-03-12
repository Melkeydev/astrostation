import * as React from "react";
import { useToggleHackerNews } from "@Store";
import { useQuery, QueryClient, useQueries } from '@tanstack/react-query'
import axios from 'axios';
import { Card, LoaderCard } from "../Common/Card";
import { z } from 'zod'

const StoryIdSchema = z.number().array()


export const HackerNews = () => {
  const { setIsHackerNewsToggled } = useToggleHackerNews();
  const queryClient = new QueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["storyList"],
    queryFn: () =>
      axios
        .get('https://hacker-news.firebaseio.com/v0/topstories.json')
        .then((res) => {
          return StoryIdSchema.parse(res.data.slice(0, 10))
        })
  })


  const storyIds = data ?? []

  const storyList = useQueries({
    queries: storyIds.map((storyId, index) => {
      return {
        queryKey: ['story', index],
        queryFn: () =>
          axios
            .get(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`)
            .then((res) => {
              return res.data
            }),
        enabled: !!data
      }
    })
  })

  // trigger a refresh of the news stories
  const refetchStories = async () => {
    await queryClient.invalidateQueries({
      queryKey: ['storyList'],
      refetchType: 'active'
    })
  }

  // check if individual stories are still loading
  const loadingStoryList = storyList.some(story => story.isLoading)

  // use the LoaderCard for a clean loader while the feed loads/reloads
  if (isLoading || loadingStoryList) {
    return (<LoaderCard title="Hacker News" reloadFunction={refetchStories} toggleFunction={setIsHackerNewsToggled} refreshing={true} />)

  }

  // let's handle errors with a little class and show the error to the user
  if (error instanceof Error) {
    return (
      <Card title="Hacker News" toggleFunction={setIsHackerNewsToggled} reloadFunction={refetchStories}>
        `An error has occured: ${error.message}`
      </Card>
    )
  }

  // "this they guy" - Melkey
  return (
    <Card title="Hacker News - Top Stories" toggleFunction={setIsHackerNewsToggled} reloadFunction={refetchStories} width="sm:w-[48rem]">
      <ul>
        {storyList.map((story) => {
          return (
            <li key={story.data.id} className="py-1">
              <a className="font-semibold" href={story.data.id}>{story.data.title}</a>
            </li>
          )
        })}
      </ul>
    </Card>
  )

};
