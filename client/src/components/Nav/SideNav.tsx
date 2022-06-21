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
import {
  BsArrowsFullscreen,
  BsFillChatLeftQuoteFill,
  BsTwitch,
} from "react-icons/bs";
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
  useToggleTwitch,
  useSideNavItemsStore
} from "@Store";
import { useState, useEffect } from "react";
import useMediaQuery from "@Utils/hooks/useMediaQuery";
import useSetDefault from "@App/utils/hooks/useSetDefault";
import { Tooltip } from "@mui/material";

import {
  toggledToastNotification,
  defaultToast,
  toastThemeNotification,
} from "@Utils/toast";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { fullscreenChanged, toggleFullScreen } from "@Utils/fullscreen";

export const SideNav = () => {
  const { isDark, toggleDarkMode } = useDarkToggleStore();
  const { isFullscreen } = useFullScreenToggleStore();
  const [active, setActive] = useState(false);
  const { isMusicToggled, setIsMusicToggled } = useToggleMusic();
  const { isTimerToggled, setIsTimerToggled } = useToggleTimer();
  const { isTasksToggled, setIsTasksToggled } = useToggleTasks();
  const { isSpotifyToggled, setIsSpotifyToggled } = useSpotifyMusic();
  const { isQuoteToggled, setIsQuoteToggled } = useToggleQuote();
  const { isTwitchToggled, setIsTwitchToggled } = useToggleTwitch();

  const { isTimerShown } = useToggleTimer();
  const { isStickyNoteShown } = useToggleStickyNote();
  const { isTasksShown } = useToggleTasks();
  const { isMusicShown } = useToggleMusic();
  const { isSpotifyShown } = useSpotifyMusic();
  const { isDarkModeShown } = useDarkToggleStore();
  const { isFullscreenShown } = useFullScreenToggleStore();
  const { isQuoteShown } = useToggleQuote();
  const { isWidgetResetShown } = useToggleWidgetReset();
  const { isTwitchShown } = useToggleTwitch();

  const { sideNavItemArray, setSideNavItemArray } = useSideNavItemsStore();

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
    setSideNavItemArray (
      [
        {
          "id": "1",
          "content": <IoMusicalNotesOutline className="h-6 w-6" />,
          "tooltipTitle": "Lofi Music",
          "isToggled": true,
          "setToggled": setIsMusicToggled(x),
          "toggleString": "Music Toggled",
          "toggleIcon": "🎵",
          "isShown": true
        }
      ]
    );
  }, []);

  useEffect(() => {
    console.log(sideNavItemArray);
  }, [sideNavItemArray]);

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

  let theme = isDark ? ( <MdWbSunny className="h-6 w-6" />) : (<MdDarkMode className="h-6 w-6" />);

  // a little function to help us with reordering the result
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  function onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const x = 
      reorder(
        sideNavItemArray,
        result.source.index,
        result.destination.index
      );

    //@ts-ignore
    setSideNavItemArray(x);
  }

  return (
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
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {
                  sideNavItemArray && sideNavItemArray.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                        <Tooltip title={item.tooltipTitle} placement="right">
                          <div>
                            <NavItem
                              onClick={() =>
                                toggledToastNotification(
                                  item.isToggled,
                                  item.setToggled,
                                  item.toggleString,
                                  750,
                                  item.toggleIcon
                                )
                              }
                              toggled={item.isToggled}
                              shown={item.isShown}
                            >
                              {item.content}
                            </NavItem>
                          </div>
                        </Tooltip>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          </div>
        </ul>
      </aside>
    </div>



    // <div className="sideNav flex absolute">
    //   <aside className="flex flex-col">
    //     <ul>
    //       <div className="sm:hidden">
    //         <NavItem onClick={toggleNavBar} shown={true}>
    //           <IoMenu className="h-6 w-6" />
    //         </NavItem>
    //       </div>
    //       <div
    //         className={`${
    //           active ? "" : "hidden"
    //         } w-full sm:flex sm:flex-grow sm:w-auto sm:flex-col`}
    //       >
    //         <Tooltip title="Lofi Music" placement="right">
    //           <div>
    //             <NavItem
    //               onClick={() =>
    //                 toggledToastNotification(
    //                   isMusicToggled,
    //                   setIsMusicToggled,
    //                   "Music Toggled",
    //                   750,
    //                   "🎵"
    //                 )
    //               }
    //               toggled={isMusicToggled}
    //               shown={isMusicShown}
    //             >
    //               <IoMusicalNotesOutline className="h-6 w-6" />
    //             </NavItem>
    //           </div>
    //         </Tooltip>
    //         <Tooltip title="Spotify" placement="right">
    //           <div>
    //             <NavItem
    //               onClick={() =>
    //                 toggledToastNotification(
    //                   isSpotifyToggled,
    //                   setIsSpotifyToggled,
    //                   "Spotify Toggled",
    //                   750,
    //                   "🎧"
    //                 )
    //               }
    //               toggled={isSpotifyToggled}
    //               shown={isSpotifyShown}
    //             >
    //               <FaSpotify className="h-6 w-6" />
    //             </NavItem>
    //           </div>
    //         </Tooltip>
    //         <Tooltip title="Task Tracker" placement="right">
    //           <div>
    //             <NavItem
    //               onClick={() =>
    //                 toggledToastNotification(
    //                   isTasksToggled,
    //                   setIsTasksToggled,
    //                   "Tasks Toggled",
    //                   750,
    //                   "📓"
    //                 )
    //               }
    //               toggled={isTasksToggled}
    //               shown={isTasksShown}
    //             >
    //               <CgNotes className="h-6 w-6" />
    //             </NavItem>
    //           </div>
    //         </Tooltip>
    //         <Tooltip title="Pomodoro Timer" placement="right">
    //           <div>
    //             <NavItem
    //               onClick={() =>
    //                 toggledToastNotification(
    //                   isTimerToggled,
    //                   setIsTimerToggled,
    //                   "Timer Toggled",
    //                   750,
    //                   "⏳"
    //                 )
    //               }
    //               toggled={isTimerToggled}
    //               shown={isTimerShown}
    //             >
    //               <MdOutlineTimer className="h-6 w-6" />
    //             </NavItem>
    //           </div>
    //         </Tooltip>
    //         {isDesktop && (
    //           <Tooltip title="Sticky Note" placement="right">
    //             <div>
    //               <NavItem
    //                 onClick={addNewStickyNote}
    //                 shown={isStickyNoteShown}
    //               >
    //                 <MdOutlineNoteAdd className="h-6 w-6" />
    //               </NavItem>
    //             </div>
    //           </Tooltip>
    //         )}
    //         <Tooltip title="Reset Positions" placement="right">
    //           <div>
    //             <NavItem
    //               onClick={toggleDefaultPositions}
    //               shown={isWidgetResetShown}
    //             >
    //               <VscDebugRestartFrame className="h-6 w-6" />
    //             </NavItem>
    //           </div>
    //         </Tooltip>
    //         <Tooltip title="Theme" placement="right">
    //           <div>
    //             <NavItem
    //               onClick={() =>
    //                 toastThemeNotification(isDark, toggleDarkMode)
    //               }
    //               shown={isDarkModeShown}
    //             >
    //               {isDark ? (
    //                 <MdWbSunny className="h-6 w-6" />
    //               ) : (
    //                 <MdDarkMode className="h-6 w-6" />
    //               )}
    //             </NavItem>
    //           </div>
    //         </Tooltip>
    //         <Tooltip title="Quotes" placement="right">
    //           <div>
    //             <NavItem
    //               onClick={() =>
    //                 toggledToastNotification(
    //                   isQuoteToggled,
    //                   setIsQuoteToggled,
    //                   "Quotes Toggled",
    //                   750,
    //                   "💬"
    //                 )
    //               }
    //               toggled={isQuoteToggled}
    //               shown={isQuoteShown}
    //             >
    //               <BsFillChatLeftQuoteFill className="h-6 w-6" />
    //             </NavItem>
    //           </div>
    //         </Tooltip>
    //         <Tooltip title="Twitch Stream" placement="right">
    //           <div>
    //             <NavItem
    //               onClick={() =>
    //                 toggledToastNotification(
    //                   isTwitchToggled,
    //                   setIsTwitchToggled,
    //                   "Twitch Toggled",
    //                   750,
    //                   "📺"
    //                 )
    //               }
    //               toggled={isTwitchToggled}
    //               shown={isTwitchShown}
    //             >
    //               <BsTwitch className="h-6 w-6" />
    //             </NavItem>
    //           </div>
    //         </Tooltip>
    //         {isDesktop && (
    //           <Tooltip title="Fullscreen" placement="right">
    //             <div>
    //               <NavItem
    //                 onClick={toggleFullScreen}
    //                 toggled={isFullscreen}
    //                 shown={isFullscreenShown}
    //               >
    //                 <BsArrowsFullscreen className="h-6 w-6" />
    //               </NavItem>
    //             </div>
    //           </Tooltip>
    //         )}
    //       </div>
    //     </ul>
    //   </aside>
    // </div>
  );
};
