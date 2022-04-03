import {
  useShortBreakTimer,
  useLongBreakTimer,
  usePomodoroTimer,
  useHasStarted,
  useMaxPomodoro,
  useToggleSettings,
} from "../../store";
import { IoCloseSharp } from "react-icons/io5";
import { Button } from "../Common/Button";
import { ToggleOption } from "./ToggleOption";
export const TimerSettings = () => {
  const { setIsSettingsToggled } = useToggleSettings();
  const {
    shortBreakLength,
    decreaseShortBreakLength,
    increaseShortBreakLength,
    defaultShortBreakLength,
  } = useShortBreakTimer();
  const {
    longBreakLength,
    decreaseLongBreakLength,
    increaseLongBreakLength,
    defaultLongBreakLength,
  } = useLongBreakTimer();
  const {
    pomodoroLength,
    decreasePomodoroLength,
    increasePomodoroLength,
    defaultPomodoroLength,
  } = usePomodoroTimer();
  const { hasStarted } = useHasStarted();
  const {
    maxPomodoro,
    decreaseMaxPomodoro,
    increaseMaxPomodoro,
    defaultMaxPomodoro,
  } = useMaxPomodoro();

  function handleDefaults() {
    if (hasStarted) return;
    defaultShortBreakLength();
    defaultLongBreakLength();
    defaultPomodoroLength();
    defaultMaxPomodoro();
  }

  function handleLengthChange(
    e: any,
    decrement: string,
    increment: string,
    minLength: number,
    maxLength: number,
    propertyLength: number,
    decrementFunction: any,
    incrementFunction: any
  ) {
    if (hasStarted) return; // guard against change when running

    if (e.target.id === decrement && propertyLength > minLength) {
      decrementFunction();
    } else if (e.target.id === increment && propertyLength < maxLength) {
      incrementFunction();
    }
  }

  return (
    <div className="space-y-2 py-2 px-1 mb-2 max-w-sm bg-white text-gray-800 rounded-lg border border-gray-200 shadow-md dark:text-gray-300 dark:bg-gray-800 dark:border-gray-700 w-1/2">
      <div className="border-b-2 border-gray-100 p-2">
        <div className="flex justify-end">
          <IoCloseSharp
            className="text-red-500 cursor-pointer hover:bg-red-200"
            onClick={() => setIsSettingsToggled(false)}
          />
        </div>
        <div className="text-center p-2 rounded">Time (minutes)</div>
        <div className="flex justify-between items-center">
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
                pomodoroLength,
                decreasePomodoroLength,
                increasePomodoroLength
              )
            }
            propertyLength={Math.floor(pomodoroLength / 60)}
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
                shortBreakLength,
                decreaseShortBreakLength,
                increaseShortBreakLength
              )
            }
            propertyLength={Math.floor(shortBreakLength / 60)}
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
                longBreakLength,
                decreaseLongBreakLength,
                increaseLongBreakLength
              )
            }
            propertyLength={Math.floor(longBreakLength / 60)}
          />
        </div>
      </div>
      <div className="flex justify-between border-b-2 border-gray-100 px-2 pb-2 items-center">
        <div>Max Pomodoro's</div>
        <div className="bg-gray-200">
          <div className="flex p-2 space-x-5">
            <button
              id="pomodoro-decrement"
              onClick={(e) =>
                handleLengthChange(
                  e,
                  "pomodoro-decrement",
                  "pomodoro-increment",
                  1,
                  10,
                  maxPomodoro,
                  decreaseMaxPomodoro,
                  increaseMaxPomodoro
                )
              }
            >
              &lt;
            </button>
            <div>{Math.floor(maxPomodoro)}</div>
            <button
              id="pomodoro-increment"
              onClick={(e) =>
                handleLengthChange(
                  e,
                  "pomodoro-decrement",
                  "pomodoro-increment",
                  1,
                  10,
                  maxPomodoro,
                  decreaseMaxPomodoro,
                  increaseMaxPomodoro
                )
              }
            >
              &gt;
            </button>
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
          onClick={() => setIsSettingsToggled(false)}
        >
          Okay
        </Button>
      </div>
    </div>
  );
};
