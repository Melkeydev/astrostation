import { NavItem } from "./NavItems";
import { IoMusicalNotesOutline } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { CgNotes } from "react-icons/cg";
import { MdOutlineTimer, MdWbSunny, MdDarkMode } from "react-icons/md";
import { FaSpotify } from "react-icons/fa";
import {
  useDarkToggleStore,
  useStationPluginsStore,
  StationPlugin,
} from "../../store";
import { useState } from "react";

export const SideNav = () => {
  const { isDark, toggleDarkMode } = useDarkToggleStore();
  const [active, setActive] = useState(false);
  const { toggle: togglePlugin } = useStationPluginsStore()

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
              <NavItem onClick={() => togglePlugin(StationPlugin.LofiPlayer)}>
                <IoMusicalNotesOutline className="h-6 w-6" />
              </NavItem>
              <NavItem onClick={() => togglePlugin(StationPlugin.SpotifyPlayer)}>
                <FaSpotify className="h-6 w-6" />
              </NavItem>
              <NavItem onClick={() => togglePlugin(StationPlugin.TaskTracker)}>
                <CgNotes className="h-6 w-6" />
              </NavItem>
              <NavItem onClick={() => togglePlugin(StationPlugin.Timer)}>
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
