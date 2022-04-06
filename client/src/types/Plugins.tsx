import { LofiPlayer } from "../components/Plugins/Players/Lofi";
import { SpotifyPlayer } from "../components/Plugins/Players/Spotify";
import { TaskTracker } from "../components/Plugins/TaskTracker";
import { Timer } from "../components/Plugins/Timer";

export type Plugin = "LofiPlayer" | "SpotifyPlayer" | "Timer" | "TaskTracker";

export function makeDraggablePluginComponent(name: Plugin): JSX.Element {
  if (name === "SpotifyPlayer") {
    return <SpotifyPlayer />;
  } else if (name === "LofiPlayer") {
    return <LofiPlayer />;
  } else if (name === "TaskTracker") {
    return <TaskTracker />;
  } else if (name === "Timer") {
    return <Timer />;
  }

  throw new Error("Plugin: Must be a plugin component");
}
