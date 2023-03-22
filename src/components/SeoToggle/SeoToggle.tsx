import { FaInfo } from "react-icons/fa";
import React, { useState } from 'react';

export const SeoToggle = ({ onClick }: {onClick}) => {
  const [isBgTransparent, setIsBgTransparent] = useState(false);

  const handleClick = () => {
    onClick(); 
    setIsBgTransparent(!isBgTransparent); 
  };

  return(
<div className="fixed bottom-0 z-10 left-60">
        <button
          onClick={handleClick}
          type="button"
          className={`seoToggle flex items-center rounded-md bg-violet-700 ml-2 mb-2 px-4 py-2 font-medium text-white shadow-sm focus:outline-none ${ isBgTransparent ?  `dark:bg-violet-700` : `dark:bg-violet-700/[0.6]`} dark:text-violet-200`}
        >
          <FaInfo/>
        </button>
      </div>
  )
};