import create from "zustand";

type IBackground = {
  isBackground: number;
  setIsBackground: (isBackground: number) => void;
};

export const useSetBackground = create<IBackground>((set) => ({
  isBackground: 0,
  setIsBackground: (isBackground) => set({ isBackground }),
}));
