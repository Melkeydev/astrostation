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
    {
      name: "tasks",
    }
  )
);

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
 * Side Nav Store
 * ---
 * Handle the visibility of the Sidebar Navigation section
 */

// TODO: Decide if we should use this or omit
type IToggleSideNav = {
  isSideNavToggled: boolean;
  setIsSideNavToggled: (isSideNavToggledToggled: boolean) => void;
};

export const useToggleSideNav = create<IToggleSideNav>((set) => ({
  isSideNavToggled: true,
  setIsSideNavToggled: (isSideNavToggled) => set({ isSideNavToggled }),
}));
