export interface IAudioVolume {
  audioVolume: number;
  setAudioVolume: (audioVolume: number) => void;
}

export interface IAlarmOption {
  alarm: string;
  setAlarm: (alarmPath: string) => void;
}

export interface ITimer {
  timerQueue: number;
  setTimerQueue: (newTime: number) => void;
}

export interface IPomodoroCounter {
  pomodoroCounts: number;
  setPomodoroCounter: () => void;
}

export interface IToggleSettings {
  isSettingsToggled: boolean;
  setIsSettingsToggled: (isSettingsToggled: boolean) => void;
}

export interface IPosTimerSettings {
  timerSettingsPosX: number;
  timerSettingsPosY: number;
  setTimerSettingsPos: (X: number, Y: number) => void;
  setTimerSettingsPosDefault: () => void;
}

export interface IHasStarted {
  hasStarted: boolean;
  setHasStarted: (hasStarted: boolean) => void;
}

export interface IBreakStarted {
  breakStarted: boolean;
  setBreakStarted: (breakStarted: boolean) => void;
}

export interface IShortBreakTime {
  shortBreakLength: number;
  defaultShortBreakLength: () => void;
  setShortBreak: (value: number) => void;
}

export interface ILongBreakTime {
  longBreakLength: number;
  defaultLongBreakLength: () => void;
  setLongBreak: (value: number) => void;
}

export interface IPomodoroTime {
  pomodoroLength: number;
  defaultPomodoroLength: () => void;
  setPomodoroLength: (value: number) => void;
}

export interface IStickyNote {
  id: number;
  text: string;
  stickyNotesPosX: number;
  stickyNotesPosY: number;
}

export interface IStickyNoteState {
  stickyNotes: IStickyNote[];
  addStickyNote: (text: string) => void;
  editNote: (id: number, newText: string) => void;
  removeNote: (id: number) => void;
  setStickyNotesPos: (id: number, X: number, Y: number) => void;
}

export interface IToggleStickyNote {
  isStickyNoteShown: boolean;
  setIsStickyNoteShown: (isStickyNoteShown: boolean) => void;
}

export interface ITask {
  id: number;
  description: string;
  inProgress: boolean;
  completed: boolean;
  pomodoro: number;
  pomodoroCounter: number;
  alerted: boolean;
  menuToggled: boolean;
}

export interface ITaskState {
  tasks: ITask[];
  addTask: (description: string, count: number, isBreak: boolean) => void;
  renameTask: (id: number, newName: string) => void;
  removeTask: (id: number) => void;
  removeAllTasks: () => void;
  toggleInProgressState: (id: number) => void;
  completeTask: (id: number) => void;
  setPomodoroCounter: (id: number) => void;
  alertTask: (id: number, flag: boolean) => void;
  setPomodoro: (id: number, newVal: number) => void;
  toggleMenu: (id: number, flag: boolean) => void;
}

export interface ISongTask {
  id: string;
  artist: string;
  link: string;
}

export interface ISongState {
  song: ISongTask;
  setSong: (songID: string) => void;
  toggledSong: string;
  setToggledSong: (toggledSong: string) => void;
}

export interface IBackground {
  isBackground: number;
  setIsBackground: (isBackground: number) => void;
}

export interface IToggleTasks {
  isTasksToggled: boolean;
  setIsTasksToggled: (isTasksToggled: boolean) => void;
  isTasksShown: boolean;
  setIsTasksShown: (isTasksShown: boolean) => void;
}

export interface IPosTask {
  taskPosX: number;
  taskPosY: number;
  setTaskPos: (X: number, Y: number) => void;
  setTaskPosDefault: () => void;
}

export interface IToggleMusic {
  isMusicToggled: boolean;
  setIsMusicToggled: (isMusicToggled: boolean) => void;
  isMusicShown: boolean;
  setIsMusicShown: (isMusicShown: boolean) => void;
}

export interface IPosMusic {
  musicPosX: number;
  musicPosY: number;
  setMusicPos: (X: number, Y: number) => void;
  setMusicPosDefault: () => void;
}

export interface IToggleSpotify {
  isSpotifyToggled: boolean;
  setIsSpotifyToggled: (isSpotifyToggled: boolean) => void;
  isSpotifyShown: boolean;
  setIsSpotifyShown: (isSpotifyShown: boolean) => void;
}

export interface IPosSpotify {
  spotifyPosX: number;
  spotifyPosY: number;
  setSpotifyPos: (X: number, Y: number) => void;
  setSpotifyPosDefault: () => void;
}

export interface IToggleTimer {
  isTimerToggled: boolean;
  setIsTimerToggled: (isTimerToggled: boolean) => void;
  isTimerShown: boolean;
  setIsTimerShown: (isTimerShown: boolean) => void;
}

export interface IPosTimer {
  timerPosX: number;
  timerPosY: number;
  setTimerPos: (X: number, Y: number) => void;
  setTimerPosDefault: () => void;
}

export interface IDarkModeState {
  isDark: boolean;
  toggleDarkMode: () => void;
  isDarkModeShown: boolean;
  setIsDarkModeShown: (isDarkModeShown: boolean) => void;
}

export interface IFullscreenState {
  isFullscreen: boolean;
  toggleFullscreenMode: () => void;
  isFullscreenShown: boolean;
  setIsFullscreenShown: (isFullscreenShown: boolean) => void;
}

export interface IToggleQuote {
  isQuoteToggled: boolean;
  setIsQuoteToggled: (isQuoteToggled: boolean) => void;
  isQuoteShown: boolean;
  setIsQuoteShown: (isQuoteShown: boolean) => void;
}

export interface IPosQuote {
  quotePosX: number;
  quotePosY: number;
  setQuotePos: (X: number, Y: number) => void;
  setQuotePosDefault: () => void;
}

export interface IToggleWidgetReset {
  isWidgetResetShown: boolean;
  setIsWidgetResetShown: (isWidgetResetShown: boolean) => void;
}

export interface IToggleTwitch {
  isTwitchToggled: boolean;
  setIsTwitchToggled: (isTwitchToggled: boolean) => void;
  isTwitchShown: boolean;
  setIsTwitchShown: (isTwitchShown: boolean) => void;
}

export interface IPosTwitch {
  twitchPosX: number;
  twitchPosY: number;
  setTwitchPos: (X: number, Y: number) => void;
  setTwitchPosDefault: () => void;
}

export interface IFirstTimeUserState {
  isFirstTimeUser: boolean;
  toggleIsFirstTimeUser: () => void;
}

export interface IGrid {
  grid: number[];
  setGrid: (grid: number[]) => void;
  setGridDefault: () => void;
}

export interface ILockWidgets {
  areWidgetsLocked: boolean;
  setAreWidgetsLocked: (areWidgetsLocked: boolean) => void;
}

export interface ISideNavItem {
  id: string;
  content: JSX.Element;
  tooltipTitle: string;
  isToggled: boolean;
  setToggled: (val: boolean) => void;
  toggleString: string;
  toggleIcon: string;
  isShown: boolean;
}

export interface ISideNavItems {
  sideNavItemArray: ISideNavItem[];
  setSideNavItemArray: (sideNavItemArray: ISideNavItem[]) => void;
}

export interface ISideNavOrderStore {
  sideNavOrder: number[];
  setSideNavOrder: (sideNavOrder: number[]) => void;
}
