import { NavItem } from "./NavItems";
import { IoMusicalNotesOutline } from "react-icons/io5";
import { IoImagesOutline } from "react-icons/io5";
import { CgNotes } from "react-icons/cg";
import { MdOutlineTimer } from "react-icons/md";
import { useToggleMusic, useToggleTimer } from "../../store";

export const SideNav = () => {
  const { isMusicToggled, setIsMusicToggled } = useToggleMusic();
  const { isTimerToggled, setIsTimerToggled } = useToggleTimer();

  function toggleMusicPlayer() {
    setIsMusicToggled(!isMusicToggled);
  }

  function toggleTimerPlayer() {
    setIsTimerToggled(!isTimerToggled);
  }

  return (
    <div className="flex absolute">
      <aside className="flex flex-col">
        <ul>
          <NavItem onClick={toggleMusicPlayer}>
            <IoMusicalNotesOutline className="h-6 w-6" />
          </NavItem>
          <NavItem>
            <IoImagesOutline className="h-6 w-6" />
          </NavItem>
          <NavItem>
            <CgNotes className="h-6 w-6" />
          </NavItem>
          <NavItem onClick={toggleTimerPlayer}>
            <MdOutlineTimer className="h-6 w-6" />
          </NavItem>
        </ul>

        <div className="mt-auto h-16 flex items-center w-full">
          <button className="h-16 mx-auto flex justify-center items-center w-full focus:text-orange-500 hover:bg-red-200 focus:outline-none">
            <svg
              className="h-5 w-5 text-red-700"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>
        </div>
      </aside>
    </div>
  );
};
