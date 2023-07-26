import { useState } from "react";
import {
  useToggleMusic,
  useToggleTimer,
  useToggleTasks,
  useSpotifyMusic,
  usePosTask,
  useToggleStickyNote,
  useStickyNote,
  useToggleQuote,
  useToggleTwitch,
  useToggleYoutube,
  usePosMusic,
  usePosSpotify,
  usePosTimer,
  usePosQuote,
  usePosTwitch,
  usePosYoutube,
  useGrid,
  useSetBackground,
} from "@Store";
import { Player } from "@Components/Player/Player";
import { Timer } from "@Components/Timer/Timer";
import { TaskTracker } from "@Components/TaskTracker/TaskTracker";
import { Spotify } from "@Components/Player/Spotify/Player";
import { BackgroundNav } from "@Components/Nav/BackgroundNav";
import { DWrapper } from "@Components/Dragggable/Draggable";
import { CryptoDonationButton } from "@App/components/Crypto/Donation";
import { CustomizationButton } from "@App/components/Common/Buttons/CustomizationButton";
import { GoGear } from "react-icons/go";
import { SettingsModal } from "@App/components/Settings/Modal";
import { MdWidgets } from "react-icons/md";
import { WidgetControlModal } from "@App/components/WidgetControl/WidgetControlModal";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { Sticky } from "@Components/Sticky/Sticky";
import { Quotes } from "@App/components/Quotes/Quotes";
import useMediaQuery from "@Utils/hooks/useMediaQuery";
import { TwitchStream } from "@Components/Twitch/TwitchStream";
import { YoutubeVideo } from "@Components/Youtube/YoutubeVideo";
import { UnsplashFooter } from "../components/Nav/UnsplashFooter";
import clsx from "clsx";
import React from "react";
import { Background } from "@App/App";
import BottomButtons from "@Components/Nav/BottomButtons";

