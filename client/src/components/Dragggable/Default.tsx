import {
  usePosTask,
  usePosMusic,
  usePosSpotify,
  usePosTimerSettings,
  usePosTimer,
} from "../../store";

const { setTaskPosDefault } = usePosTask();
const { setMusicPosDefault } = usePosMusic();
const { setSpotifyPosDefault } = usePosSpotify();
const { setTimerPosDefault } = usePosTimer();
const { setTimerSettingsPosDefault } = usePosTimerSettings();
export function SetDefault() {
  setTaskPosDefault();
  setMusicPosDefault();
  setSpotifyPosDefault();
  setTimerPosDefault();
  setTimerSettingsPosDefault();
}
