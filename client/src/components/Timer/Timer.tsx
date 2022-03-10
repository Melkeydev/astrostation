import React, { useState, useEffect, useRef } from "react";
import { Button } from "../Common/Button";

export const Timer = () => {
  const [sessionLength, setSessionLength] = useState(1500);
  const [breakLength, setBreakLength] = useState(300);

  const [timer, setTimer] = useState(1500);
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");
  const [timerIntervalId, setTimerIntervalId] = useState(null);
  const [isSession, setIsSession] = useState(false);
  const [sessionType, setSessionType] = useState("Session");

  const audioRef = useRef();
  let hasStarted = timerIntervalId !== null; // check timer state

  // // update timer display
  useEffect(() => {
    if (timer === 0) {
      audioRef.current.play();
      if (sessionType === "Session") {
        setSessionType("Break");
        setTimer(breakLength);
      } else {
        setSessionType("Session");
        setTimer(sessionLength);
      }
    }
  }, [timer, sessionType]);

  useEffect(() => {
    setTimer(sessionLength);
  }, [sessionLength]);

  useEffect(() => {
    let time = secondsToTime(timer);
    setTimerMinutes(time[0]);
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
          setTimerMinutes(time[0]);
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

  function handleBreakLengthChange(e: any) {
    if (hasStarted) return; // guard against change when running

    if (e.target.id === "break-decrement" && breakLength > 60) {
      setBreakLength((prevVal) => prevVal - 60);
    } else if (e.target.id === "break-increment" && breakLength < 3600) {
      setBreakLength((prevVal) => prevVal + 60);
    }
  }

  function handleSessionLengthChange(e) {
    if (hasStarted) return; // guard against change when running

    if (e.target.id === "session-decrement" && sessionLength > 60) {
      setSessionLength((prevVal) => prevVal - 60);
    } else if (e.target.id === "session-increment" && sessionLength < 3600) {
      setSessionLength((prevVal) => prevVal + 60);
    }
  }

  function handleResetTimer() {
    audioRef?.current?.load();
    if (timerIntervalId) {
      clearInterval(timerIntervalId);
    }
    setTimerIntervalId(null);
    setSessionLength(1500);
    setBreakLength(300);
    setSessionType("Session");
    setTimer(1500);
  }

  // TODO: add that it cannot be changed while in break mode
  function selectShortBreak() {
    if (sessionType == "Break") {
      return;
    }
    setBreakLength(300);
  }

  function selectLongBreak() {
    if (sessionType == "Break") {
      return;
    }
    setBreakLength(900);
  }

  return (
    <div className="py-2 px-1 mb-2 max-w-sm bg-white text-gray-800 rounded-lg border border-gray-200 shadow-md dark:text-gray-300 dark:bg-gray-800 dark:border-gray-700 w-1/2">
      <div className="text-center">
        <div className="text-center p-4 rounded">
          {/* Controls */}
          <div className="flex p-4">
            {/* Control 1 */}
            <div className="flex-1 flex-col flex justify-center items-center">
              {/*}
              <p id="break-label">Break Length</p>
              <div className="flex">
                <button
                  id="break-decrement"
                  onClick={(e) => handleBreakLengthChange(e)}
                >
                  &lt;
                </button>
                <div id="p-4">{Math.floor(breakLength / 60)}</div>
                <button
                  id="break-increment"
                  onClick={(e) => handleBreakLengthChange(e)}
                >
                  &gt;
                </button>
              </div>
              {*/}
              <Button className="text-gray-800 hover:text-white dark:text-white" variant="cold" onClick={selectShortBreak}>
                Short Break
              </Button>
            </div>

            {/* Control 2 */}
            <div className="flex-1 flex flex-col justify-center items-center">
              {/*}
              <p id="session-label">Session Length</p>
              <div className="flex">
                <button
                  id="session-decrement"
                  onClick={(e) => handleSessionLengthChange(e)}
                >
                  &lt;
                </button>
                <div id="p-4">{sessionLength / 60}</div>
                <button
                  id="session-increment"
                  onClick={(e) => handleSessionLengthChange(e)}
                >
                  &gt;
                </button>
              </div>
              {*/}
              <Button className="text-gray-800 hover:text-white dark:text-white" variant="cold" onClick={selectLongBreak}>
                Long Break
              </Button>
            </div>
          </div>

          {/* Timer */}
          <div className="rounded p-4 inline-block">
            <p id="timer-label">{sessionType}</p>
            <div className="text-9xl font-bold">
              {formatDisplayTime(timerMinutes)}:
              {formatDisplayTime(timerSeconds)}
            </div>
          </div>

          <div className="timer-control">
            <button id="start_stop" onClick={(e) => toggleCountDown()}>
              {hasStarted ? "Stop" : "Start"}
            </button>
            <button className="ml-4" id="pl-4" onClick={handleResetTimer}>
              Reset
            </button>
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