export const Astrostation = React.forwardRef<HTMLDivElement>((_props, ref) => {
  const { isMusicToggled, isMusicShown } = useToggleMusic();
  const { isTimerToggled, isTimerShown } = useToggleTimer();
  const { isTasksToggled, isTasksShown } = useToggleTasks();
  const { isSpotifyToggled, isSpotifyShown } = useSpotifyMusic();
  const { isStickyNoteShown } = useToggleStickyNote();
  const { isQuoteToggled, isQuoteShown } = useToggleQuote();
  const { isTwitchToggled, isTwitchShown } = useToggleTwitch();
  const { isYoutubeToggled, isYoutubeShown } = useToggleYoutube();

  // Position hooks
  const { taskPosX, taskPosY, setTaskPos } = usePosTask();
  const { musicPosX, musicPosY, setMusicPos } = usePosMusic();
  const { spotifyPosX, spotifyPosY, setSpotifyPos } = usePosSpotify();
  const { quotePosX, quotePosY, setQuotePos } = usePosQuote();
  const { timerPosX, timerPosY, setTimerPos } = usePosTimer();
  const { stickyNotes, setStickyNotesPos } = useStickyNote();
  const { twitchPosX, twitchPosY, setTwitchPos } = usePosTwitch();
  const { youtubePosX, youtubePosY, setYoutubePos } = usePosYoutube();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);
  const [isConfigureWidgetModalOpen, setIsConfigureWidgetModalOpen] = useState(false);
  const { backgroundId } = useSetBackground();
  const [isBackgroundModalOpen, setIsBackgroundModalOpen] = useState(false);
  const { grid } = useGrid();

  return (
    <div ref={ref} className="pb-8 md:h-screen md:pb-0">
      {backgroundId == Background.UNSPLASH && <UnsplashFooter />}
      <div className={"bodyPart ml-auto flex w-5/6 flex-wrap justify-end gap-2 py-2 px-2"}>
        <div className="settingsButton">
          <CustomizationButton
            title="Settings"
            icon={<GoGear className="-mr-1 ml-2" />}
            modal={<SettingsModal isVisible={isSettingsModalOpen} onClose={() => setSettingsModalOpen(false)} />}
            changeModal={setSettingsModalOpen}
          />
        </div>
        <div className="configureWidgetsButton">
          <CustomizationButton
            title="Configure Widgets"
            icon={<MdWidgets className="-mr-1 ml-2" />}
            modal={
              <WidgetControlModal
                isVisible={isConfigureWidgetModalOpen}
                onClose={() => setIsConfigureWidgetModalOpen(false)}
              />
            }
            changeModal={setIsConfigureWidgetModalOpen}
          />
        </div>
        <div className="chooseBackgroundButton">
          <CustomizationButton
            title="Choose Background"
            icon={<IoMdArrowDropdownCircle className="-mr-1 ml-2" />}
            modal={<BackgroundNav isVisible={isBackgroundModalOpen} onClose={() => setIsBackgroundModalOpen(false)} />}
            changeModal={setIsBackgroundModalOpen}
          />
        </div>
      </div>
      <CryptoDonationButton />
      <BottomButtons />
      {!isDesktop ? (
        <div className="ml-8 flex flex-col items-center pt-10 pb-40">
          <div className={clsx(isMusicToggled ? "block" : "hidden")}>
            <Player />
          </div>
          <div className={clsx(isSpotifyToggled ? "block" : "hidden")}>
            <Spotify />
          </div>
          <div className={clsx(isTimerToggled ? "block" : "hidden")}>
            <Timer />
          </div>
          <div className={clsx(isTasksToggled ? "block" : "hidden")}>
            <TaskTracker />
          </div>
          <div className={clsx(isQuoteToggled ? "block" : "hidden")}>
            <Quotes />
          </div>
        </div>
      ) : (
        <>
          {stickyNotes.map(stickyNote => {
            return (
              <DWrapper
                key={stickyNote.id}
                toggleHook={isStickyNoteShown}
                defaultX={stickyNote.stickyNotesPosX}
                defaultY={stickyNote.stickyNotesPosY}
                setPosition={setStickyNotesPos}
                isSticky={true}
                stickyID={stickyNote.id}
                gridValues={grid}
              >
                <Sticky id={stickyNote.id} text={stickyNote.text} color={stickyNote.color} />
              </DWrapper>
            );
          })}
          <DWrapper
            toggleHook={isTimerToggled && isTimerShown}
            defaultX={timerPosX}
            defaultY={timerPosY}
            setPosition={setTimerPos}
            isSticky={false}
            gridValues={grid}
          >
            <Timer />
          </DWrapper>
          <DWrapper
            toggleHook={isTasksToggled && isTasksShown}
            defaultX={taskPosX}
            defaultY={taskPosY}
            setPosition={setTaskPos}
            isSticky={false}
            gridValues={grid}
          >
            <TaskTracker />
          </DWrapper>
          <DWrapper
            toggleHook={isMusicToggled && isMusicShown}
            defaultX={musicPosX}
            defaultY={musicPosY}
            setPosition={setMusicPos}
            isSticky={false}
            gridValues={grid}
          >
            <Player />
          </DWrapper>
          <DWrapper
            toggleHook={isSpotifyToggled && isSpotifyShown}
            defaultX={spotifyPosX}
            defaultY={spotifyPosY}
            setPosition={setSpotifyPos}
            isSticky={false}
            gridValues={grid}
          >
            <Spotify />
          </DWrapper>
          <DWrapper
            toggleHook={isQuoteToggled && isQuoteShown}
            defaultX={quotePosX}
            defaultY={quotePosY}
            setPosition={setQuotePos}
            isSticky={false}
            gridValues={grid}
          >
            <Quotes />
          </DWrapper>
          <DWrapper
            toggleHook={isTwitchToggled && isTwitchShown}
            defaultX={twitchPosX}
            defaultY={twitchPosY}
            setPosition={setTwitchPos}
            isSticky={false}
            gridValues={grid}
          >
            <TwitchStream />
          </DWrapper>
          <DWrapper
            toggleHook={isYoutubeToggled && isYoutubeShown}
            defaultX={youtubePosX}
            defaultY={youtubePosY}
            setPosition={setYoutubePos}
            isSticky={false}
            gridValues={grid}
          >
            <YoutubeVideo />
          </DWrapper>
        </>
      )}
    </div>
  );
});
