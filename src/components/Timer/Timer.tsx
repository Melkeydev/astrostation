import { useState, useEffect, useRef } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { Button } from "@Components/Common/Button";
import {
  useToggleTimer,
  useShortBreakTimer,
  useLongBreakTimer,
  usePomodoroTimer,
  useHasStarted,
  useTimer,
  useBreakStarted,
  useAudioVolume,
  useAlarmOption,
} from "@Store";
import toast from "react-hot-toast";
import { secondsToTime, formatDisplayTime } from "@Utils/utils";
import { successToast } from "@Utils/toast";

export const Timer = () => {
  const { shortBreakLength, setShortBreak } = useShortBreakTimer();
  const { longBreakLength, setLongBreak } = useLongBreakTimer();
  const { pomodoroLength, setPomodoroLength } = usePomodoroTimer();
  const { hasStarted, setHasStarted } = useHasStarted();
  const { breakStarted, setBreakStarted } = useBreakStarted();
  const [breakLength, setBreakLength] = useState(shortBreakLength);
  const [timer, setTimer] = useState(60);
  const { setTimerQueue } = useTimer();
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");
  const [timerIntervalId, setTimerIntervalId] = useState(null);
  const [sessionType, setSessionType] = useState("Session");
  const { setIsTimerToggled } = useToggleTimer();
  const { alarm } = useAlarmOption();

  const audioRef = useRef();
  const { audioVolume } = useAudioVolume();

  useEffect(() => {
    setHasStarted(timerIntervalId !== null);
  }, [timerIntervalId]);

  useEffect(() => {
    if (timer === 0) {
      setTimerQueue(0);
      // @ts-ignore
      audioRef.current.volume = audioVolume;
      // @ts-ignore
      audioRef.current.play();
      if (sessionType === "Session") {
        setSessionType("Break");
        setTimer(breakLength);
        setBreakStarted(true);
        toast(
          (t) => (
            <div className="flex items-center justify-between">
              <div>Break Mode</div>
              <IoCloseSharp
                className="cursor-pointer text-red-500 hover:bg-red-200"
                onClick={() => toast.dismiss(t.id)}
              />
            </div>
          ),
          {
            duration: breakLength * 1000,
            icon: "😇",
            style: {
              borderRadius: "10px",
              padding: "16px",
              background: "#333",
              color: "#fff",
            },
          }
        );
      } else {
        setSessionType("Session");
        setTimer(pomodoroLength);
        setBreakStarted(false);
        setTimerQueue(pomodoroLength);
        toast.dismiss();
        toast(
          (t) => (
            <div className="flex items-center justify-between">
              <div>Work Mode</div>
              <IoCloseSharp
                className="cursor-pointer text-red-500 hover:bg-red-200"
                onClick={() => toast.dismiss(t.id)}
              />
            </div>
          ),
          {
            duration: breakLength * 1000,
            icon: "📚",
            style: {
              borderRadius: "10px",
              padding: "16px",
              background: "#333",
              color: "#fff",
            },
          }
        );
      }
    }
  }, [timer, sessionType, audioVolume]);

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

  // Show timer in page title when timer is running
  useEffect(() => {
    if (hasStarted) {
      const icon = sessionType === "Session" ? "⏱" : "☕️";
      // @ts-ignore
      document.title = `Astrostation ${icon}${formatDisplayTime(
        timerMinutes
      )}:${formatDisplayTime(timerSeconds)}`;
    } else {
      document.title = "Astrostation";
    }
  }, [hasStarted, timerMinutes, timerSeconds, sessionType]);

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
    setBreakStarted(false);
    setTimer(pomodoroLength);
    setTimerQueue(pomodoroLength);
  }

  function selectBreak(breakLength: number) {
    if (hasStarted) return; // guard against change when running
    if (sessionType == "Break") {
      return;
    }
    setBreakLength(breakLength);
    successToast(`Break Length Set at ${breakLength / 60} minutes`, false);
  }

  return (
    <div
      className={`${
        breakStarted && "bg-slate-200/[.96] shadow-lg"
      } mb-2 w-72 max-w-sm rounded-lg border border-gray-200 bg-white/[.96] py-2 px-1 text-gray-800 shadow-lg dark:border-gray-700 dark:bg-gray-800/[.96] dark:text-gray-300 sm:w-96`}
    >
      <div className="text-center">
        <div className="rounded p-2 text-center">
          <div className="flex justify-end">
            <IoCloseSharp
              className="cursor-pointer text-red-500 hover:bg-red-200"
              onClick={() => setIsTimerToggled(false)}
            />
          </div>
          {/* Controls */}
          <div className="flex">
            <div className="flex flex-1 flex-col items-center justify-center">
              <Button
                className={`text-gray-800 hover:text-white dark:text-white ${
                  breakLength === shortBreakLength && "border-2 border-blue-900"
                }`}
                variant="cold"
                onClick={() => selectBreak(shortBreakLength)}
                disabled={hasStarted}
              >
                Short Break
              </Button>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center">
              <Button
                className={`text-gray-800 hover:text-white dark:text-white ${
                  breakLength === longBreakLength && "border-2 border-blue-900"
                }`}
                // This should either be cold or coldPrimary
                variant="cold"
                onClick={() => selectBreak(longBreakLength)}
                disabled={hasStarted}
              >
                Long Break
              </Button>
            </div>
          </div>
          {/* Timer */}
          <div>
            <p id="tabular-nums">{sessionType}</p>
            <div className="text-7xl font-bold tabular-nums sm:text-9xl">
              {/*// @ts-ignore */}
              {formatDisplayTime(timerMinutes)}:{/*// @ts-ignore */}
              {formatDisplayTime(timerSeconds)}
            </div>
          </div>

          <div className="timer-control tabular-nums">
            <Button
              className="font-normal tabular-nums text-gray-800 hover:text-white dark:text-white"
              onClick={() => toggleCountDown()}
              variant="cold"
            >
              <p className="tabular-nums">{hasStarted ? "Pause" : "Start"}</p>
            </Button>
            <Button
              className="ml-4 font-normal tabular-nums text-gray-800 hover:text-white dark:text-white"
              variant="cold"
              onClick={handleResetTimer}
            >
              <p className="tabular-nums">Reset</p>
            </Button>
          </div>
        </div>
      </div>
      <audio id="beep" preload="auto" ref={audioRef} src={alarm} />
    </div>
  );
};
