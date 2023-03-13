import * as React from "react";
import { useToggleHackerNews, useHackerNewsFeed } from "@Store";
import { useQuery, QueryClient, useQueries } from '@tanstack/react-query'
import axios from 'axios';
import { Card, LoaderCard } from "../Common/Card";
import { z } from 'zod'
import clsx from "clsx";

const StoryIdSchema = z.number().array()

export const HackerNews = () => {
  const storyTypes = [
    {
      name: 'Top',
      title: 'Top Stories',
      key: 'TOP',
      apiSrc: 'topstories'
    },
    {
      name: 'Best',
      title: 'Best Stories',
      key: 'BEST',
      apiSrc: 'beststories'
    },
    {
      name: 'New',
      title: 'New Stories',
      key: 'NEW',
      apiSrc: 'newstories'
    },
    {
      name: 'Ask',
      title: 'Ask Hacker News',
      key: 'ASK',
      apiSrc: 'askstories'
    },
    {
      name: 'Show',
      title: 'Show Hacker News',
      key: 'SHOW',
      apiSrc: 'showstories'
    },
    {
      name: 'Jobs',
      title: 'Jobs on Hacker News',
      key: 'JOBS',
      apiSrc: 'jobstories'
    }
  ]

  const { setIsHackerNewsToggled } = useToggleHackerNews();
  const { feed, setFeed } = useHackerNewsFeed();

  const selectedStoryType = storyTypes.find((storyType) => storyType.key === feed)

  const { isLoading, error, data, refetch: storyListRefetch } = useQuery({
    queryKey: ["storyList"],
    queryFn: () =>
      axios
        .get(`https://hacker-news.firebaseio.com/v0/${selectedStoryType.apiSrc}.json`)
        .then((res) => {
          return StoryIdSchema.parse(res.data.slice(0, 10))
        })
  })

  // if the stories have not yet loaded, use a blank array to avoid errors
  // once stories load, array is populated and the below useQueries runs
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
    storyListRefetch()
  }

  const updateNewsFeed = async (feed: string) => {
    setFeed(feed)
    storyListRefetch()
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
    <Card title={`Hacker News - ${selectedStoryType.title}`} toggleFunction={setIsHackerNewsToggled} reloadFunction={refetchStories} width="sm:w-[48rem]">
      <ul>
        {storyList.map((story) => {
          return (
            <li key={story.data.id} className="py-1">
              <a className="font-semibold" href={story.data.id}>{story.data.title}</a>
            </li>
          )
        })}
      </ul>

      <ul className="flex flew-row justify-end w-full mt-4">
        {storyTypes.map((storyType) => {
          return (
            <li key={storyType.key}>
              <button onClick={() => updateNewsFeed(storyType.key)} className="bg-white/[.80] dark:border-gray-700 dark:bg-gray-700/[.96] dark:text-gray-300 py-1 px-3 ml-[2px]">
                <span className={clsx(selectedStoryType.key === storyType.key && "underline")}>
                  {storyType.name}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </Card>
  )

};
