import { useState, useEffect, useRef } from "react";
import {
  useToggleMusic,
  useToggleTimer,
  useToggleTasks,
  useSpotifyMusic,
  useToggleSettings,
} from "../store";
import { Player } from "../components/Player/Player";
import { Timer } from "../components/Timer/Timer";
import { TaskTracker } from "../components/TaskTracker/TaskTracker";
import { Spotify } from "../components/Player/Spotify/Player";
import { BackgroundNav } from "../components/Nav/BackgroundNav";
import { TimerSettings } from "../components/Timer/Settings";
import { GoGear } from "react-icons/go";
import { Donations } from "../components/Crypto/Donations";
import { DWrapper } from "../components/Dragggable/Draggable";

export const HomePage = ({ backgrounds }: { backgrounds: any }) => {
  const { isMusicToggled } = useToggleMusic();
  const { isTimerToggled } = useToggleTimer();
  const { isTasksToggled } = useToggleTasks();
  const { isSpotifyToggled } = useSpotifyMusic();
  const { isSettingsToggled, setIsSettingsToggled } = useToggleSettings();
  const [isMobile, setIsMobile] = useState(false);

  const [testX, setTestX] = useState(window.innerWidth * 0.8);

  console.log(testX);

  const ref = useRef();

  useEffect(() => {
    const listener = () => {
      triggerMouseEvent(ref.current, "mouseover");
      triggerMouseEvent(ref.current, "mousedown");
      triggerMouseEvent(document, "mousemove");
      triggerMouseEvent(ref.current, "mouseup");
      triggerMouseEvent(ref.current, "click");
    };

    addEventListener("resize", listener);
    return () => removeEventListener("resize", listener);
  }, []);

  const triggerMouseEvent = (element, eventType) => {
    const mouseEvent = document.createEvent("MouseEvents");

    mouseEvent.initEvent(eventType, true, true);
    element.dispatchEvent(mouseEvent);
  };

  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
  });

  const setDimension = () => {
    if (window.innerWidth < 641) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
    getDimension({
      dynamicWidth: window.innerWidth,
    });

    setTestX(window.innerWidth * 0.5);
  };

  useEffect(() => {
    window.addEventListener("resize", setDimension);

    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, [screenSize, testX]);

  return (
    <div className="h-screen w-70 space-y-1">
      <div className="flex justify-end space-x-6">
        <button
          type="button"
          className="flex items-center rounded-md shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 focus:outline-none dark:bg-gray-800 dark:text-gray-200"
          onClick={() => setIsSettingsToggled(!isSettingsToggled)}
        >
          Settings
          <GoGear className="-mr-1 ml-2" />
        </button>
        <BackgroundNav backgrounds={backgrounds} />
      </div>
      {isMobile ? (
        <div className="flex flex-col items-center ml-8">
          <div className={`${isMusicToggled ? "block" : "hidden"}`}>
            <Player />
          </div>
          <div className={`${isSpotifyToggled ? "block" : "hidden"}`}>
            <Spotify />
          </div>
          <div className={`${isSettingsToggled ? "block" : "hidden"}`}>
            <TimerSettings />
          </div>
          <div className={`${isTimerToggled ? "block" : "hidden"}`}>
            <Timer />
          </div>
          <div className={`${isTasksToggled ? "block" : "hidden"}`}>
            <TaskTracker />
          </div>
        </div>
      ) : (
        <>
          <DWrapper
            toggleHook={isMusicToggled}
            defaultX={750}
            defaultY={0}
            dragRef={ref}
          >
            <Player />
          </DWrapper>
          <DWrapper
            toggleHook={isSpotifyToggled}
            defaultX={300}
            defaultY={100}
            dragRef={ref}
          >
            <Spotify />
          </DWrapper>
          <DWrapper
            toggleHook={isSettingsToggled}
            defaultX={750}
            defaultY={-200}
            dragRef={ref}
          >
            <TimerSettings />
          </DWrapper>
          <DWrapper
            toggleHook={isTimerToggled}
            defaultX={750}
            defaultY={-745}
            dragRef={ref}
          >
            <Timer />
          </DWrapper>
          <DWrapper
            toggleHook={isTasksToggled}
            defaultX={300}
            defaultY={-1215}
            dragRef={ref}
          >
            <TaskTracker />
          </DWrapper>
        </>
      )}
      <div className="fixed bottom-0">
        <Donations />
      </div>
    </div>
  );
};
