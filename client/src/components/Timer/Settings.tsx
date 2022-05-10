import { useState } from "react";
import Slider from "rc-slider";
import {
  useDarkToggleStore,
  useShortBreakTimer,
  useLongBreakTimer,
  usePomodoroTimer,
  useHasStarted,
  useMaxPomodoro,
  useAudioVolume,
  useAlarmOption,
} from "../../store";
import { IoCloseSharp } from "react-icons/io5";
import { BsMusicPlayerFill } from "react-icons/bs";
import { Button } from "../Common/Button";
import { ToggleOption } from "./ToggleOption";
import toast from "react-hot-toast";

export const TimerSettings = ({ onClose }) => {
  const { isDark } = useDarkToggleStore();
  const { shortBreakLength, defaultShortBreakLength, setShortBreak } =
    useShortBreakTimer();
  const { longBreakLength, defaultLongBreakLength, setLongBreak } =
    useLongBreakTimer();
  const { pomodoroLength, defaultPomodoroLength, setPomodoroLength } =
    usePomodoroTimer();
  const { maxPomodoro, defaultMaxPomodoro, setMaxPomodoro } = useMaxPomodoro();
  const { hasStarted } = useHasStarted();

  const [pomoCount, setPomoCount] = useState(pomodoroLength);
  const [shortBreak, setShortBreakState] = useState(shortBreakLength);
  const [longBreak, setLongBreakState] = useState(longBreakLength);
  const [maxPomo, setMaxPomo] = useState(maxPomodoro);
  const { audioVolume, setAudioVolume } = useAudioVolume();
  const [currentVolume, setCurrentVolume] = useState(audioVolume);
  const { alarm, setAlarm } = useAlarmOption();
  const [currentAlarm, setCurrentAlarm] = useState(alarm);

  function onVolumeChange(value) {
    setCurrentVolume(value);
  }

  function onSubmit() {
    setShortBreak(shortBreak);
    setLongBreak(longBreak);
    setPomodoroLength(pomoCount);
    setMaxPomodoro(maxPomo);
    setAudioVolume(currentVolume);
    setAlarm(currentAlarm);
    onClose();
    if (isDark) {
      toast.success("Settings saved", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } else {
      toast.success("Settings saved", {
        style: {
          borderRadius: "10px",
        },
      });
    }
  }

  function handleDefaults() {
    if (hasStarted) return;

    var answer = window.confirm("Are you sure you want to reset to defaults?");
    if (answer) {
      defaultShortBreakLength();
      defaultLongBreakLength();
      defaultPomodoroLength();
      defaultMaxPomodoro();

      setPomoCount(1500);
      setShortBreakState(300);
      setLongBreakState(900);
      setMaxPomo(3);
      setAudioVolume(0.7);
      setAlarm(
        "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      );
    }
  }

  function handleLengthChange(
    e: any,
    decrement: string,
    increment: string,
    minLength: number,
    maxLength: number,
    propertyLength: number,
    setStateFunc: any,
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
    <div className="space-y-2 py-2 px-1 mb-2 w-72 sm:w-96 max-w-sm bg-white text-gray-800 rounded-lg border border-gray-200 shadow-md dark:text-gray-300 dark:bg-gray-800 dark:border-gray-700">
      <div className="border-b-2 border-gray-100 p-2">
        <div className="flex justify-end">
          <IoCloseSharp
            className="text-red-500 cursor-pointer hover:bg-red-200"
            onClick={onClose}
          />
        </div>
        <div className="text-center p-2 rounded">Time (minutes)</div>
        <div className="flex justify-between items-center text-center gap-6">
          <ToggleOption
            title="Pomodoro"
            decrement="session-decrement"
            increment="session-increment"
            onClick={(e) =>
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
            onClick={(e) =>
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
            onClick={(e) =>
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
      <div className="flex justify-between border-b-2 border-gray-100 px-2 pb-2 items-center">
        <div>Max Pomodoros</div>
        <div className="bg-gray-200 dark:bg-gray-700 dark:text-gray-200 max-w-[103.33px]">
          <ToggleOption
            title=""
            decrement="pomodoro-decrement"
            increment="pomodoro-increment"
            onClick={(e) =>
              handleLengthChange(
                e,
                "pomodoro-decrement",
                "pomodoro-increment",
                60,
                3600,
                maxPomo,
                setMaxPomo,
                60
              )
            }
            onChange={(e) => {
              if (hasStarted) {
                e.target.readOnly = true;
                return;
              }
              setMaxPomo(e.target.value * 60);
            }}
            propertyLength={Math.floor(maxPomo / 60)}
            hasStarted={hasStarted}
          />
        </div>
      </div>
      <div className="text-center p-2 rounded">Alarm Volume</div>
      <div className="flex flex-col border-b-2 border-gray-100 px-2 pb-2 items-center">
        <Slider
          defaultValue={audioVolume}
          onChange={(value) => {
            onVolumeChange(value);
          }}
          step={0.1}
          min={0}
          max={1}
        />
      </div>
      <div className="text-center p-2 rounded">Alarm Sound</div>
      <div className="flex justify-between items-center text-center gap-2 pb-2 border-b-2 border-gray-100">
        <div className="w-1/4">
          Retro
          <div
            className={`cursor-pointer flex justify-center bg-gray-200 p-2 text-center items-center dark:bg-gray-700 dark:text-gray-200 ${
              currentAlarm == "/assets/music/arcade.wav" &&
              "border border-gray-200"
            }`}
            onClick={() => changeAlarm("/assets/music/arcade.wav")}
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
            onClick={() => changeAlarm("/assets/music/bells.wav")}
          >
            <BsMusicPlayerFill />
          </div>
        </div>
        <div className="w-1/4">
          Flute
          <div
            className={`cursor-pointer flex justify-center bg-gray-200 p-2 text-center items-center dark:bg-gray-700 dark:text-gray-200 ${
              currentAlarm == "/assets/music/flute.wav" &&
              "border border-gray-200"
            }`}
            onClick={() => changeAlarm("/assets/music/flute.wav")}
          >
            <BsMusicPlayerFill />
          </div>
        </div>
        <div className="w-1/4">
          Piano
          <div
            className={`cursor-pointer flex justify-center bg-gray-200 p-2 text-center items-center dark:bg-gray-700 dark:text-gray-200 ${
              currentAlarm == "/assets/music/piano.wav" &&
              "border border-gray-200"
            }`}
            onClick={() => changeAlarm("/assets/music/piano.wav")}
          >
            <BsMusicPlayerFill />
          </div>
        </div>
      </div>
      <div className="flex justify-between">
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
  );
};
