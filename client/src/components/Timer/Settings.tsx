import { useState } from "react";
import Slider from "rc-slider";
import {
  useDarkToggleStore,
  useShortBreakTimer,
  useLongBreakTimer,
  usePomodoroTimer,
  useHasStarted,
  useAudioVolume,
  useAlarmOption,
  useGrid,
} from "@Store";
import { IoCloseSharp } from "react-icons/io5";
import { BsMusicPlayerFill, BsBellFill } from "react-icons/bs";
import { GiPanFlute } from "react-icons/gi";
import { CgPiano } from "react-icons/cg";
import { Button } from "@Components/Common/Button";
import { ToggleOption } from "./ToggleOption";
import { successToast } from "@App/utils/toast";
import useSetDefault from "@App/utils/hooks/useSetDefault";

export const TimerSettings = ({ onClose }) => {
  const { isDark } = useDarkToggleStore();
  const { shortBreakLength, setShortBreak } = useShortBreakTimer();
  const { longBreakLength, setLongBreak } = useLongBreakTimer();
  const { pomodoroLength, setPomodoroLength } = usePomodoroTimer();
  const { hasStarted } = useHasStarted();
  const [pomoCount, setPomoCount] = useState(pomodoroLength);
  const [shortBreak, setShortBreakState] = useState(shortBreakLength);
  const [longBreak, setLongBreakState] = useState(longBreakLength);
  const { audioVolume, setAudioVolume } = useAudioVolume();
  const [currentVolume, setCurrentVolume] = useState(audioVolume);
  const { alarm, setAlarm } = useAlarmOption();
  const [currentAlarm, setCurrentAlarm] = useState(alarm);
  const { grid, setGrid } = useGrid();
  const [currentGrid, setCurrentGrid] = useState(grid);

  function onDefaultChange() {
    if (currentGrid === null) {
      return 0;
    }
    return currentGrid[0];
  }

  const setDefault = useSetDefault();

  function onVolumeChange(value: number) {
    setCurrentVolume(value);
  }

  function onGridChange(value: number) {
    if (value == 0) {
      setCurrentGrid(null);
      return;
    }
    setCurrentGrid([value, value]);
  }

  function onSubmit() {
    setShortBreak(shortBreak);
    setLongBreak(longBreak);
    setPomodoroLength(pomoCount);
    setAudioVolume(currentVolume);
    setAlarm(currentAlarm);
    setGrid(currentGrid);
    onClose();
    successToast("Settings saved", isDark);
  }

  function handleDefaults() {
    if (hasStarted) return;

    var answer = window.confirm("Are you sure you want to reset to defaults?");
    if (answer) {
      setDefault(false, true, false);

      setPomoCount(1500);
      setShortBreakState(300);
      setLongBreakState(900);
      setAudioVolume(0.7);
      setAlarm(
        "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      );
      setGrid(null);
    }
  }

  function handleLengthChange(
    e: any,
    decrement: string,
    increment: string,
    minLength: number,
    maxLength: number,
    propertyLength: number,
    setStateFunc: (val: number) => void,
    step: number
  ) {
    if (hasStarted) return; // guard against change when running

    if (e.target.id === decrement && propertyLength > minLength) {
      setStateFunc(propertyLength - step);
      e.target.nextSibling.value = Math.floor((propertyLength - step) / 60);
    } else if (e.target.id === increment && propertyLength < maxLength) {
      setStateFunc(propertyLength + step);
      e.target.previousSibling.value = Math.floor((propertyLength + step) / 60);
    }
  }

  function changeAlarm(alarmPath: string) {
    let audioRef = new Audio(alarmPath);
    audioRef.volume = currentVolume;
    audioRef.play();
    setCurrentAlarm(alarmPath);
  }

  return (
    <div className="p-2 px-1 w-72 sm:w-96 max-w-sm bg-white text-gray-800 rounded-lg shadow-md dark:text-gray-300 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-end">
        <IoCloseSharp
          className="text-red-500 cursor-pointer hover:bg-red-200"
          onClick={onClose}
        />
      </div>
      <div className="grid">
        <div className="text-center text-lg">Settings</div>
        <div className="border-b-2 border-gray-100 p-4">
          <div className="text-center p-2 rounded">
            Time <span className="italic">(minutes)</span>
          </div>
          <div className="flex justify-between items-center text-center gap-6">
            <ToggleOption
              title="Pomodoro"
              decrement="session-decrement"
              increment="session-increment"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                handleLengthChange(
                  e,
                  "session-decrement",
                  "session-increment",
                  60,
                  3600,
                  pomoCount,
                  setPomoCount,
                  60
                )
              }
              onChange={(e) => {
                if (hasStarted) {
                  e.target.readOnly = true;
                  return;
                }
                setPomoCount(e.target.value * 60);
              }}
              propertyLength={Math.floor(pomoCount / 60)}
              hasStarted={hasStarted}
            />
            <ToggleOption
              title="Short Break"
              decrement="short-break-decrement"
              increment="short-break-increment"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                handleLengthChange(
                  e,
                  "short-break-decrement",
                  "short-break-increment",
                  60,
                  3600,
                  shortBreak,
                  setShortBreakState,
                  60
                )
              }
              onChange={(e) => {
                if (hasStarted) {
                  e.target.readOnly = true;
                  return;
                }
                setShortBreakState(e.target.value * 60);
              }}
              propertyLength={Math.floor(shortBreak / 60)}
              hasStarted={hasStarted}
            />
            <ToggleOption
              title="Long Break"
              decrement="long-break-decrement"
              increment="long-break-increment"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                handleLengthChange(
                  e,
                  "long-break-decrement",
                  "long-break-increment",
                  60,
                  3600,
                  longBreak,
                  setLongBreakState,
                  60
                )
              }
              onChange={(e) => {
                if (hasStarted) {
                  e.target.readOnly = true;
                  return;
                }
                setLongBreakState(e.target.value * 60);
              }}
              propertyLength={Math.floor(longBreak / 60)}
              hasStarted={hasStarted}
            />
          </div>
        </div>
        <div className="border-b-2 border-gray-100 p-4">
          <div className="text-center p-2 rounded">Alarm Volume</div>
          <div className="px-2 pb-2 items-center">
            <Slider
              defaultValue={audioVolume}
              onChange={(value) => {
                onVolumeChange(value as number);
              }}
              step={0.1}
              min={0}
              max={1}
            />
          </div>
        </div>
        <div className="border-b-2 border-gray-100 p-4">
          <div className="text-center p-2 rounded">Alarm Sound</div>
          <div className="flex justify-between items-center text-center gap-2 pb-2">
            <div className="w-1/4">
              Retro
              <div
                className={`cursor-pointer flex justify-center bg-gray-200 p-2 text-center items-center dark:bg-gray-700 dark:text-gray-200 ${
                  currentAlarm == "/assets/music/arcade.wav" &&
                  "border border-gray-200"
                }`}
                onClick={() => changeAlarm("/arcade.wav")}
              >
                <BsMusicPlayerFill />
              </div>
            </div>
            <div className="w-1/4">
              Bells
              <div
                className={`cursor-pointer flex justify-center bg-gray-200 p-2 text-center items-center dark:bg-gray-700 dark:text-gray-200 ${
                  currentAlarm == "/assets/music/bells.wav" &&
                  "border border-gray-200"
                }`}
                onClick={() => changeAlarm("/bells.wav")}
              >
                <BsBellFill />
              </div>
            </div>
            <div className="w-1/4">
              Flute
              <div
                className={`cursor-pointer flex justify-center bg-gray-200 p-2 text-center items-center dark:bg-gray-700 dark:text-gray-200 ${
                  currentAlarm == "/assets/music/flute.wav" &&
                  "border border-gray-200"
                }`}
                onClick={() => changeAlarm("/flute.wav")}
              >
                <GiPanFlute />
              </div>
            </div>
            <div className="w-1/4">
              Piano
              <div
                className={`cursor-pointer flex justify-center bg-gray-200 p-2 text-center items-center dark:bg-gray-700 dark:text-gray-200 ${
                  currentAlarm == "/assets/music/piano.wav" &&
                  "border border-gray-200"
                }`}
                onClick={() => changeAlarm("/piano.wav")}
              >
                <CgPiano />
              </div>
            </div>
          </div>
          <div className="pt-4 pl-4 pr-4">
            <div className="text-center p-2 rounded">
              Grid Size (increasing Step Size)
            </div>
            <div className="px-2 pb-2 items-center">
              <Slider
                //@ts-ignore
                defaultValue={onDefaultChange}
                onChange={(value) => {
                  onGridChange(value as number);
                }}
                step={50}
                min={0}
                max={150}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between p-2">
          <Button
            className="text-gray-800 font-normal hover:text-white dark:text-white"
            variant="cold"
            onClick={handleDefaults}
          >
            Default
          </Button>
          <Button
            className="text-gray-800 font-normal hover:text-white dark:text-white"
            variant="cold"
            onClick={onSubmit}
          >
            Okay
          </Button>
        </div>
      </div>
    </div>
  );
};
