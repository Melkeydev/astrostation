import { useDarkToggleStore, useSpotifyMusic } from "@Store";
import { useState } from "react";
import { AiOutlineReload } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { WithTooltip } from "../../Tooltip";

export const Spotify = () => {
  const { setIsSpotifyToggled } = useSpotifyMusic();
  const { isDark } = useDarkToggleStore();

  const [text, setText] = useState("");
  const [playlist, setPlaylist] = useState(
    "https://open.spotify.com/embed/playlist/37i9dQZF1DWWQRwui0ExPn"
  );

  function changePlaylist() {
    if (!text.includes("https://open.spotify.com/playlist/")) {
      alert("Invalid spotify URL");
      return;
    }
    const splitOn = (slicable: string, ...indices: number[]) =>
      [0, ...indices].map((n, i, m) => slicable.slice(n, m[i + 1]));
    const stitchUrl = splitOn(text, 24)[0] + "/embed" + splitOn(text, 24)[1];
    setPlaylist(stitchUrl);
    setText("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      changePlaylist();
    }
  }

  return (
    <div className="mb-2 w-72 max-w-sm justify-between rounded-lg bg-white/[.96] py-4 px-4 text-gray-800 shadow-md dark:border-gray-700 dark:bg-gray-800/[.96] dark:text-gray-300 sm:w-96">
      <WithTooltip text="Make sure to refresh after logging in">
        <div className="handle flex cursor-move items-center justify-between p-1">
          <p className="py-2 font-bold">Spotify</p>
          <IoCloseSharp
            className="cursor-pointer rounded bg-gray-800 dark:bg-gray-300 dark:text-gray-800 text-gray-100 hover:bg-gray-900"
            onClick={() => setIsSpotifyToggled(false)}
          />
        </div>
      </WithTooltip>

      <div className="cancelDrag justify-center">
        <iframe
          src={`${playlist}?utm_source=generator&theme=${isDark ? 0 : 1}`}
          height="380"
          width="100%"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        ></iframe>
      </div>
      <div className="flex items-center space-x-1 mt-2 p-1">
        <input
          className="cancelDrag w-full border placeholder-gray-600 dark:placeholder-gray-300 border-gray-300 p-1 dark:border-gray-500 dark:bg-gray-700/[.96] rounded-lg"
          type="text"
          value={text}
          placeholder="Paste Spotify URL here"
          onChange={(e) => {
            setText(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
        <AiOutlineReload
          className="w-5 cursor-pointer hover:text-slate-500"
          onClick={changePlaylist}
        />
      </div>
    </div>
  );
};
