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
  useLockWidgetsStore,
} from "@Store";
import { IoCloseSharp } from "react-icons/io5";
import { BsMusicPlayerFill, BsBellFill } from "react-icons/bs";
import { GiPanFlute } from "react-icons/gi";
import { CgPiano } from "react-icons/cg";
import { Button } from "@Components/Common/Button";
import { ToggleOption } from "./ToggleOption";
import { successToast } from "@App/utils/toast";
import useSetDefault from "@App/utils/hooks/useSetDefault";
import clsx from "clsx";

import piano from "/assets/music/piano.wav";
import flute from "/assets/music/flute.wav";
import arcade from "/assets/music/arcade.wav";
import bells from "/assets/music/bells.wav";

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
  const { areWidgetsLocked, setAreWidgetsLocked } = useLockWidgetsStore();
  const [currentWidgetLockState, setCurrentWidgetLockState] =
    useState(areWidgetsLocked);

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
    setAreWidgetsLocked(currentWidgetLockState);
    onClose();
    successToast("Settings saved", isDark);
  }

  function handleDefaults() {
    if (hasStarted) return;

    var answer = window.confirm("Are you sure you want to reset to defaults?");
    if (answer) {
      // set master states
      setDefault();

      // set local states
      setPomoCount(1500);
      setShortBreakState(300);
      setLongBreakState(900);
      setCurrentVolume(0.7);
      setCurrentAlarm(
        "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      );
      setCurrentGrid(null);
      setCurrentWidgetLockState(false);
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
    <div className="w-72 max-w-sm rounded-lg bg-white p-2 px-1 text-gray-800 shadow-md dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 sm:w-96">
      <div className="flex justify-end">
        <IoCloseSharp
          className="cursor-pointer text-red-500 hover:bg-red-200"
          onClick={onClose}
        />
      </div>
      <div className="grid">
        <div className="text-center text-lg">Settings</div>
        <div className="border-gray-100 p-4">
          <div className="rounded p-2 text-center">
            Time <span className="italic">(minutes)</span>
          </div>
          <div className="flex items-center justify-between gap-6 text-center">
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
        <hr className="border-t-3 border-[#5c5c5c]" />
        <div className="border-gray-100 p-4">
          <div className="rounded p-2 text-center">Alarm Volume</div>
          <div className="items-center px-2 pb-2">
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
        <hr className="border-t-3 border-[#5c5c5c]" />
        <div className="border-gray-100 p-4">
          <div className="rounded p-2 text-center">Alarm Sound</div>
          <div className="flex items-center justify-between gap-2 pb-2 text-center">
            <div className="w-1/4">
              Retro
              <div
                className={clsx(
                  "flex cursor-pointer items-center justify-center bg-gray-200 p-2 text-center dark:bg-gray-700 dark:text-gray-200",
                  currentAlarm == arcade && "border border-gray-200"
                )}
                onClick={() => changeAlarm(arcade)}
              >
                <BsMusicPlayerFill />
              </div>
            </div>
            <div className="w-1/4">
              Bells
              <div
                className={clsx(
                  "flex cursor-pointer items-center justify-center bg-gray-200 p-2 text-center dark:bg-gray-700 dark:text-gray-200",
                  currentAlarm == bells && "border border-gray-200"
                )}
                onClick={() => changeAlarm(bells)}
              >
                <BsBellFill />
              </div>
            </div>
            <div className="w-1/4">
              Flute
              <div
                className={clsx(
                  "flex cursor-pointer items-center justify-center bg-gray-200 p-2 text-center dark:bg-gray-700 dark:text-gray-200",
                  currentAlarm == flute && "border border-gray-200"
                )}
                onClick={() => changeAlarm(flute)}
              >
                <GiPanFlute />
              </div>
            </div>
            <div className="w-1/4">
              Piano
              <div
                className={clsx(
                  "flex cursor-pointer items-center justify-center bg-gray-200 p-2 text-center dark:bg-gray-700 dark:text-gray-200",
                  currentAlarm == piano && "border border-gray-200"
                )}
                onClick={() => changeAlarm(piano)}
              >
                <CgPiano />
              </div>
            </div>
          </div>
        </div>
        <hr className="border-t-3 border-[#5c5c5c]" />
        <div className="border-gray-100 p-4">
          <div className="rounded p-2 text-center">
            Grid Size (increasing Step Size)
          </div>
          <div className="items-center px-2 pb-2">
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
        <hr className="border-t-3 border-[#5c5c5c]" />
        <div className="border-gray-100 p-4">
          <div className="rounded pb-2 text-center">Lock Widgets In-place</div>
          <div className="flex justify-center">
            <Button
              className={clsx(
                "float-right w-[70%] font-normal text-gray-800 hover:text-white dark:text-white ",
                currentWidgetLockState && " bg-red-500 hover:bg-red-700"
              )}
              variant="primary"
              onClick={() => setCurrentWidgetLockState(!currentWidgetLockState)}
            >
              {currentWidgetLockState ? "Unlock" : "Lock"} Widgets
            </Button>
          </div>
        </div>
        <hr className="border-t-3 border-[#5c5c5c]" />
        <div className="flex justify-between p-2">
          <Button
            className="font-normal text-gray-800 hover:text-white dark:text-white"
            variant="cold"
            onClick={handleDefaults}
          >
            Default
          </Button>
          <Button
            className="font-normal text-gray-800 hover:text-white dark:text-white"
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
