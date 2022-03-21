import create from "zustand";

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
}

export const useSong = create<SongState>((set) => ({
  song: songs[0],
  setSong: (songId) =>
    set({ song: songs.find((s) => s.id === songId) as SongTask }),
}));

type ISong = {
  isSong: string;
  setIsSong: (isSong: string) => void;
};

export const useSetSong = create<ISong>((set) => ({
  isSong: "jWIqKujW0NY",
  setIsSong: (isSong) => set({ isSong }),
}));

export const useTask = create<TaskState>((set) => ({
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
}));

type IBackground = {
  isBackground: number;
  setIsBackground: (isBackground: number) => void;
};

export const useSetBackground = create<IBackground>((set) => ({
  isBackground: 0,
  setIsBackground: (isBackground) => set({ isBackground }),
}));

type IToggleTasks = {
  isTasksToggled: boolean;
  setIsTasksToggled: (isTasksToggled: boolean) => void;
};

export const useToggleTasks = create<IToggleTasks>((set) => ({
  isTasksToggled: true,
  setIsTasksToggled: (isTasksToggled) => set({ isTasksToggled }),
}));

type IToggleMusic = {
  isMusicToggled: boolean;
  setIsMusicToggled: (isMusicToggled: boolean) => void;
};

export const useToggleMusic = create<IToggleMusic>((set) => ({
  isMusicToggled: true,
  setIsMusicToggled: (isMusicToggled) => set({ isMusicToggled }),
}));

type IToggleTimer = {
  isTimerToggled: boolean;
  setIsTimerToggled: (isTimerToggled: boolean) => void;
};

export const useToggleTimer = create<IToggleTimer>((set) => ({
  isTimerToggled: true,
  setIsTimerToggled: (isTimerToggled) => set({ isTimerToggled }),
}));
