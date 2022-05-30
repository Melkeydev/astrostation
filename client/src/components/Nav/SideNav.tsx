import { NavItem } from "./NavItems";
import { IoMusicalNotesOutline } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { CgNotes } from "react-icons/cg";
import {
  MdOutlineTimer,
  MdWbSunny,
  MdDarkMode,
  MdOutlineNoteAdd,
} from "react-icons/md";
import { VscDebugRestartFrame } from "react-icons/vsc";
import { BsArrowsFullscreen, BsFillChatLeftQuoteFill } from "react-icons/bs";
import { FaSpotify } from "react-icons/fa";
import {
  useToggleMusic,
  useToggleTimer,
  useToggleTasks,
  useSpotifyMusic,
  useDarkToggleStore,
  useFullScreenToggleStore,
  useToggleQuote,
  useStickyNote,
  useToggleStickyNote,
  useToggleWidgetReset,
} from "../../store";
import { useState, useEffect } from "react";
import useMediaQuery from "../../utils/hooks/useMediaQuery";
import useSetDefault from "@App/utils/hooks/useSetDefault";

import {
  toggledToasNotification,
  defaultToast,
  toastThemeNotification,
} from "../../utils/toast";

import { fullscreenChanged, toggleFullScreen } from "../../utils/fullscreen";

export const SideNav = () => {
  const { isDark, toggleDarkMode } = useDarkToggleStore();
  const { isFullscreen } = useFullScreenToggleStore();
  const [active, setActive] = useState(false);
  const { isMusicToggled, setIsMusicToggled } = useToggleMusic();
  const { isTimerToggled, setIsTimerToggled } = useToggleTimer();
  const { isTasksToggled, setIsTasksToggled } = useToggleTasks();
  const { isSpotifyToggled, setIsSpotifyToggled } = useSpotifyMusic();
  const { isQuoteToggled, setIsQuoteToggled } = useToggleQuote();

  const { isTimerShown } = useToggleTimer();
  const { isStickyNoteShown } = useToggleStickyNote();
  const { isTasksShown } = useToggleTasks();
  const { isMusicShown } = useToggleMusic();
  const { isSpotifyShown } = useSpotifyMusic();
  const { isDarkModeShown } = useDarkToggleStore();
  const { isFullscreenShown } = useFullScreenToggleStore();
  const { isQuoteShown } = useToggleQuote();
  const { isWidgetResetShown } = useToggleWidgetReset();

  const { addStickyNote } = useStickyNote();
  const isDesktop = useMediaQuery("(min-width: 641px)");
  const setDefault = useSetDefault();

  useEffect(() => {
    document.addEventListener("fullscreenchange", fullscreenChanged);
    document.addEventListener("keyup", function (e) {
      if (
        e.key === "F11" ||
        (e.key === "Escape" && document.fullscreenElement)
      ) {
        toggleFullScreen();
      }
    });
  }, []);

  useEffect(() => {
    document.addEventListener("fullscreenchange", fullscreenChanged);
    document.addEventListener("keyup", function (e) {
      if (
        e.key === "F11" ||
        (e.key === "Escape" && document.fullscreenElement)
      ) {
        toggleFullScreen();
      }
    });
  }, []);

  function toggleDefaultPositions() {
    var answer = window.confirm(
      "This will reset tiles to default positon - are you sure?"
    );
    if (answer) {
      setDefault(false, false, true);
      defaultToast("Positions reset");
      window.location.reload();
    }
  }

  function addNewStickyNote() {
    addStickyNote("");
  }

  function toggleNavBar() {
    setActive((oldDate) => !oldDate);
  }

  return (
    <>
      <div className="sideNav flex absolute">
        <aside className="flex flex-col">
          <ul>
            <div className="sm:hidden">
              <NavItem onClick={toggleNavBar} shown={true}>
                <IoMenu className="h-6 w-6" />
              </NavItem>
            </div>
            <div
              className={`${
                active ? "" : "hidden"
              } w-full sm:flex sm:flex-grow sm:w-auto sm:flex-col`}
            >
              <NavItem
                onClick={() =>
                  toggledToasNotification(
                    isMusicToggled,
                    setIsMusicToggled,
                    "Music Toggled",
                    750,
                    "🎵"
                  )
                }
                toggled={isMusicToggled}
                shown={isMusicShown}
              >
                <IoMusicalNotesOutline className="h-6 w-6" />
              </NavItem>
              <NavItem
                onClick={() =>
                  toggledToasNotification(
                    isSpotifyToggled,
                    setIsSpotifyToggled,
                    "Spotify Toggled",
                    750,
                    "🎧"
                  )
                }
                toggled={isSpotifyToggled}
                shown={isSpotifyShown}
              >
                <FaSpotify className="h-6 w-6" />
              </NavItem>
              <NavItem
                onClick={() =>
                  toggledToasNotification(
                    isTasksToggled,
                    setIsTasksToggled,
                    "Task Toggled",
                    750,
                    "📓"
                  )
                }
                toggled={isTasksToggled}
                shown={isTasksShown}
              >
                <CgNotes className="h-6 w-6" />
              </NavItem>
              <NavItem
                onClick={() =>
                  toggledToasNotification(
                    isTimerToggled,
                    setIsTimerToggled,
                    "Timer Toggled",
                    750,
                    "⏳"
                  )
                }
                toggled={isTimerToggled}
                shown={isTimerShown}
              >
                <MdOutlineTimer className="h-6 w-6" />
              </NavItem>
              {isDesktop && (
                <NavItem onClick={addNewStickyNote} shown={isStickyNoteShown}>
                  <MdOutlineNoteAdd className="h-6 w-6" />
                </NavItem>
              )}
              <NavItem
                onClick={toggleDefaultPositions}
                shown={isWidgetResetShown}
              >
                <VscDebugRestartFrame className="h-6 w-6" />
              </NavItem>
              <NavItem
                onClick={() => toastThemeNotification(isDark, toggleDarkMode)}
                shown={isDarkModeShown}
              >
                {isDark ? (
                  <MdWbSunny className="h-6 w-6" />
                ) : (
                  <MdDarkMode className="h-6 w-6" />
                )}
              </NavItem>
              <NavItem
                onClick={() =>
                  toggledToasNotification(
                    isQuoteToggled,
                    setIsQuoteToggled,
                    "Quotes Toggled",
                    750,
                    "💬"
                  )
                }
                toggled={isQuoteToggled}
                shown={isQuoteShown}
              >
                <BsFillChatLeftQuoteFill className="h-6 w-6" />
              </NavItem>

              {isDesktop && (
                <NavItem
                  onClick={toggleFullScreen}
                  toggled={isFullscreen}
                  shown={isFullscreenShown}
                >
                  <BsArrowsFullscreen className="h-6 w-6" />
                </NavItem>
              )}
            </div>
          </ul>
        </aside>
      </div>
    </>
  );
};
