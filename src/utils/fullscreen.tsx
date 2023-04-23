import { useFullScreenToggleStore } from "@Store";
import { failureToast } from "@Root/src/utils/toast";

export function fullscreenChanged() {
  const { toggleFullscreenMode } = useFullScreenToggleStore();
  toggleFullscreenMode();
  if (document.fullscreenElement) {
    openFullscreen();
  } else {
    closeFullscreen();
  }
}

function openFullscreen() {
  const docFullScreenFunctions = document.documentElement as HTMLElement & {
    requestFullscreen(): Promise<void>;
    mozRequestFullScreen(): Promise<void>;
    webkitRequestFullscreen(): Promise<void>;
    msRequestFullscreen(): Promise<void>;
  };

  if (docFullScreenFunctions.requestFullscreen) {
    docFullScreenFunctions.requestFullscreen();
  } else if (docFullScreenFunctions.webkitRequestFullscreen) {
    /* Safari */
    docFullScreenFunctions.webkitRequestFullscreen();
  } else if (docFullScreenFunctions.msRequestFullscreen) {
    /* IE11 */
    docFullScreenFunctions.msRequestFullscreen();
  }
}

function closeFullscreen() {
  const docExitFunctions = document as Document & {
    exitFullscreen(): Promise<void>;
    mozCancelFullScreen(): Promise<void>;
    webkitExitFullscreen(): Promise<void>;
    msExitFullscreen(): Promise<void>;
  };

  if (docExitFunctions.exitFullscreen) {
    docExitFunctions.exitFullscreen();
  } else if (docExitFunctions.webkitExitFullscreen) {
    /* Safari */
    docExitFunctions.webkitExitFullscreen();
  } else if (docExitFunctions.msExitFullscreen) {
    /* IE11 */
    docExitFunctions.msExitFullscreen();
  }
}

export function toggleFullScreen() {
  try {
    if (document.fullscreenElement) {
      closeFullscreen();
    } else {
      openFullscreen();
    }
  } catch {
    failureToast("Cannot go into fullscreen mode: browser too old", false);
  }
}
