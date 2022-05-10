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
  usePosTask,
  usePosMusic,
  usePosSpotify,
  usePosTimer,
  useStickyNote,
  usePosQuote
} from "../../store";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import useMediaQuery from "../../utils/hooks/useMediaQuery";

export const SideNav = () => {
  const { isDark, toggleDarkMode } = useDarkToggleStore();
  const { isFullscreen, toggleFullscreenMode } = useFullScreenToggleStore();
  const [active, setActive] = useState(false);
  const { isMusicToggled, setIsMusicToggled } = useToggleMusic();
  const { isTimerToggled, setIsTimerToggled } = useToggleTimer();
  const { isTasksToggled, setIsTasksToggled } = useToggleTasks();
  const { isSpotifyToggled, setIsSpotifyToggled } = useSpotifyMusic();
  const { isQuoteToggled, setIsQuoteToggled } = useToggleQuote();

  const { setTaskPosDefault } = usePosTask();
  const { setMusicPosDefault } = usePosMusic();
  const { setSpotifyPosDefault } = usePosSpotify();
  const { setTimerPosDefault } = usePosTimer();
  const { setQuotePosDefault } = usePosQuote();
  const { addStickyNote } = useStickyNote();
  

  const isDesktop = useMediaQuery("(min-width: 641px)");

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

  function fullscreenChanged() {
    toggleFullscreenMode();
    if (document.fullscreenElement) {
      openFullscreen();
    } else {
      closeFullscreen();
    }
  }

  function toggleDefaultPositions() {
    var answer = window.confirm(
      "This will reset tiles to default positon - are you sure?"
    );
    if (answer) {
      setTaskPosDefault();
      setMusicPosDefault();
      setSpotifyPosDefault();
      setTimerPosDefault();
      toast("Positions reset", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      window.location.reload();
    }
  }

  function toggleDark() {
    const nextVal = !isDark;
    toggleDarkMode();
    if (nextVal) {
      toast("Dark Mode", {
        icon: "🌙",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } else {
      toast("Light Mode", {
        icon: "☀️",
        style: {
          borderRadius: "10px",
        },
      });
    }
  }

  function toggleMusicPlayer() {
    const nextVal = !isMusicToggled;
    setIsMusicToggled(nextVal);
    if (nextVal) {
      toast("Music Toggled", {
        duration: 750,
        icon: "🎵",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  }
  function toggleTimerPlayer() {
    const nextVal = !isTimerToggled;
    setIsTimerToggled(nextVal);
    if (nextVal) {
      toast("Timer Toggled", {
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

  function toggleTaskTracker() {
    const nextVal = !isTasksToggled;
    setIsTasksToggled(nextVal);
    if (nextVal) {
      toast("Task Toggled", {
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

  function toggleSpotify() {
    const nextVal = !isSpotifyToggled;
    setIsSpotifyToggled(nextVal);
    if (nextVal) {
      toast("Spotify Toggled", {
        duration: 750,
        icon: "🎧",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  }

  function addNewStickyNote() {
    addStickyNote("");
  }

  function toggleNavBar() {
    setActive((oldDate) => !oldDate);
  }

  function openFullscreen() {
    const docFullScreenFunctions = document.documentElement as HTMLElement & {
      requestFullscreen(): Promise<void>;
      mozRequestFullScreen(): Promise<void>;
      webkitRequestFullscreen(): Promise<void>;
      msRequestFullscreen(): Promise<void>;
    };

    if (docFullScreenFunctions.requestFullscreen) {
      docFullScreenFunctions.requestFullscreen();
    } else if (docFullScreenFunctions.webkitRequestFullscreen) {
      /* Safari */
      docFullScreenFunctions.webkitRequestFullscreen();
    } else if (docFullScreenFunctions.msRequestFullscreen) {
      /* IE11 */
      docFullScreenFunctions.msRequestFullscreen();
    }
  }

  function closeFullscreen() {
    const docExitFunctions = document as Document & {
      exitFullscreen(): Promise<void>;
      mozCancelFullScreen(): Promise<void>;
      webkitExitFullscreen(): Promise<void>;
      msExitFullscreen(): Promise<void>;
    };

    if (docExitFunctions.exitFullscreen) {
      docExitFunctions.exitFullscreen();
    } else if (docExitFunctions.webkitExitFullscreen) {
      /* Safari */
      docExitFunctions.webkitExitFullscreen();
    } else if (docExitFunctions.msExitFullscreen) {
      /* IE11 */
      docExitFunctions.msExitFullscreen();
    }
  }

  function toggleFullScreen() {
    try {
      if (document.fullscreenElement) {
        closeFullscreen();
      } else {
        openFullscreen();
      }
    } catch (err) {
      alert("Cannot go into fullscreen mode: browser too old");
    }
  }

  function toggleQuote() {
    const nextVal = !isQuoteToggled;
    setIsQuoteToggled(!isQuoteToggled);
    if (nextVal) {
      toast("Quote Toggled", {
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

  return (
    <>
      <div className="flex absolute">
        <aside className="flex flex-col">
          <ul>
            <div className="sm:hidden">
              <NavItem onClick={toggleNavBar}>
                <IoMenu className="h-6 w-6" />
              </NavItem>
            </div>
            <div
              className={`${
                active ? "" : "hidden"
              } w-full sm:flex sm:flex-grow sm:w-auto sm:flex-col`}
            >
              <NavItem onClick={toggleMusicPlayer} toggled={isMusicToggled}>
                <IoMusicalNotesOutline className="h-6 w-6" />
              </NavItem>
              <NavItem onClick={toggleSpotify} toggled={isSpotifyToggled}>
                <FaSpotify className="h-6 w-6" />
              </NavItem>
              <NavItem onClick={toggleTaskTracker} toggled={isTasksToggled}>
                <CgNotes className="h-6 w-6" />
              </NavItem>
              <NavItem onClick={toggleTimerPlayer} toggled={isTimerToggled}>
                <MdOutlineTimer className="h-6 w-6" />
              </NavItem>

              {isDesktop && (
                <NavItem onClick={addNewStickyNote}>
                  <MdOutlineNoteAdd className="h-6 w-6" />
                </NavItem>
              )}

              <NavItem onClick={toggleDefaultPositions}>
                <VscDebugRestartFrame className="h-6 w-6" />
              </NavItem>
              <NavItem onClick={toggleDark}>
                {isDark ? (
                  <MdWbSunny className="h-6 w-6" />
                ) : (
                  <MdDarkMode className="h-6 w-6" />
                )}
              </NavItem>

              {isDesktop && (
                <NavItem onClick={toggleFullScreen} toggled={isFullscreen}>
                  <BsArrowsFullscreen className="h-6 w-6" />
                </NavItem>
              )}

              <NavItem onClick={toggleQuote} toggled={isQuoteToggled}>
                <BsFillChatLeftQuoteFill className="h-6 w-6" />
              </NavItem>
            </div>
          </ul>
        </aside>
      </div>
    </>
  );
};
