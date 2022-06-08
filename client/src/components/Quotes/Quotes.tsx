import { IoCloseSharp } from "react-icons/io5";
import { AiOutlineReload } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useToggleQuote } from "@Store";

import quoteData from "./QuoteData.json";

export const Quotes = () => {
  let [quoteNumber, setQuoteNumber] = useState(0);
  const { setIsQuoteToggled } = useToggleQuote();

  useEffect(() => {
    setQuoteNumber(Math.floor(Math.random() * quoteData.length));
  }, []);

  return (
    <div className="sm:w-96 bg-white/[.96] rounded-lg border border-gray-200 dark:text-gray-300 dark:bg-gray-800/[.96] dark:border-gray-700">
      <div className="flex justify-end w-full p-2 handle cursor-move">
        <IoCloseSharp
          className="text-red-500 cursor-pointer hover:bg-red-200"
          onClick={() => setIsQuoteToggled(false)}
        />
      </div>
      <div className="max-w-sm text-center">
        <div className="text-gray-800 dark:text-white relative items-center justify-center text-xl font-radio-canada pb-2 pr-2 pl-2">
          {quoteData[quoteNumber].q}
          <br />-{quoteData[quoteNumber].a}
        </div>
      </div>
      <div className="flex justify-end pb-2 pr-2 pl-2 w-full text-base">
        <AiOutlineReload
          onClick={() =>
            setQuoteNumber(Math.floor(Math.random() * quoteData.length))
          }
        />
      </div>
    </div>
  );
};
