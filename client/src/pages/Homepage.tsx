import { useState } from "react";
import {
  useToggleMusic,
  useToggleTimer,
  useToggleTasks,
  useSpotifyMusic,
  usePosTask,
  usePosMusic,
  usePosSpotify,
  usePosTimer,
  useStickyNote,
} from "@Store";
import { Player } from "@Components/Player/Player";
import { Timer } from "@Components/Timer/Timer";
import { TaskTracker } from "@Components/TaskTracker/TaskTracker";
import { Spotify } from "@Components/Player/Spotify/Player";
import { BackgroundNav } from "@Components/Nav/BackgroundNav";
import { GoGear } from "react-icons/go";
import { DWrapper } from "@Components/Dragggable/Draggable";

import { SettingsModal } from "@Components/Timer/Modal";
import { CryptoModal } from "@Components/Crypto/Modal";
import { FaEthereum } from "react-icons/fa";
import { Sticky } from "@Components/Sticky/Sticky";

import useMediaQuery from "../utils/hooks/useMediaQuery";

export const HomePage = ({ backgrounds }: { backgrounds: any }) => {
  const { isMusicToggled } = useToggleMusic();
  const { isTimerToggled } = useToggleTimer();
  const { isTasksToggled } = useToggleTasks();
  const { isSpotifyToggled } = useSpotifyMusic();
  const { stickyNotes, setStickyNotesPos } = useStickyNote();
  //const [isMobile, setIsMobile] = useState(false);
  const [isSettingsModal, setSettingsModal] = useState(false);
  const [isCryptoModal, setCryptoModal] = useState(false);

  // Position hooks
  const { taskPosX, taskPosY, setTaskPos } = usePosTask();
  const { musicPosX, musicPosY, setMusicPos } = usePosMusic();
  const { spotifyPosX, spotifyPosY, setSpotifyPos } = usePosSpotify();
  const { timerPosX, timerPosY, setTimerPos } = usePosTimer();
  const isDesktop = useMediaQuery("(min-width: 641px)");

  return (
    <div className="h-screen w-70 space-y-1">
      <div className="flex justify-end space-x-6">
        <button
          type="button"
          className="flex items-center rounded-md shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 focus:outline-none dark:bg-gray-800 dark:text-gray-200"
          onClick={() => setSettingsModal(true)}
        >
          Settings
          <GoGear className="-mr-1 ml-2" />
        </button>
        <BackgroundNav backgrounds={backgrounds} />
      </div>
      <div className="flex justify-end space-x-6">
        <SettingsModal
          isVisible={isSettingsModal}
          onClose={() => setSettingsModal(false)}
        />
      </div>
      <div className="flex justify-end space-x-6">
        <CryptoModal
          isVisible={isCryptoModal}
          onClose={() => setCryptoModal(false)}
        />
      </div>
      <div className="fixed bottom-0">
        <button
          type="button"
          className="flex items-center rounded-md shadow-sm px-4 py-2 bg-violet-700 text-white font-medium focus:outline-none dark:bg-violet-700 dark:text-violet-200"
          onClick={() => setCryptoModal(true)}
        >
          Donate
          <FaEthereum />
        </button>
      </div>
      {!isDesktop ? (
        <div className="flex flex-col items-center ml-8">
          <div className={`${isMusicToggled ? "block" : "hidden"}`}>
            <Player />
          </div>
          <div className={`${isSpotifyToggled ? "block" : "hidden"}`}>
            <Spotify />
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
          {stickyNotes.map((stickyNote) => {
            return (
              <DWrapper
                key={stickyNote.id}
                toggleHook={true}
                defaultX={stickyNote.stickyNotesPosX}
                defaultY={stickyNote.stickyNotesPosY}
                setPosition={setStickyNotesPos}
                isSticky={true}
                stickyID={stickyNote.id}
              >
                <Sticky id={stickyNote.id} text={stickyNote.text} />
              </DWrapper>
            );
          })}
          <DWrapper
            toggleHook={isTimerToggled}
            defaultX={timerPosX}
            defaultY={timerPosY}
            setPosition={setTimerPos}
            isSticky={false}
          >
            <Timer />
          </DWrapper>
          <DWrapper
            toggleHook={isTasksToggled}
            defaultX={taskPosX}
            defaultY={taskPosY}
            setPosition={setTaskPos}
            isSticky={false}
          >
            <TaskTracker />
          </DWrapper>
          <DWrapper
            toggleHook={isMusicToggled}
            defaultX={musicPosX}
            defaultY={musicPosY}
            setPosition={setMusicPos}
            isSticky={false}
          >
            <Player />
          </DWrapper>
          <DWrapper
            toggleHook={isSpotifyToggled}
            defaultX={spotifyPosX}
            defaultY={spotifyPosY}
            setPosition={setSpotifyPos}
            isSticky={false}
          >
            <Spotify />
          </DWrapper>
        </>
      )}
    </div>
  );
};
