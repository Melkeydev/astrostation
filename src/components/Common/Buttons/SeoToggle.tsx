import { FaInfo } from "react-icons/fa";
import React, { useState } from 'react';

export const SeoToggle = ({ onClick }: { onClick }) => {
  const [isBgTransparent, setIsBgTransparent] = useState(false);

  const handleClick = () => {
    onClick(); 
    setIsBgTransparent(!isBgTransparent); 
  };

  return(
<div className="pt-10 pb-5" >
        <button
          onClick={handleClick}
          type="button"
          className={"seoToggle flex items-center rounded-md bg-violet-700 ml-2 mb-2 px-4 py-2 font-medium text-white shadow-sm focus:outline-none dark:bg-violet-900/[0.6]  dark:text-violet-200"}
        >
         Back to Astrostation
        </button>
      </div>
  )
};