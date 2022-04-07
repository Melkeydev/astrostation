import create from "zustand";
import { persist } from "zustand/middleware";

/**
 * Timer Store
 * ---
 * Handler for Timer
 */
interface Timer {
  timerQueue: number;
  setTimerQueue: (newTime: number) => void;
}

export const useTimer = create<Timer>((set) => ({
  timerQueue: 60,
  setTimerQueue: (newTime) => set({ timerQueue: newTime }),
}));

/**
 * Pomo Counter Store
 * ---
 * Handler for Pomo Counts
 */
interface PomodoroCounter {
  pomodoroCounts: number;
  setPomodoroCounter: () => void;
}

export const useSetPomodoroCounter = create<PomodoroCounter>((set) => ({
  pomodoroCounts: 0,
  setPomodoroCounter: () =>
    set((state) => ({ pomodoroCounts: state.pomodoroCounts + 1 })),
}));

/**
 * Toggle Settings Store
 * ---
 * Handler for Settings
 */
interface IToggleSettings {
  isSettingsToggled: boolean;
  setIsSettingsToggled: (isSettingsToggled: boolean) => void;
}

export const useToggleSettings = create<IToggleSettings>((set) => ({
  isSettingsToggled: false,
  setIsSettingsToggled: (isSettingsToggled) => set({ isSettingsToggled }),
}));

/**
 * Max Pomodoro Store
 * ---
 * Handle for the amount of pomodoro's per task
 */

interface MaxPomo {
  maxPomodoro: number;
  defaultMaxPomodoro: () => void;
  setMaxPomodoro: (value: number) => void;
}

export const useMaxPomodoro = create<MaxPomo>(
  persist(
    (set, _) => ({
      maxPomodoro: 3,
      defaultMaxPomodoro: () => set(() => ({ maxPomodoro: 3 })),
      setMaxPomodoro: (value) => set({ maxPomodoro: value }),
    }),
    { name: "max_pomodoro_per_task" }
  )
);

/**
 * Has Started Store
 * ---
 * Handler has started in timer sessions
 */
interface HasStarted {
  hasStarted: boolean;
  setHasStarted: (hasStarted: boolean) => void;
}

export const useHasStarted = create<HasStarted>((set) => ({
  hasStarted: false,
  setHasStarted: (hasStarted) => set({ hasStarted }),
}));

/**
 * Break Started Store
 * ---
 * Handler break started in timer sessions
 */
interface BreakStarted {
  breakStarted: boolean;
  setBreakStarted: (breakStarted: boolean) => void;
}

export const useBreakStarted = create<BreakStarted>((set) => ({
  breakStarted: false,
  setBreakStarted: (breakStarted) => set({ breakStarted }),
}));

/**
 * Short Break Time Store
 * ---
 * Handle short break times
 */
interface ShortBreakTime {
  shortBreakLength: number;
  defaultShortBreakLength: () => void;
  setShortBreak: (value: number) => void;
}

export const useShortBreakTimer = create<ShortBreakTime>(
  persist(
    (set, _) => ({
      shortBreakLength: 60,
      defaultShortBreakLength: () => set(() => ({ shortBreakLength: 60 })),
      setShortBreak: (value) => set({ shortBreakLength: value }),
    }),
    { name: "short_break_timer_length" }
  )
);

/**
 * Long Break Time Store
 * ---
 * Handle long break times
 */
interface LongBreakTime {
  longBreakLength: number;
  defaultLongBreakLength: () => void;
  setLongBreak: (value: number) => void;
}

export const useLongBreakTimer = create<LongBreakTime>(
  persist(
    (set, _) => ({
      longBreakLength: 60,
      defaultLongBreakLength: () => set(() => ({ longBreakLength: 60 })),
      setLongBreak: (value) => set({ longBreakLength: value }),
    }),
    { name: "long_break_timer_length" }
  )
);

/**
 * Pomodoro Time Store
 * ---
 * Handle pomodoro times
 */
interface PomodoroTime {
  pomodoroLength: number;
  defaultPomodoroLength: () => void;
  setPomodoroLength: (value: number) => void;
}

export const usePomodoroTimer = create<PomodoroTime>(
  persist(
    (set, _) => ({
      pomodoroLength: 60,
      defaultPomodoroLength: () => set(() => ({ pomodoroLength: 60 })),
      setPomodoroLength: (value) => set({ pomodoroLength: value }),
    }),
    { name: "pomodoro_timer_length" }
  )
);

/**
 * Task Store
 * ---
 * Handle the tasks created in the tasks section
 */
interface Task {
  id: number;
  description: string;
  inProgress: boolean;
  completed: boolean;
  pomodoro: number;
  pomodoroCounter: number;
  alerted: boolean;
}

interface TaskState {
  tasks: Task[];
  addTask: (description: string, count: number, isBreak: boolean) => void;
  renameTask: (id: number, newName: string) => void;
  removeTask: (id: number) => void;
  toggleInProgressState: (id: number) => void;
  completeTask: (id: number) => void;
  setPomodoroCounter: (id: number) => void;
  alertTask: (id: number, flag: boolean) => void;
  setPomodoro: (id: number, newVal: number) => void;
}

