import { useEffect } from "react";
import { FaSpotify } from "react-icons/fa";
import { IoMusicalNotesOutline, IoCloseSharp } from "react-icons/io5";
import { CgNotes } from "react-icons/cg";
import { MdOutlineTimer, MdWbSunny, MdOutlineNoteAdd } from "react-icons/md";
import { VscDebugRestartFrame } from "react-icons/vsc";
import {
  BsArrowsFullscreen,
  BsFillChatLeftQuoteFill,
  BsTwitch,
} from "react-icons/bs";
import clsx from "clsx";

import {
  useToggleMusic,
  useToggleTimer,
  useToggleTasks,
  useSpotifyMusic,
  useToggleQuote,
  useDarkToggleStore,
  useToggleStickyNote,
  useFullScreenToggleStore,
  useToggleWidgetReset,
  useToggleTwitch,
} from "@Store";
import useMediaQuery from "@Utils/hooks/useMediaQuery";
import { toggledToastNotification } from "@Utils/toast";

export const WidgetControlModal = ({ isVisible = false, onClose }) => {
  const { isMusicShown, setIsMusicShown } = useToggleMusic();
  const { isSpotifyShown, setIsSpotifyShown } = useSpotifyMusic();
  const { isTimerShown, setIsTimerShown } = useToggleTimer();
  const { isStickyNoteShown, setIsStickyNoteShown } = useToggleStickyNote();
  const { isTasksShown, setIsTasksShown } = useToggleTasks();
  const { isDarkModeShown, setIsDarkModeShown } = useDarkToggleStore();
  const { isFullscreenShown, setIsFullscreenShown } =
    useFullScreenToggleStore();
  const { isQuoteShown, setIsQuoteShown } = useToggleQuote();
  const { isWidgetResetShown, setIsWidgetResetShown } = useToggleWidgetReset();
  const { isTwitchShown, setIsTwitchShown } = useToggleTwitch();

  const isDesktop = useMediaQuery("(min-width: 641px)");

  const keydownHandler = ({ key }) => {
    switch (key) {
      case "Escape":
        onClose();
        break;
      default:
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keydownHandler);
    return () => document.removeEventListener("keydown", keydownHandler);
  });

  return !isVisible ? null : (
    <div className="modal" onClick={onClose}>
      <div
        className="w-10/12 max-w-sm rounded-lg bg-white p-2 px-1 text-gray-800 shadow-md dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 sm:w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end">
          <IoCloseSharp
            className="cursor-pointer text-red-500 hover:bg-red-200"
            onClick={onClose}
          />
        </div>
        <div>
          <div className="text-center text-lg">Widget Control</div>
          <div className="grid grid-cols-[30%,30%,30%] grid-rows-[100px,100px,100px,100px] justify-center gap-1 p-4 text-center">
            <div
              onClick={() =>
                toggledToastNotification(
                  isSpotifyShown,
                  setIsSpotifyShown,
                  "Spotify Widget Added",
                  750,
                  "🎧"
                )
              }
              className={clsx(
                "grid cursor-pointer content-center justify-center gap-2 rounded md:hover:bg-gray-200 md:hover:text-gray-800 md:dark:hover:bg-violet-500",
                isSpotifyShown &&
                  "dark:bg-violet-500 md:bg-gray-200 md:text-gray-800"
              )}
            >
              Spotify
              <FaSpotify className="h-6 w-full" />
            </div>
            <div
              onClick={() =>
                toggledToastNotification(
                  isMusicShown,
                  setIsMusicShown,
                  "Music Widget Added",
                  750,
                  "🎧"
                )
              }
              className={clsx(
                "grid cursor-pointer content-center justify-center gap-2 rounded md:hover:bg-gray-200 md:hover:text-gray-800 md:dark:hover:bg-violet-500",
                isMusicShown &&
                  "dark:bg-violet-500 md:bg-gray-200 md:text-gray-800"
              )}
            >
              Chill Music
              <IoMusicalNotesOutline className="h-6 w-full" />
            </div>
            <div
              onClick={() =>
                toggledToastNotification(
                  isTasksShown,
                  setIsTasksShown,
                  "Task Tracker Widget Added",
                  750,
                  "📓"
                )
              }
              className={clsx(
                "grid cursor-pointer content-center justify-center gap-2 rounded md:hover:bg-gray-200 md:hover:text-gray-800 md:dark:hover:bg-violet-500",
                isTasksShown &&
                  "dark:bg-violet-500 md:bg-gray-200 md:text-gray-800"
              )}
            >
              Task Tracker
              <CgNotes className="h-6 w-full" />
            </div>
            <div
              onClick={() =>
                toggledToastNotification(
                  isTimerShown,
                  setIsTimerShown,
                  "Timer Widget Added",
                  750,
                  "⏳"
                )
              }
              className={clsx(
                "grid cursor-pointer content-center justify-center gap-2 rounded md:hover:bg-gray-200 md:hover:text-gray-800 md:dark:hover:bg-violet-500",
                isTimerShown &&
                  "dark:bg-violet-500 md:bg-gray-200 md:text-gray-800"
              )}
            >
              Pomodoro Timer
              <MdOutlineTimer className="h-6 w-full" />
            </div>
            <div
              onClick={() =>
                toggledToastNotification(
                  isDarkModeShown,
                  setIsDarkModeShown,
                  "Theme Widget Added",
                  750,
                  "🌙/☀️"
                )
              }
              className={clsx(
                "grid cursor-pointer content-center justify-center gap-2 rounded md:hover:bg-gray-200 md:hover:text-gray-800 md:dark:hover:bg-violet-500",
                isDarkModeShown &&
                  "dark:bg-violet-500 md:bg-gray-200 md:text-gray-800"
              )}
            >
              Theme
              <MdWbSunny className="h-6 w-full" />
            </div>
            {isDesktop && (
              <div
                onClick={() =>
                  toggledToastNotification(
                    isStickyNoteShown,
                    setIsStickyNoteShown,
                    "Sticky Note Widget Added",
                    750,
                    "📝"
                  )
                }
                className={clsx(
                  "grid cursor-pointer content-center justify-center gap-2 rounded md:hover:bg-gray-200 md:hover:text-gray-800 md:dark:hover:bg-violet-500",
                  isStickyNoteShown &&
                    "dark:bg-violet-500 md:bg-gray-200 md:text-gray-800"
                )}
              >
                Sticky Notes
                <MdOutlineNoteAdd className="h-6 w-full" />
              </div>
            )}
            <div
              onClick={() =>
                toggledToastNotification(
                  isWidgetResetShown,
                  setIsWidgetResetShown,
                  "Reset Widget Added",
                  750,
                  "⏮️"
                )
              }
              className={clsx(
                "grid cursor-pointer content-center justify-center gap-2 rounded md:hover:bg-gray-200 md:hover:text-gray-800 md:dark:hover:bg-violet-500",
                isWidgetResetShown &&
                  "dark:bg-violet-500 md:bg-gray-200 md:text-gray-800"
              )}
            >
              Reset
              <VscDebugRestartFrame className="h-6 w-full" />
            </div>
            {isDesktop && (
              <div
                onClick={() =>
                  toggledToastNotification(
                    isFullscreenShown,
                    setIsFullscreenShown,
                    "Fullscreen Widget Added",
                    750,
                    "📺"
                  )
                }
                className={clsx(
                  "grid cursor-pointer content-center justify-center gap-2 rounded md:hover:bg-gray-200 md:hover:text-gray-800 md:dark:hover:bg-violet-500",
                  isFullscreenShown &&
                    "dark:bg-violet-500 md:bg-gray-200 md:text-gray-800"
                )}
              >
                Fullscreen
                <BsArrowsFullscreen className="h-6 w-full" />
              </div>
            )}
            <div
              onClick={() =>
                toggledToastNotification(
                  isQuoteShown,
                  setIsQuoteShown,
                  "Quote Widget Added",
                  750,
                  "💬"
                )
              }
              className={clsx(
                "grid cursor-pointer content-center justify-center gap-2 rounded md:hover:bg-gray-200 md:hover:text-gray-800 md:dark:hover:bg-violet-500",
                isQuoteShown &&
                  "dark:bg-violet-500 md:bg-gray-200 md:text-gray-800"
              )}
            >
              Quotes
              <BsFillChatLeftQuoteFill className="h-6 w-full" />
            </div>
            <div
              onClick={() =>
                toggledToastNotification(
                  isTwitchShown,
                  setIsTwitchShown,
                  "Twitch Widget Added",
                  750,
                  "📺"
                )
              }
              className={clsx(
                "grid cursor-pointer content-center justify-center gap-2 rounded md:hover:bg-gray-200 md:hover:text-gray-800 md:dark:hover:bg-violet-500",
                isTwitchShown &&
                  "dark:bg-violet-500 md:bg-gray-200 md:text-gray-800"
              )}
            >
              Twitch
              <BsTwitch className="h-6 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
