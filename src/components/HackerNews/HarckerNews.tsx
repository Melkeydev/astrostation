import * as React from "react";
import { IoCloseSharp } from "react-icons/io5";
import { AiOutlineReload } from "react-icons/ai";
import { useToggleHackerNews } from "@Store";


export const HackerNews = () => {
  // let [quoteNumber, setQuoteNumber] = useState(0);
  const { setIsHackerNewsToggled } = useToggleHackerNews();

  // useEffect(() => {
  //   setQuoteNumber(Math.floor(Math.random() * quoteData.length));
  // }, []);

  return (
    <div className="rounded-lg border border-gray-200 bg-white/[.96] dark:border-gray-700 dark:bg-gray-800/[.96] dark:text-gray-300 sm:w-96">
      <div className="handle flex w-full cursor-move justify-end p-2">
        <IoCloseSharp
          className="cursor-pointer text-red-500 hover:bg-red-200"
          onClick={() => setIsHackerNewsToggled(false)}
        />
      </div>
      <div className="cancelDrag max-w-sm text-center">
        <div className="relative items-center justify-center pb-2 pr-2 pl-2 font-radio-canada text-xl text-gray-800 dark:text-white">
          Hacker News Feed
        </div>
      </div>
      <div className="flex w-full justify-end pb-2 pr-2 pl-2 text-base">
        <AiOutlineReload
          onClick={() =>
            console.log('reload hacker news')}
        />
      </div>
    </div>
  );
};
