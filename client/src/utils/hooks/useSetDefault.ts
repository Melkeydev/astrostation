import {
  usePosTask,
  usePosMusic,
  usePosSpotify,
  usePosTimer,
  useShortBreakTimer,
  useLongBreakTimer,
  usePomodoroTimer,
  useMaxPomodoro,
} from "../../store";

function useSetDefault() {
  const { setTaskPosDefault } = usePosTask();
  const { setMusicPosDefault } = usePosMusic();
  const { setSpotifyPosDefault } = usePosSpotify();
  const { setTimerPosDefault } = usePosTimer();
  const { defaultShortBreakLength } = useShortBreakTimer();
  const { defaultLongBreakLength } = useLongBreakTimer();
  const { defaultPomodoroLength } = usePomodoroTimer();
  const { defaultMaxPomodoro } = useMaxPomodoro();

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
      defaultMaxPomodoro();
    }

    if (clearPosition) {
      // Reset all widget positions
      setTaskPosDefault();
      setMusicPosDefault();
      setSpotifyPosDefault();
      setTimerPosDefault();
    }
  };
}

export default useSetDefault;
