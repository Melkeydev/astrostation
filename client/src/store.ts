import create from "zustand";
import { persist } from "zustand/middleware";

/**
 * Max Pomodoro Store
 * ---
 * Handle for the amount of pomodoro's per task
 */

interface MaxPomo {
  maxPomodoro: number;
  increaseMaxPomodoro: () => void;
  decreaseMaxPomodoro: () => void;
  defaultMaxPomodoro: () => void;
}

export const useMaxPomodoro = create<MaxPomo>(
  persist(
    (set, _) => ({
      maxPomodoro: 3,
      decreaseMaxPomodoro: () =>
        set((state) => ({ maxPomodoro: state.maxPomodoro - 1 })),
      increaseMaxPomodoro: () =>
        set((state) => ({ maxPomodoro: state.maxPomodoro + 1 })),
      defaultMaxPomodoro: () => set(() => ({ maxPomodoro: 3 })),
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
 * Short Break Time Store
 * ---
 * Handle short break times
 */
interface ShortBreakTime {
  shortBreakLength: number;
  decreaseShortBreakLength: () => void;
  increaseShortBreakLength: () => void;
  defaultShortBreakLength: () => void;
}

export const useShortBreakTimer = create<ShortBreakTime>(
  persist(
    (set, _) => ({
      shortBreakLength: 300,
      decreaseShortBreakLength: () =>
        set((state) => ({ shortBreakLength: state.shortBreakLength - 60 })),
      increaseShortBreakLength: () =>
        set((state) => ({ shortBreakLength: state.shortBreakLength + 60 })),
      defaultShortBreakLength: () => set(() => ({ shortBreakLength: 300 })),
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
  decreaseLongBreakLength: () => void;
  increaseLongBreakLength: () => void;
  defaultLongBreakLength: () => void;
}

export const useLongBreakTimer = create<LongBreakTime>(
  persist(
    (set, _) => ({
      longBreakLength: 1500,
      decreaseLongBreakLength: () =>
        set((state) => ({ longBreakLength: state.longBreakLength - 60 })),
      increaseLongBreakLength: () =>
        set((state) => ({ longBreakLength: state.longBreakLength + 60 })),
      defaultLongBreakLength: () => set(() => ({ longBreakLength: 900 })),
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
  decreasePomodoroLength: () => void;
  increasePomodoroLength: () => void;
  defaultPomodoroLength: () => void;
}

export const usePomodoroTimer = create<PomodoroTime>(
  persist(
    (set, _) => ({
      pomodoroLength: 1500,
      decreasePomodoroLength: () =>
        set((state) => ({ pomodoroLength: state.pomodoroLength - 60 })),
      increasePomodoroLength: () =>
        set((state) => ({ pomodoroLength: state.pomodoroLength + 60 })),
      defaultPomodoroLength: () => set(() => ({ pomodoroLength: 1500 })),
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
}

interface TaskState {
  tasks: Task[];
  addTask: (description: string) => void;
  removeTask: (id: number) => void;
  toggleInProgressState: (id: number) => void;
  completeTask: (id: number) => void;
}

export const useTask = create<TaskState>(
  persist(
    (set, _) => ({
      tasks: [],
      addTask: (description: string) => {
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: state.tasks.length + 1,
              description,
              inProgress: false,
              completed: false,
            } as Task,
          ],
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
