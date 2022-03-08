import create from "zustand";

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
