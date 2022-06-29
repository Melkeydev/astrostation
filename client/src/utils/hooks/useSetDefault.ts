import {
  usePosTask,
  usePosMusic,
  usePosSpotify,
  usePosTimer,
  useShortBreakTimer,
  useLongBreakTimer,
  usePomodoroTimer,
  usePosQuote,
  useGrid,
  usePosTwitch,
  useAlarmOption,
  useAudioVolume,
  useLockWidgetsStore
} from "@Store";

function useSetDefault() {
  const { setTaskPosDefault } = usePosTask();
  const { setMusicPosDefault } = usePosMusic();
  const { setSpotifyPosDefault } = usePosSpotify();
  const { setTimerPosDefault } = usePosTimer();
  const { setQuotePosDefault } = usePosQuote();
  const { setTwitchPosDefault } = usePosTwitch();
  const { setGridDefault } = useGrid();
  const { setAreWidgetsLocked } = useLockWidgetsStore();
  const { setAlarm } = useAlarmOption();
  const { setAudioVolume } = useAudioVolume();
  const { defaultShortBreakLength } = useShortBreakTimer();
  const { defaultLongBreakLength } = useLongBreakTimer();
  const { defaultPomodoroLength } = usePomodoroTimer();

  return (
    clearStorage: boolean,
    clearSettings: boolean,
    clearPosition: boolean
  ) => {
    if (clearStorage) {
      localStorage.clear();
    }

    // Reset all settings
    if (clearSettings) {
      defaultShortBreakLength();
      defaultLongBreakLength();
      defaultPomodoroLength();
      setGridDefault();
      setAlarm(
        "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      );
      setAudioVolume(0.7);
      setAreWidgetsLocked(false);
    }

    if (clearPosition) {
      // Reset all widget positions
      setTaskPosDefault();
      setMusicPosDefault();
      setSpotifyPosDefault();
      setTimerPosDefault();
      setQuotePosDefault();
      setTwitchPosDefault();
      window.location.reload();
    }
  };
}

export default useSetDefault;
