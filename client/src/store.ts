import create from "zustand";
import { persist } from "zustand/middleware";

/**
 * Audio Volume Store
 * ---
 * Handler for Audio Volume
 */
interface AudioVolume {
  audioVolume: number;
  setAudioVolume: (audioVolume: number) => void;
}

export const useAudioVolume = create<AudioVolume>(
  persist(
    (set, _) => ({
      audioVolume: 0.7,
      setAudioVolume: (volume) => set({ audioVolume: volume }),
    }),
    { name: "set_audio_volume" }
  )
);

interface AlarmOption {
  alarm: string;
  setAlarm: (alarmPath: string) => void;
}

export const useAlarmOption = create<AlarmOption>(
  persist(
    (set, _) => ({
      alarm:
        "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav",
      setAlarm: (alarmPath) => set({ alarm: alarmPath }),
    }),
    { name: "set_alarm" }
  )
);

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

type IPosTimerSettings = {
  timerSettingsPosX: number;
  timerSettingsPosY: number;
  setTimerSettingsPos: (X: number, Y: number) => void;
  setTimerSettingsPosDefault: () => void;
};

export const usePosTimerSettings = create<IPosTimerSettings>(
  persist(
    (set, _) => ({
      timerSettingsPosX: 750,
      timerSettingsPosY: -200,
      setTimerSettingsPos: (X, Y) =>
        set({ timerSettingsPosX: X, timerSettingsPosY: Y }),
      setTimerSettingsPosDefault: () =>
        set(() => ({ timerSettingsPosX: 750, timerSettingsPosY: -200 })),
    }),
    {
      name: "set_timer_settings_position",
    }
  )
);

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
      shortBreakLength: 300,
      defaultShortBreakLength: () => set(() => ({ shortBreakLength: 300 })),
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
      longBreakLength: 900,
      defaultLongBreakLength: () => set(() => ({ longBreakLength: 900 })),
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
      pomodoroLength: 1500,
      defaultPomodoroLength: () => set(() => ({ pomodoroLength: 1500 })),
      setPomodoroLength: (value) => set({ pomodoroLength: value }),
    }),
    { name: "pomodoro_timer_length" }
  )
);

/**
 * Sticky Note Store
 * ---
 * Handle the sticky notes created in the tasks section
 */
interface StickyNote {
  id: number;
  text: string;
  stickyNotesPosX: number;
  stickyNotesPosY: number;
}

interface StickyNoteState {
  stickyNotes: StickyNote[];
  addStickyNote: (text: string) => void;
  editNote: (id: number, newText: string) => void;
  removeNote: (id: number) => void;
  setStickyNotesPos: (id: number, X: number, Y: number) => void;
}

interface IToggleStickyNote {
  isStickyNoteShown: boolean;
  setIsStickyNoteShown: (isStickyNoteShown: boolean) => void;
};

export const useToggleStickyNote = create<IToggleStickyNote>(
  persist(
    (set, _) => ({
      isStickyNoteShown: false,
      setIsStickyNoteShown: (isStickyNoteShown) => set({ isStickyNoteShown })
    }),
    {
      name: "state_sticky_note",
    }
  )
);