export const useTask = create<TaskState>(
  persist(
    (set, _) => ({
      tasks: [],
      addTask: (description: string, count: number, isBreak: boolean) => {
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: Date.now() + state.tasks.length,
              description,
              inProgress: false,
              completed: false,
              pomodoro: count,
              pomodoroCounter: isBreak ? -1 : 0,
              alerted: false,
            } as Task,
          ],
        }));
      },
      renameTask: (id, newName) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? ({
                  ...task,
                  description: newName,
                } as Task)
              : task
          ),
        }));
      },
      removeTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
      },
      toggleInProgressState: (id) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? ({ ...task, inProgress: !task.inProgress } as Task)
              : task
          ),
        }));
      },
      completeTask: (id) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? ({ ...task, completed: !task.completed } as Task)
              : task
          ),
        }));
      },
      setPomodoroCounter: (id) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? ({
                  ...task,
                  pomodoroCounter:
                    task.pomodoroCounter < task.pomodoro
                      ? task.pomodoroCounter + 1
                      : task.pomodoro,
                } as Task)
              : task
          ),
        }));
      },
      setPomodoro: (id, newVal) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? ({
                  ...task,
                  pomodoro: newVal,
                } as Task)
              : task
          ),
        }));
      },
      alertTask: (id, flag) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? ({
                  ...task,
                  alerted: flag,
                } as Task)
              : task
          ),
        }));
      },
    }),
    { name: "user_tasks" }
  )
);

const songs = [
  {
    id: "0uw1Adx0psw",
    artist: "The Lofi Wifi Station",
    link: "https://www.youtube.com/watch?v=0uw1Adx0psw",
  },
  {
    id: "5qap5aO4i9A",
    artist: "Lofi Girl",
    link: "https://www.youtube.com/watch?v=5qap5aO4i9A",
  },
  {
    id: "aLqc8TdoLJ0",
    artist: "Ivy Station",
    link: "https://www.youtube.com/watch?v=aLqc8TdoLJ0",
  },
  {
    id: "jWIqKujW0NY",
    artist: "Tokyo Station",
    link: "https://www.youtube.com/watch?v=jWIqKujW0NY",
  },
];

interface SongTask {
  id: string;
  artist: string;
  link: string;
}

interface SongState {
  song: SongTask;
  setSong: (songID: string) => void;
  toggledSong: string;
  setToggledSong: (toggledSong: string) => void;
}

export const useSong = create<SongState>((set) => ({
  song: songs[0],
  setSong: (songId) =>
    set({ song: songs.find((s) => s.id === songId) as SongTask }),
  toggledSong: "",
  setToggledSong: (toggledSong) => set({ toggledSong }),
}));

/**
 * Background Store
 * ---
 * Handles the background image state of app
 */
type IBackground = {
  isBackground: number;
  setIsBackground: (isBackground: number) => void;
};

export const useSetBackground = create<IBackground>(
  persist(
    (set, _) => ({
      isBackground: 0,
      setIsBackground: (isBackground) => set({ isBackground }),
    }),
    {
      name: "app_background",
    }
  )
);

/**
 * Tasks Section Store
 * ---
 * Handle the visibility of the tasks section
 */
type IToggleTasks = {
  isTasksToggled: boolean;
  setIsTasksToggled: (isTasksToggled: boolean) => void;
};

export const useToggleTasks = create<IToggleTasks>(
  persist(
    (set, _) => ({
      isTasksToggled: true,
      setIsTasksToggled: (isTasksToggled) => set({ isTasksToggled }),
    }),
    {
      name: "show_tasks_section",
    }
  )
);

/**
 * Music Section Store
 * ---
 * Handle the visibility of the music section
 */
type IToggleMusic = {
  isMusicToggled: boolean;
  setIsMusicToggled: (isMusicToggled: boolean) => void;
};

export const useToggleMusic = create<IToggleMusic>(
  persist(
    (set, _) => ({
      isMusicToggled: true,
      setIsMusicToggled: (isMusicToggled) => set({ isMusicToggled }),
    }),
    {
      name: "show_music_section",
    }
  )
);

/**
 * Spotify Section Store
 * ---
 * Handle the visibility of the Spotify section
 */

type IToggleSpotify = {
  isSpotifyToggled: boolean;
  setIsSpotifyToggled: (isSpotifyToggled: boolean) => void;
};

export const useSpotifyMusic = create<IToggleSpotify>(
  persist(
    (set, _) => ({
      isSpotifyToggled: true,
      setIsSpotifyToggled: (isSpotifyToggled) => set({ isSpotifyToggled }),
    }),
    {
      name: "show_spotify_section",
    }
  )
);

/**
 * Timer Section Store
 * ---
 * Handle the visibility of the timer section
 */
type IToggleTimer = {
  isTimerToggled: boolean;
  setIsTimerToggled: (isTimerToggled: boolean) => void;
};

export const useToggleTimer = create<IToggleTimer>(
  persist(
    (set, _) => ({
      isTimerToggled: true,
      setIsTimerToggled: (isTimerToggled) => set({ isTimerToggled }),
    }),
    { name: "show_timer_section" }
  )
);

/**
 * Dark Mode Store
 * ---
 * Handle different styling between app dark and light mode
 */
type DarkModeState = {
  isDark: boolean;
  toggleDarkMode: () => void;
};

export const useDarkToggleStore = create<DarkModeState>(
  persist(
    (set, _) => ({
      isDark: true,
      toggleDarkMode: () => set((oldState) => ({ isDark: !oldState.isDark })),
    }),
    { name: "darkmode" }
  )
);
