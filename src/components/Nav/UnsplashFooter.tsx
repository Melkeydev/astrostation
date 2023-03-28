import { useUnsplashStore } from "@Root/src/store";
import { GoSync } from "react-icons/go";
import { useEffect } from "react";

const ACCESS_KEY = "lXCmtGt72w97HjLP-9ParZNM54OlfjuDJcRS---E-SQ";

export const UnsplashFooter = () => {
  const { dailyUnsplash, setDailyUnsplash } = useUnsplashStore();
  // If there's no image in localStorage, then download a random image
  // If there IS an image, then just show it
  // If "request new image", is pressed, get new image and replace it in localstorage

  const fetchRandomPhoto = async () => {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?client_id=${ACCESS_KEY}&orientation=landscape&collections=11649432`
    );

    const data = await response.json();

    if (data && data.urls) {
      setDailyUnsplash(data);
    }
  };

  // @ts-ignore :eheh:
  useEffect(() => {
    let fetching = false;

    if (Object.keys(dailyUnsplash).length === 0) {
      fetching = true;
      fetchRandomPhoto().catch(console.error);
    }

    return () => (fetching = false);
  }, [dailyUnsplash]);

  return (
    <div className="fixed bottom-0 right-0 flex space-x-4">
      <a href={dailyUnsplash.links?.html} target="_blank" className="flex items-center text-sm text-white">
        Image Source
      </a>
      <button
        className="flex items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm focus:outline-none dark:bg-gray-800 dark:text-gray-200"
        onClick={() => fetchRandomPhoto()}
      >
        Get New Image <GoSync className="-mr-2 ml-2" />
      </button>
    </div>
  );
};
