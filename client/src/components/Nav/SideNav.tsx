import { NavItem } from "./NavItems";
import { IoMusicalNotesOutline } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { CgNotes } from "react-icons/cg";
import { MdOutlineTimer, MdWbSunny, MdDarkMode } from "react-icons/md";
import { FaSpotify } from "react-icons/fa";
import {
  useToggleMusic,
  useToggleTimer,
  useToggleTasks,
  useSpotifyMusic,
  useDarkToggleStore,
} from "../../store";
import { useState } from "react";

export const SideNav = () => {
  const { isDark, toggleDarkMode } = useDarkToggleStore();
  const [active, setActive] = useState(false);
  const { isMusicToggled, setIsMusicToggled } = useToggleMusic();
  const { isTimerToggled, setIsTimerToggled } = useToggleTimer();
  const { isTasksToggled, setIsTasksToggled } = useToggleTasks();
  const { isSpotifyToggled, setIsSpotifyToggled } = useSpotifyMusic();

  function toggleMusicPlayer() {
    setIsMusicToggled(!isMusicToggled);
  }

  function toggleTimerPlayer() {
    setIsTimerToggled(!isTimerToggled);
  }

  function toggleTaskTracker() {
    setIsTasksToggled(!isTasksToggled);
  }

  function toggleSpotify() {
    setIsSpotifyToggled(!isSpotifyToggled);
  }

  const toggleNavBar = () => {
    setActive((oldDate) => !oldDate);
  };

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
              <NavItem onClick={toggleMusicPlayer}>
                <IoMusicalNotesOutline className="h-6 w-6" />
              </NavItem>
              <NavItem onClick={toggleSpotify}>
                <FaSpotify className="h-6 w-6" />
              </NavItem>
              <NavItem onClick={toggleTaskTracker}>
                <CgNotes className="h-6 w-6" />
              </NavItem>
              <NavItem onClick={toggleTimerPlayer}>
                <MdOutlineTimer className="h-6 w-6" />
              </NavItem>
              <NavItem onClick={toggleDarkMode}>
                {isDark ? (
                  <MdWbSunny className="h-6 w-6" />
                ) : (
                  <MdDarkMode className="h-6 w-6" />
                )}
              </NavItem>
            </div>
          </ul>
        </aside>
      </div>
    </>
  );
};
