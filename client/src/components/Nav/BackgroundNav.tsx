import { useState, useRef, useEffect } from "react";
import { useSetBackground } from "@Store";
export const BackgroundNav = ({ backgrounds }: { backgrounds: any }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { isBackground, setIsBackground } = useSetBackground();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
    function handleClickOutside(event: any) {
      if (!menuRef.current?.contains(event.target)) {
        setShowMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div className="flex justify-end" ref={menuRef}>
      <div className="relative inline-block text-left">
        <div>
          <button
            type="button"
            className="chooseBackgroundButton inline-flex justify-center w-full rounded shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 focus:outline-none"
            onClick={() => setShowMenu(!showMenu)}
          >
            Choose Background
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {showMenu && (
          <div
            className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none z-10"
            role="menu"
            ref={menuRef}
          >
            <div
              className={"py-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 hover:rounded-md " + (isBackground==0 && " bg-gray-100 dark:bg-gray-900 rounded-md")}
              onClick={() => setIsBackground(backgrounds.STARS)}
            >
              <div className="text-gray-700 dark:text-gray-200 block px-4 py-2 text-sm">
                Stars
              </div>
            </div>
            <div
              className={"py-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 hover:rounded-md " + (isBackground==1 && " bg-gray-100 dark:bg-gray-900 rounded-md")}
              onClick={() => setIsBackground(backgrounds.CITY)}
            >
              <div className="text-gray-700 dark:text-gray-200 block px-4 py-2 text-sm">
                City
              </div>
            </div>
            <div
              className={"py-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 hover:rounded-md " + (isBackground==2 && " bg-gray-100 dark:bg-gray-900 rounded-md")}
              onClick={() => setIsBackground(backgrounds.DOTS)}
            >
              <div className="text-gray-700 dark:text-gray-200 block px-4 py-2 text-sm">
                Dots
              </div>
            </div>
            <div
              className={"py-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 hover:rounded-md " + (isBackground==3 && " bg-gray-100 dark:bg-gray-900 rounded-md")}
              onClick={() => setIsBackground(backgrounds.SNOW)}
            >
              <div className="text-gray-700 dark:text-gray-200 block px-4 py-2 text-sm">
                Snow
              </div>
            </div>
            <div
              className={"py-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 hover:rounded-md " + (isBackground==4 && " bg-gray-100 dark:bg-gray-900 rounded-md")}
              onClick={() => setIsBackground(backgrounds.FADE)}
            >
              <div className="text-gray-700 dark:text-gray-200 block px-4 py-2 text-sm">
                Fade
              </div>
            </div>
            <div
              className={"py-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 hover:rounded-md " + (isBackground==5 && " bg-gray-100 dark:bg-gray-900 rounded-md")}
              onClick={() => setIsBackground(backgrounds.GRADIENT)}
            >
              <div className="text-gray-700 dark:text-gray-200 block px-4 py-2 text-sm">
                Gradient
              </div>
            </div>
          </div>
        )}

        {/*
        {showMenu && (
          <div
            ref={menuRef}
            className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
          >
            <ul
              role="menu"
              className="flex flex-col divide-y divide-gray-100 dark:divide-gray-900"
            >
              <li>
                <button onClick={() => setIsBackground(backgrounds.SPACE)} className="w-full text-left rounded-t-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900 px-4 py-2 text-sm">
                  Space
                </button>
              </li>
              <li>
                <button onClick={() => setIsBackground(backgrounds.STARS)} className="w-full text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900 px-4 py-2 text-sm">
                  Stars
                </button>
              </li>
              <li>
                <button onClick={() => setIsBackground(backgrounds.CITY)} className="w-full text-left rounded-b-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900 px-4 py-2 text-sm">
                  City
                </button>
              </li>
            </ul>
          </div>
        )}
        */}
      </div>
    </div>
  );
};
