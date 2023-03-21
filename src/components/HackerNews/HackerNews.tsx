import * as React from "react";
import { useToggleHackerNews, useHackerNewsFeed } from "@Store";
import { useQuery, QueryClient, useQueries } from '@tanstack/react-query'
import axios from 'axios';
import { Card, LoaderCard } from "../Common/Card";
import { z } from 'zod'
import clsx from "clsx";

const StoryIdSchema = z.number().array()

export const HackerNews = () => {

  // name == button name, title == window title, key == id, apiSrc == used in queries
  // this can probably get cleaned up
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

  console.log('feed', feed)

  const selectedStoryType = storyTypes.find((storyType) => storyType.key === feed)

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: [`storyList-${feed}`],
    queryFn: async () => {

      // let's grab the ids for the selected story type
      const res = await axios.get(`https://hacker-news.firebaseio.com/v0/${selectedStoryType.apiSrc}.json`)
        .then()

      // parse for validation / TS and grab first 10
      const ids = StoryIdSchema.parse(res.data).slice(0, 10);

      // now grab the details for each story    
      const data = await Promise.all(ids.map(async (id) => axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)));

      return data;
    }
  })

  // trigger a refresh of the news stories
  const refetchStories = async () => {
    refetch()
  }

  const updateNewsFeed = async (feed: string) => {
    setFeed(feed)
    // without a timeout, story doesn't update fast enough and the refetch uses the old story type
    setTimeout(() => {
      refetch()
    }, 1);
  }


  // use the LoaderCard for a clean loader while the feed loads/reloads
  if (isLoading) {
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
        {data.map((story) => {
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
