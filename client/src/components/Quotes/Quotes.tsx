import { IoCloseSharp,  } from "react-icons/io5";
import { AiOutlineReload } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useToggleQuote } from "../../store";
import quoteData from "./QuoteData.json";

export const Quotes = () => {
  let [quoteNumber, setQuoteNumber] = useState(0);
  const { setIsQuoteToggled } = useToggleQuote();

  useEffect(() => {
    setQuoteNumber(Math.floor(Math.random()*quoteData.length));
  }, []);
  
  return (
    <div className="shadow-lg mb-2 max-w-sm w-72 sm:w-96 bg-white/[.96] rounded-lg border border-gray-200 dark:text-gray-300 dark:bg-gray-800/[.96] dark:border-gray-700 px-8 py-4 text-center">
      <div 
      className="text-gray-800 dark:text-white relative items-center justify-center text-xl font-radio-canada mr-4">
        {quoteData[quoteNumber].q}
        <br/>
        -{quoteData[quoteNumber].a}
        <IoCloseSharp
          className="text-red-500 cursor-pointer hover:bg-red-200 absolute top-[0] right-[-30px]"
          onClick={() => setIsQuoteToggled(false)}
        />
        <AiOutlineReload
          className="text-gray-800 dark:text-white cursor-pointer absolute top-[80%] right-[-30px]"
          onClick={() => setQuoteNumber(Math.floor(Math.random()*quoteData.length))}
        />
        </div>
    </div>
  );
};
