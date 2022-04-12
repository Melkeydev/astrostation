import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { AiOutlineReload } from "react-icons/ai";
import { StationPlugin, useStationPluginsStore } from "../../../store";
export const Spotify = () => {
  const { remove: removePlugin } = useStationPluginsStore()
  const [text, setText] = useState("");
  const [playlist, setPlaylist] = useState(
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWWQRwui0ExPn"
  );

  function changePlaylist() {
    if (!text.includes("https://open.spotify.com/playlist/")) {
      alert("Invalid spotify URL");
      return;
    }
    const splitOn = (slicable, ...indices) =>
      [0, ...indices].map((n, i, m) => slicable.slice(n, m[i + 1]));
    const stitchUrl = splitOn(text, 24)[0] + "/embed" + splitOn(text, 24)[1];
    setPlaylist(stitchUrl);
    setText("");
  }

  return (
    <div className=" py-4">
      <div className="flex justify-between items-center p-1">
        <p>Spotify</p>
        <IoCloseSharp
          className="text-red-500 cursor-pointer hover:bg-red-200"
          onClick={() => removePlugin(StationPlugin.SpotifyPlayer)}
        />
      </div>
      <div className="justify-center">
        <iframe
          src={`${playlist}?utm_source=generator&theme=0`}
          height="380"
          width="100%"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        ></iframe>
      </div>
      <div className="flex items-center space-x-1 mt-2 mx-2">
        <input
          className="w-full p-1 border border-gray-300 dark:bg-gray-700 dark:border-gray-500"
          type="text"
          value={text}
          placeholder="Ctrl-V Spotify URL here"
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <AiOutlineReload
          className="w-5 cursor-pointer hover:text-slate-500"
          onClick={changePlaylist}
        />
      </div>
    </div>
  );
};
