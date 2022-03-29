import create from "zustand";
import { persist } from "zustand/middleware";

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
