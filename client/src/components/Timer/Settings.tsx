import {
  useShortBreakTimer,
  useLongBreakTimer,
  usePomodoroTimer,
  useHasStarted,
  useMaxPomodoro,
} from "../../store";
export const TimerSettings = () => {
  const {
    shortBreakLength,
    decreaseShortBreakLength,
    increaseShortBreakLength,
  } = useShortBreakTimer();
  const { longBreakLength, decreaseLongBreakLength, increaseLongBreakLength } =
    useLongBreakTimer();
  const { pomodoroLength, decreasePomodoroLength, increasePomodoroLength } =
    usePomodoroTimer();
  const { hasStarted, setHasStarted } = useHasStarted();
  const { maxPomodoro, decreaseMaxPomodoro, increaseMaxPomodoro } =
    useMaxPomodoro();

  function handleSessionLengthChange(e) {
    if (hasStarted) return; // guard against change when running

    if (e.target.id === "session-decrement" && pomodoroLength > 60) {
      decreasePomodoroLength();
    } else if (e.target.id === "session-increment" && pomodoroLength < 3600) {
      increasePomodoroLength();
    }
  }

  function handlePomodoroLengthChange(e) {
    if (hasStarted) return; // guard against change when running

    if (e.target.id === "pomodoro-decrement" && maxPomodoro > 1) {
      decreaseMaxPomodoro();
    } else if (e.target.id === "pomodoro-increment" && maxPomodoro < 10) {
      increaseMaxPomodoro();
    }
  }

  function handleShortBreakLengthChange(e: any) {
    if (hasStarted) return; // guard against change when running

    if (e.target.id === "short-break-decrement" && shortBreakLength > 60) {
      decreaseShortBreakLength();
    } else if (
      e.target.id === "short-break-increment" &&
      shortBreakLength < 3600
    ) {
      increaseShortBreakLength();
    }
  }

  function handleLongBreakLengthChange(e: any) {
    if (hasStarted) return; // guard against change when running

    if (e.target.id === "long-break-decrement" && longBreakLength > 60) {
      decreaseLongBreakLength();
    } else if (
      e.target.id === "long-break-increment" &&
      longBreakLength < 3600
    ) {
      increaseLongBreakLength();
    }
  }

  return (
    <div className="space-y-2 p-4 mb-2 max-w-sm bg-white text-gray-800 rounded-lg border border-gray-200 shadow-md dark:text-gray-300 dark:bg-gray-800 dark:border-gray-700 w-1/2">
      <div className="border-b-2 border-gray-100 pb-2">
        <div className="text-center p-2 rounded">Time (minutes)</div>
        <div className="flex justify-between items-center">
          <div>
            Pomodoro
            <div className="bg-gray-200 text-center items-center">
              <div className="flex justify-between p-2">
                <button
                  id="session-decrement"
                  onClick={(e) => handleSessionLengthChange(e)}
                >
                  &lt;
                </button>
                {Math.floor(pomodoroLength / 60)}
                <button
                  id="session-increment"
                  onClick={(e) => handleSessionLengthChange(e)}
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
          <div>
            Short Break
            <div className="bg-gray-200 text-center items-center">
              <div className="flex justify-between p-2">
                <button
                  id="short-break-decrement"
                  onClick={(e) => handleShortBreakLengthChange(e)}
                >
                  &lt;
                </button>
                {Math.floor(shortBreakLength / 60)}
                <button
                  id="short-break-increment"
                  onClick={(e) => handleShortBreakLengthChange(e)}
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
          <div>
            Long Break
            <div className="bg-gray-200 text-center items-center">
              <div className="flex justify-between p-2">
                <button
                  id="long-break-decrement"
                  onClick={(e) => handleLongBreakLengthChange(e)}
                >
                  &lt;
                </button>
                {Math.floor(longBreakLength / 60)}
                <button
                  id="long-break-increment"
                  onClick={(e) => handleLongBreakLengthChange(e)}
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between border-b-2 border-gray-100 pb-2 items-center">
        <div>Max Pomodoro's</div>
        <div className="bg-gray-200 text-center items-center">
          <div className="flex justify-between p-2">
            <button
              id="pomodoro-decrement"
              onClick={(e) => handlePomodoroLengthChange(e)}
            >
              &lt;
            </button>
            {Math.floor(maxPomodoro)}
            <button
              id="pomodoro-increment"
              onClick={(e) => handlePomodoroLengthChange(e)}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