export const useStickyNote = create<StickyNoteState>(
  persist(
    (set, _) => ({
      stickyNotes: [],
      addStickyNote: (text: string) => {
        set((state) => ({
          stickyNotes: [
            ...state.stickyNotes,
            {
              id: Date.now() + state.stickyNotes.length,
              text: text,
              stickyNotesPosX: 165,
              stickyNotesPosY: 0,
            } as StickyNote,
          ],
        }));
      },
      editNote: (id, newText) => {
        set((state) => ({
          stickyNotes: state.stickyNotes.map((note) =>
            note.id === id
              ? ({
                  ...note,
                  text: newText,
                } as StickyNote)
              : note
          ),
        }));
      },
      removeNote: (id) => {
        set((state) => ({
          stickyNotes: state.stickyNotes.filter((note) => note.id !== id),
        }));
      },
      setStickyNotesPos: (id, X, Y) => {
        set((state) => ({
          stickyNotes: state.stickyNotes.map((note) =>
            note.id === id
              ? ({
                  ...note,
                  stickyNotesPosX: X,
                  stickyNotesPosY: Y,
                } as StickyNote)
              : note
          ),
        }));
      },
    }),
    { name: "user_sticky_notes" }
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
  removeAllTasks: () => void;
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
      removeAllTasks: () => set({ tasks: [] }),
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
    id: "6uddGul0oAc",
    artist: "Tokyo Station",
    link: "https://www.youtube.com/watch?v=6uddGul0oAc",
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
  isTasksShown: boolean;
  setIsTasksShown: (isTasksShown: boolean) => void;
};

export const useToggleTasks = create<IToggleTasks>(
  persist(
    (set, _) => ({
      isTasksToggled: false,
      setIsTasksToggled: (isTasksToggled) => set({ isTasksToggled }),
      isTasksShown: true,
      setIsTasksShown: (isTasksShown) => set({ isTasksShown })
    }),
    {
      name: "state_tasks_section",
    }
  )
);

type IPosTask = {
  taskPosX: number;
  taskPosY: number;
  setTaskPos: (X: number, Y: number) => void;
  setTaskPosDefault: () => void;
};

export const usePosTask = create<IPosTask>(
  persist(
    (set, _) => ({
      taskPosX: 804,
      taskPosY: 302,
      setTaskPos: (X, Y) => set({ taskPosX: X, taskPosY: Y }),
      setTaskPosDefault: () => set(() => ({ taskPosX: 804, taskPosY: 302 })),
    }),
    {
      name: "set_task_position",
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
  isMusicShown: boolean;
  setIsMusicShown: (isMusicShown: boolean) => void;
};

export const useToggleMusic = create<IToggleMusic>(
  persist(
    (set, _) => ({
      isMusicToggled: false,
      setIsMusicToggled: (isMusicToggled) => set({ isMusicToggled }),
      isMusicShown: true,
      setIsMusicShown: (isMusicShown) => set({ isMusicShown })
    }),
    {
      name: "state_music_section",
    }
  )
);

type IPosMusic = {
  musicPosX: number;
  musicPosY: number;
  setMusicPos: (X: number, Y: number) => void;
  setMusicPosDefault: () => void;
};

export const usePosMusic = create<IPosMusic>(
  persist(
    (set, _) => ({
      musicPosX: 400,
      musicPosY: 0,
      setMusicPos: (X, Y) => set({ musicPosX: X, musicPosY: Y }),
      setMusicPosDefault: () => set(() => ({ musicPosX: 400, musicPosY: 0 })),
    }),
    {
      name: "set_music_position",
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
  isSpotifyShown: boolean;
  setIsSpotifyShown: (isSpotifyShown: boolean) => void;
};

export const useSpotifyMusic = create<IToggleSpotify>(
  persist(
    (set, _) => ({
      isSpotifyToggled: false,
      setIsSpotifyToggled: (isSpotifyToggled) => set({ isSpotifyToggled }),
      isSpotifyShown: true,
      setIsSpotifyShown: (isSpotifyShown) => set({ isSpotifyShown })
    }),
    {
      name: "state_spotify_section",
    }
  )
);

type IPosSpotify = {
  spotifyPosX: number;
  spotifyPosY: number;
  setSpotifyPos: (X: number, Y: number) => void;
  setSpotifyPosDefault: () => void;
};

export const usePosSpotify = create<IPosSpotify>(
  persist(
    (set, _) => ({
      spotifyPosX: 400,
      spotifyPosY: 158,
      setSpotifyPos: (X, Y) => set({ spotifyPosX: X, spotifyPosY: Y }),
      setSpotifyPosDefault: () =>
        set(() => ({ spotifyPosX: 400, spotifyPosY: 158 })),
    }),
    {
      name: "set_spotify_position",
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
  isTimerShown: boolean;
  setIsTimerShown: (isTimerShown: boolean) => void;
};

export const useToggleTimer = create<IToggleTimer>(
  persist(
    (set, _) => ({
      isTimerToggled: false,
      setIsTimerToggled: (isTimerToggled) => set({ isTimerToggled }),
      isTimerShown: true,
      setIsTimerShown: (isTimerShown) => set({ isTimerShown })
    }),
    { name: "state_timer_section" }
  )
);

type IPosTimer = {
  timerPosX: number;
  timerPosY: number;
  setTimerPos: (X: number, Y: number) => void;
  setTimerPosDefault: () => void;
};

export const usePosTimer = create<IPosTimer>(
  persist(
    (set, _) => ({
      timerPosX: 804,
      timerPosY: 0,
      setTimerPos: (X, Y) => set({ timerPosX: X, timerPosY: Y }),
      setTimerPosDefault: () => set(() => ({ timerPosX: 804, timerPosY: 0 })),
    }),
    {
      name: "set_timers_position",
    }
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
  isDarkModeShown: boolean;
  setIsDarkModeShown: (isDarkModeShown: boolean) => void; 
};

export const useDarkToggleStore = create<DarkModeState>(
  persist(
    (set, _) => ({
      isDark: true,
      toggleDarkMode: () => set((oldState) => ({ isDark: !oldState.isDark })),
      isDarkModeShown: false,
      setIsDarkModeShown: (isDarkModeShown) => set({ isDarkModeShown })
    }),
    { name: "state_darkmode" }
  )
);

/**
 * Fullscreen Mode Store
 * ---
 * Handle state of fullscreen vs normal app view
 */
type FullscreenState = {
  isFullscreen: boolean;
  toggleFullscreenMode: () => void;
  isFullscreenShown: boolean;
  setIsFullscreenShown: (isFullscreenShown: boolean) => void;
};

export const useFullScreenToggleStore = create<FullscreenState>(
  persist(
    (set, _) => ({
      isFullscreen: false,
      toggleFullscreenMode: () => set((oldState) => ({ isFullscreen: !oldState.isFullscreen })),
      isFullscreenShown: false,
      setIsFullscreenShown: (isFullscreenShown) => set({ isFullscreenShown })
    }),
    { name: "state_fullscreen" }
  )
);

/**
 * Quote Section Store
 * ---
 * Handle the visibility of motivational/programming quotes
 */
type IToggleQuote = {
  isQuoteToggled: boolean;
  setIsQuoteToggled: (isQuoteToggled: boolean) => void;
  isQuoteShown: boolean;
  setIsQuoteShown: (isQuoteShown: boolean) => void;
};

export const useToggleQuote = create<IToggleQuote>(
  persist(
    (set, _) => ({
      isQuoteToggled: false,
      setIsQuoteToggled: (isQuoteToggled) => set({ isQuoteToggled }),
      isQuoteShown: false,
      setIsQuoteShown: (isQuoteShown) => set({ isQuoteShown }),
    }),
    {
      name: "state_quote_section",
    }
  )
);

type IPosQuote = {
  quotePosX: number;
  quotePosY: number;
  setQuotePos: (X: number, Y: number) => void;
  setQuotePosDefault: () => void;
};

export const usePosQuote = create<IPosQuote>(
  persist(
    (set, _) => ({
      quotePosX: 804,
      quotePosY: 436,
      setQuotePos: (X, Y) => set({ quotePosX: X, quotePosY: Y }),
      setQuotePosDefault: () => set(() => ({ quotePosX: 804, quotePosY: 436 })),
    }),
    {
      name: "set_quote_position",
    }
  )
);

/**
 * Reset Widgets Section Store
 * ---
 * Handle the visibility of the reset widget nav item
 */
interface IToggleWidgetReset {
  isWidgetResetShown: boolean;
  setIsWidgetResetShown: (isWidgetResetShown: boolean) => void;
};

export const useToggleWidgetReset = create<IToggleWidgetReset>(
  persist(
    (set, _) => ({
      isWidgetResetShown: false,
      setIsWidgetResetShown: (isWidgetResetShown) => set({ isWidgetResetShown })
    }),
    {
      name: "state_widget_reset",
    }
  )
);