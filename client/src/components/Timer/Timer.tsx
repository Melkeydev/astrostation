import { useState, useEffect, useRef } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { Button } from "../Common/Button";
import {
  useShortBreakTimer,
  useLongBreakTimer,
  usePomodoroTimer,
  useHasStarted,
  useSetPomodoroCounter,
  useTimer,
  useBreakStarted,
  useStationPluginsStore,
  StationPlugin,
} from "../../store";

export const Timer = () => {
  const { shortBreakLength, setShortBreak } = useShortBreakTimer();
  const { longBreakLength, setLongBreak } = useLongBreakTimer();
  const { pomodoroLength, setPomodoroLength } = usePomodoroTimer();
  const { hasStarted, setHasStarted } = useHasStarted();
  const { setBreakStarted } = useBreakStarted();
  const [breakLength, setBreakLength] = useState(shortBreakLength);
  const [timer, setTimer] = useState(60);
  const { setTimerQueue } = useTimer();
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");
  const [timerIntervalId, setTimerIntervalId] = useState(null);
  const [sessionType, setSessionType] = useState("Session");
  const { setPomodoroCounter } = useSetPomodoroCounter();
  const { remove: removePlugin } = useStationPluginsStore()

  const audioRef = useRef();

  useEffect(() => {
    setHasStarted(timerIntervalId !== null);
  }, [timerIntervalId]);

  useEffect(() => {
    if (timer === 0) {
      setPomodoroCounter();
      setTimerQueue(0);
      // @ts-ignore
      audioRef.current.play();
      if (sessionType === "Session") {
        setSessionType("Break");
        setTimer(breakLength);
        setBreakStarted(true);
      } else {
        setSessionType("Session");
        setTimer(pomodoroLength);
        setBreakStarted(false);
        setTimerQueue(pomodoroLength);
      }
    }
  }, [timer, sessionType]);

  useEffect(() => {
    setTimer(pomodoroLength);
  }, [pomodoroLength]);

  useEffect(() => {
    let time = secondsToTime(timer);
    // @ts-ignore
    setTimerMinutes(time[0]);
    // @ts-ignore
    setTimerSeconds(time[1]);
  }, [timer]);

  function toggleCountDown() {
    if (hasStarted) {
      // started mode
      if (timerIntervalId) {
        clearInterval(timerIntervalId);
      }
      setTimerIntervalId(null);
    } else {
      // stopped mode
      // create accurate date timer with date
      const newIntervalId = setInterval(() => {
        setTimer((prevTime) => {
          let newTime = prevTime - 1;
          let time = secondsToTime(newTime);
          // @ts-ignore
          setTimerMinutes(time[0]);
          // @ts-ignore
          setTimerSeconds(time[1]);
          return newTime;
        });
      }, 1000);
      setTimerIntervalId(newIntervalId);
    }
  }

  // return minutes and seconds of seconds
  function secondsToTime(seconds: number) {
    return [Math.floor(seconds / 60), seconds % 60];
  }

  // zero paddings if < 10
  function formatDisplayTime(time: number) {
    if (time < 10) {
      return `0${time}`;
    } else {
      return time;
    }
  }

  function handleResetTimer() {
    // @ts-ignore
    audioRef?.current?.load();
    if (timerIntervalId) {
      clearInterval(timerIntervalId);
    }
    setTimerIntervalId(null);
    setPomodoroLength(pomodoroLength);
    setShortBreak(shortBreakLength);
    setLongBreak(longBreakLength);
    setSessionType("Session");
    setTimer(pomodoroLength);
    setTimerQueue(pomodoroLength);
  }

  function selectShortBreak() {
    if (hasStarted) return; // guard against change when running
    if (sessionType == "Break") {
      return;
    }
    setBreakLength(shortBreakLength);
  }

  function selectLongBreak() {
    if (hasStarted) return; // guard against change when running
    if (sessionType == "Break") {
      return;
    }
    setBreakLength(longBreakLength);
  }

  return (
    <div className="p-4">
      <div className="text-center">
        <div className="text-center rounded">
          <div className="flex justify-end">
            <IoCloseSharp
              className="text-red-500 cursor-pointer hover:bg-red-200"
              onClick={() => removePlugin(StationPlugin.Timer)}
            />
          </div>
          {/* Controls */}
          <div className="flex">
            <div className="flex-1 flex-col flex justify-center items-center">
              <Button
                className="text-gray-800 hover:text-white dark:text-white"
                variant="cold"
                onClick={selectShortBreak}
              >
                Short Break
              </Button>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center">
              <Button
                className="text-gray-800 hover:text-white dark:text-white"
                variant="cold"
                onClick={selectLongBreak}
              >
                Long Break
              </Button>
            </div>
          </div>

          {/* Timer */}
          <div className="rounded p-4 inline-block">
            <p id="timer-label">{sessionType}</p>
            <div className="text-7xl sm:text-9xl font-bold">
              {/*// @ts-ignore */}
              {formatDisplayTime(timerMinutes)}:{/*// @ts-ignore */}
              {formatDisplayTime(timerSeconds)}
            </div>
          </div>

          <div className="timer-control">
            <Button
              className="text-gray-800 font-normal hover:text-white dark:text-white"
              onClick={() => toggleCountDown()}
              variant="cold"
            >
              {hasStarted ? "Stop" : "Start"}
            </Button>
            <Button
              className="text-gray-800 font-normal hover:text-white dark:text-white ml-4"
              variant="cold"
              onClick={handleResetTimer}
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
      <audio
        id="beep"
        preload="auto"
        ref={audioRef}
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </div>
  );
};
