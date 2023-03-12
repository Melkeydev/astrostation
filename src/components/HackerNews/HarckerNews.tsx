import * as React from "react";
import { useToggleHackerNews } from "@Store";
import { useQuery, QueryClient, useQueries } from '@tanstack/react-query'
import axios from 'axios';
import { Card, LoaderCard } from "../Common/Card";

export const HackerNews = () => {

  const { setIsHackerNewsToggled } = useToggleHackerNews();
  const queryClient = new QueryClient();
  const [stories, setStories] = React.useState()

  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["storyList"],
    queryFn: () =>
      axios
        .get('https://hacker-news.firebaseio.com/v0/topstories.json')
        .then((res) => {
          return res.data.slice(0, 10)




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

  console.log('storyList', storyList)

  // const fetchStoryDetails = (data) => {

  //   const userQueries =
  //     useQueries({
  //       queries: data.map((storyId) => {
  //         return {
  //           queryKey: ['story', storyId],
  //           queryFn: () =>
  //             axios
  //               .get(`https://hacker-news.firebaseio.com/v0/items/${storyId}`)
  //               .then((res) => {
  //                 return res.data.slice(0, 10)
  //               })

  //         }
  //       })
  //     })
  // }

  // React.useEffect(() => {
  // console.log('data changed, load article info')

  // if (data?.length > 0) {
  // fetchStoryDetails(data)
  // }

  // data.forEach(storyId => {
  //   axios.get('https://hacker-news.firebaseio.com/v0/item/8863')
  // });

  // }, [data])


  // trigger a refresh of the news stories
  const refetchStories = async () => {
    await queryClient.invalidateQueries({
      queryKey: ['storyList'],
      refetchType: 'active'
    })
  }
  // use the LoaderCard for a clean loader while the feed loads/reloads
  if (isLoading) {
    return (<LoaderCard title="Hacker News" reloadFunction={() => { console.log('refresh hacker news') }} toggleFunction={setIsHackerNewsToggled} />)

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
    <Card title="Hacker News" toggleFunction={setIsHackerNewsToggled} reloadFunction={refetchStories}>
      <p>Some content</p>
      {storyList?.map((story) => {
        return (
          <p key={story?.data?.id}>{story?.data?.title}</p>
        )
      })}
    </Card>
  )

};
