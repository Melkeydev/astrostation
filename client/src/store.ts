import create from "zustand";

interface Task {
  id: number;
  description: string;
  completed: boolean;
}

interface TaskState {
  tasks: Task[];
  addTask: (description: string) => void;
  removeTask: (id: number) => void;
  toggleCompletedState: (id: number) => void;
}

export const useTask = create<TaskState>((set) => ({
  // initial state
  tasks: [],
  // methods for manipulating state
  addTask: (description: string) => {
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          id: state.tasks.length + 1,
          description,
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
  toggleCompletedState: (id) => {
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

{
  /*UNUSED*/
}
type IToggleSideNav = {
  isSideNavToggled: boolean;
  setIsSideNavToggled: (isSideNavToggledToggled: boolean) => void;
};

export const useToggleSideNav = create<IToggleSideNav>((set) => ({
  isSideNavToggled: true,
  setIsSideNavToggled: (isSideNavToggled) => set({ isSideNavToggled }),
}));
