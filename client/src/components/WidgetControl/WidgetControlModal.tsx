import { useEffect } from "react";
import { FaSpotify } from "react-icons/fa";
import { IoMusicalNotesOutline, IoCloseSharp } from "react-icons/io5";
import { CgNotes } from "react-icons/cg";
import { MdOutlineTimer, MdWbSunny, MdOutlineNoteAdd } from "react-icons/md";
import { VscDebugRestartFrame } from "react-icons/vsc";
import { BsArrowsFullscreen, BsFillChatLeftQuoteFill } from "react-icons/bs";

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
} from "@Store";
import useMediaQuery from "../../utils/hooks/useMediaQuery";
import { toggledToastNotification } from "../../utils/toast";

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

<<<<<<< HEAD
  return !isVisible ? null : (
    <div className="modal" onClick={onClose}>
      <div
        className="p-2 px-1 w-72 sm:w-96 max-w-sm bg-white text-gray-800 rounded-lg shadow-md dark:text-gray-300 dark:bg-gray-800 dark:border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end">
          <IoCloseSharp
            className="text-red-500 cursor-pointer hover:bg-red-200"
            onClick={onClose}
          />
        </div>
        <div>
          <div className="text-center text-lg">Widget Control</div>
          <div className="grid grid-cols-[30%,30%,30%] grid-rows-[100px,100px,100px] justify-center gap-1 text-center p-4">
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
              className={
                "grid content-center justify-center gap-2 md:hover:bg-gray-200 md:hover:text-gray-800 md:dark:hover:bg-violet-500 cursor-pointer rounded " +
                (isSpotifyShown &&
                  "md:bg-gray-200 md:text-gray-800 dark:bg-violet-500")
              }
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
              className={
                "grid content-center justify-center gap-2 md:hover:bg-gray-200 md:hover:text-gray-800 md:dark:hover:bg-violet-500 cursor-pointer rounded " +
                (isMusicShown &&
                  "md:bg-gray-200 md:text-gray-800 dark:bg-violet-500")
              }
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
              className={
                "grid content-center justify-center gap-2 md:hover:bg-gray-200 md:hover:text-gray-800 md:dark:hover:bg-violet-500 cursor-pointer rounded " +
                (isTasksShown &&
                  "md:bg-gray-200 md:text-gray-800 dark:bg-violet-500")
              }
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
              className={
                "grid content-center justify-center gap-2 md:hover:bg-gray-200 md:hover:text-gray-800 md:dark:hover:bg-violet-500 cursor-pointer rounded " +
                (isTimerShown &&
                  "md:bg-gray-200 md:text-gray-800 dark:bg-violet-500")
              }
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
              className={
                "grid content-center justify-center gap-2 md:hover:bg-gray-200 md:hover:text-gray-800 md:dark:hover:bg-violet-500 cursor-pointer rounded " +
                (isDarkModeShown &&
                  "md:bg-gray-200 md:text-gray-800 dark:bg-violet-500")
              }
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
                className={
                  "grid content-center justify-center gap-2 md:hover:bg-gray-200 md:hover:text-gray-800 md:dark:hover:bg-violet-500 cursor-pointer rounded " +
                  (isStickyNoteShown &&
                    "md:bg-gray-200 md:text-gray-800 dark:bg-violet-500")
                }
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
              className={
                "grid content-center justify-center gap-2 md:hover:bg-gray-200 md:hover:text-gray-800 md:dark:hover:bg-violet-500 cursor-pointer rounded " +
                (isWidgetResetShown &&
                  "md:bg-gray-200 md:text-gray-800 dark:bg-violet-500")
              }
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
                className={
                  "grid content-center justify-center gap-2 md:hover:bg-gray-200 md:hover:text-gray-800 md:dark:hover:bg-violet-500 cursor-pointer rounded " +
                  (isFullscreenShown &&
                    "md:bg-gray-200 md:text-gray-800 dark:bg-violet-500")
                }
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
              className={
                "grid content-center justify-center gap-2 md:hover:bg-gray-200 md:hover:text-gray-800 md:dark:hover:bg-violet-500 cursor-pointer rounded " +
                (isQuoteShown &&
                  "md:bg-gray-200 md:text-gray-800 dark:bg-violet-500")
              }
            >
              Quotes
              <BsFillChatLeftQuoteFill className="h-6 w-full" />
=======
    function toggleTaskTrackerWidget() {
        const nextVal = !isTasksShown;
        setIsTasksShown(nextVal);
        if (nextVal) {
            toast("Task Tracker Widget Added", {
                duration: 750,
                icon: "📓",
                style: {
                  borderRadius: "10px",
                  background: "#333",
                  color: "#fff",
                },
            });
        }
    }

    function toggleTimerWidget() {
        const nextVal = !isTimerShown;
        setIsTimerShown(nextVal);
        if (nextVal) {
            toast("Timer Widget Added", {
                duration: 750,
                icon: "⏳",
                style: {
                  borderRadius: "10px",
                  background: "#333",
                  color: "#fff",
                },
            });
        }
    }

    function toggleDarkModeWidget() {
        const nextVal = !isDarkModeShown;
        setIsDarkModeShown(nextVal);
        if (nextVal) {
            toast("Theme Widget Added", {
                duration: 750,
                icon: "🌙/☀️",
                style: {
                  borderRadius: "10px",
                  background: "#333",
                  color: "#fff",
                },
            });
        }
    }

    function toggleStickyNoteWidget() {
        const nextVal = !isStickyNoteShown;
        setIsStickyNoteShown(nextVal);
        if (nextVal) {
            toast("Sticky Note Widget Added", {
                duration: 750,
                icon: "📝",
                style: {
                  borderRadius: "10px",
                  background: "#333",
                  color: "#fff",
                },
            });
        }
    }

    function toggleResetWidget() {
        const nextVal = !isWidgetResetShown;
        setIsWidgetResetShown(nextVal);
        if (nextVal) {
            toast("Reset Widget Added", {
                duration: 750,
                icon: "⏮️",
                style: {
                  borderRadius: "10px",
                  background: "#333",
                  color: "#fff",
                },
            });
        }
    }

    function toggleFullscreentWidget() {
        const nextVal = !isFullscreenShown;
        setIsFullscreenShown(nextVal);
        if (nextVal) {
            toast("Fullscreen Widget Added", {
                duration: 750,
                icon: "📺",
                style: {
                  borderRadius: "10px",
                  background: "#333",
                  color: "#fff",
                },
            });
        }
    }

    function toggleQuoteWidget() {
        const nextVal = !isQuoteShown;
        setIsQuoteShown(nextVal);
        if (nextVal) {
            toast("Quote Widget Added", {
                duration: 750,
                icon: "💬",
                style: {
                  borderRadius: "10px",
                  background: "#333",
                  color: "#fff",
                },
            });
        }
    }

    return !isVisible ? null : (
        <div className="modal" onClick={onClose}>
            <div className="p-2 px-1 w-72 sm:w-96 max-w-sm bg-white text-gray-800 rounded-lg shadow-md dark:text-gray-300 dark:bg-gray-800 dark:border-gray-700" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-end">
                    <IoCloseSharp
                    className="text-red-500 cursor-pointer hover:bg-red-200"
                    onClick={onClose}
                    />
                </div>
                <div>
                    <div className="text-center text-lg">Widget Control</div>
                    <div className="grid grid-cols-[30%,30%,30%] grid-rows-[100px,100px,100px] justify-center gap-1 text-center p-4">
                        <div 
                            onClick={() => toggleSpotifyWidget() }
                            className={"grid content-center justify-center gap-2 md:hover:bg-gray-200 md:hover:text-gray-800 md:dark:hover:bg-violet-500 cursor-pointer rounded " + (isSpotifyShown && "md:bg-gray-200 md:text-gray-800 dark:bg-violet-500")}>
                            Spotify
                            <FaSpotify className="h-6 w-full"/>
                        </div>
                        <div 
                            onClick={() => toggleMusicWidget() }
                            className={"grid content-center justify-center gap-2 md:hover:bg-gray-200 md:hover:text-gray-800 md:dark:hover:bg-violet-500 cursor-pointer rounded " + (isMusicShown && "md:bg-gray-200 md:text-gray-800 dark:bg-violet-500")}>
                            Chill Music
                            <IoMusicalNotesOutline className="h-6 w-full"/>
                        </div>
                        <div 
                            onClick={() => toggleTaskTrackerWidget() }
                            className={"grid content-center justify-center gap-2 md:hover:bg-gray-200 md:hover:text-gray-800 md:dark:hover:bg-violet-500 cursor-pointer rounded " + (isTasksShown && "md:bg-gray-200 md:text-gray-800 dark:bg-violet-500")}>
                            Task Tracker
                            <CgNotes className="h-6 w-full"/>
                        </div>
                        <div 
                            onClick={() => toggleTimerWidget() }
                            className={"grid content-center justify-center gap-2 md:hover:bg-gray-200 md:hover:text-gray-800 md:dark:hover:bg-violet-500 cursor-pointer rounded " + (isTimerShown && "md:bg-gray-200 md:text-gray-800 dark:bg-violet-500")}>
                            Pomodoro Timer
                            <MdOutlineTimer className="h-6 w-full"/>
                        </div>
                        <div 
                            onClick={() => toggleDarkModeWidget() }
                            className={"grid content-center justify-center gap-2 md:hover:bg-gray-200 md:hover:text-gray-800 md:dark:hover:bg-violet-500 cursor-pointer rounded " + (isDarkModeShown && "md:bg-gray-200 md:text-gray-800 dark:bg-violet-500")}>
                            Theme
                            <MdWbSunny className="h-6 w-full"/>
                        </div>
                        {isDesktop &&                     
                            <div
                                onClick={() => toggleStickyNoteWidget() }
                                className={"grid content-center justify-center gap-2 md:hover:bg-gray-200 md:hover:text-gray-800 md:dark:hover:bg-violet-500 cursor-pointer rounded " + (isStickyNoteShown && "md:bg-gray-200 md:text-gray-800 dark:bg-violet-500")}>
                                Sticky Notes
                                <MdOutlineNoteAdd className="h-6 w-full"/>
                            </div>
                        }
                        <div
                            onClick={() => toggleResetWidget() }
                            className={"grid content-center justify-center gap-2 md:hover:bg-gray-200 md:hover:text-gray-800 md:dark:hover:bg-violet-500 cursor-pointer rounded " + (isWidgetResetShown && "md:bg-gray-200 md:text-gray-800 dark:bg-violet-500")}>
                            Reset
                            <VscDebugRestartFrame className="h-6 w-full"/>
                        </div>
                        {isDesktop &&                     
                            <div
                                onClick={() => toggleFullscreentWidget() } 
                                className={"grid content-center justify-center gap-2 md:hover:bg-gray-200 md:hover:text-gray-800 md:dark:hover:bg-violet-500 cursor-pointer rounded " + (isFullscreenShown && "md:bg-gray-200 md:text-gray-800 dark:bg-violet-500")}>
                                Fullscreen
                                <BsArrowsFullscreen className="h-6 w-full"/>
                            </div>
                        }
                        <div
                            onClick={() => toggleQuoteWidget() }
                            className={"grid content-center justify-center gap-2 md:hover:bg-gray-200 md:hover:text-gray-800 md:dark:hover:bg-violet-500 cursor-pointer rounded " + (isQuoteShown && "md:bg-gray-200 md:text-gray-800 dark:bg-violet-500")}>
                            Quotes
                            <BsFillChatLeftQuoteFill className="h-6 w-full"/>
                        </div>
                    </div>
                </div>
>>>>>>> 0da02e5cbdc3093f4484331fdd4bde7b3c32cdea
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
