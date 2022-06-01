export interface IPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  changeVideo: () => void;
  setVolume: (volume: number | number[]) => void;
}

export interface IOptionType {
  playerVars: IPlayerVarsType;
}

export interface IPlayerVarsType {
  autoplay: number;
}
