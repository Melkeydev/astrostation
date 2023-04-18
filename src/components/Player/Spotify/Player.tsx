import { ISpotifyPlaylist } from "@Root/src/interfaces";
import { useDarkToggleStore, useShowSpotifyPlaylists, useSpotifyMusic, useSpotifyPlaylist } from "@Store";
import { useState } from "react";
import { AiOutlineDelete, AiOutlineReload } from "react-icons/ai";
import { IoChevronUp, IoCloseSharp } from "react-icons/io5";
import { WithTooltip } from "../../Tooltip";

export const Spotify = () => {
  const { setIsSpotifyToggled } = useSpotifyMusic();
  const { setSpotifyPlaylists, spotifyPlaylists } = useSpotifyPlaylist();
  const { setShowSpotifyPlaylists, showSpotifyPlaylists } = useShowSpotifyPlaylists();
  const { isDark } = useDarkToggleStore();
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [playlist, setPlaylist] = useState<ISpotifyPlaylist>({
    name: "lofi beats",
    url: "https://open.spotify.com/embed/playlist/37i9dQZF1DWWQRwui0ExPn",
  });

  function addPlaylist(url: string, name: string) {
    // Check if a URL has been entered
    if (url.length <= 0) {
      alert("Please enter a URL for the playlist");
      return;
    }
    // Check if the URL is a Spotify URL
    if (!url.includes("https://open.spotify.com/playlist/")) {
      alert("Invalid spotify URL");
      return;
    }
    // Stitch the URL together
    const splitOn = (slicable: string, ...indices: number[]) =>
      [0, ...indices].map((n, i, m) => slicable.slice(n, m[i + 1]));
    const stitchUrl = splitOn(url, 24)[0] + "/embed" + splitOn(url, 24)[1];
    // Check if the playlist already exists
    if (spotifyPlaylists.some(p => p.url === stitchUrl)) {
      alert("Playlist already exists");
      return;
    }
    // Check if the playlist limit has been reached
    if (spotifyPlaylists.length >= 5) {
      alert("You can only have 5 playlists");
      return;
    }
    // Check if a name has been entered
    if (name.length <= 0) {
      alert("Please enter a name for the playlist");
      return;
    }
    setSpotifyPlaylists([...spotifyPlaylists, { name: name, url: stitchUrl }]);
    setPlaylist({ name: name, url: stitchUrl });
    setUrl("");
    setName("");
  }

  function handleDelete(index: number) {
    const newPlaylists = spotifyPlaylists.filter((_, i) => i !== index);
    setSpotifyPlaylists(newPlaylists);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      addPlaylist(url, name);
    }
  }

  return (
    <div className="mb-2 w-72 max-w-sm justify-between rounded-lg bg-white/[.96] py-4 px-4 text-gray-800 shadow-md dark:border-gray-700 dark:bg-gray-800/[.96] dark:text-gray-300 sm:w-96">
      <WithTooltip text="Make sure to refresh after logging in">
        <div className="handle flex cursor-move items-center justify-between p-1">
          <p className="py-2 font-bold">Spotify</p>
          <IoCloseSharp
            className="cursor-pointer rounded bg-gray-800 text-gray-100 hover:bg-gray-900 dark:bg-gray-300 dark:text-gray-800"
            onClick={() => setIsSpotifyToggled(false)}
          />
        </div>
      </WithTooltip>

      <div className="cancelDrag justify-center">
        <iframe
          src={`${playlist.url}?utm_source=generator&theme=${isDark ? 0 : 1}`}
          height="380"
          width="100%"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        ></iframe>
      </div>
      <div className="mt-2 flex items-center space-x-1">
        <input
          className="cancelDrag w-full rounded-lg border border-gray-300 p-1 placeholder-gray-600 dark:border-gray-500 dark:bg-gray-700/[.96] dark:placeholder-gray-300"
          type="text"
          value={url}
          placeholder="Paste Spotify URL here"
          onChange={e => {
            setUrl(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />

        <AiOutlineReload
          className="w-5 cursor-pointer hover:text-slate-500"
          onClick={() => setPlaylist({ name: "", url: url })}
        />
      </div>
      <input
        className="cancelDrag w-full rounded-lg border border-gray-300 p-1 placeholder-gray-600 dark:border-gray-500 dark:bg-gray-700/[.96] dark:placeholder-gray-300"
        type="text"
        value={name}
        placeholder="Playlist name"
        onChange={e => {
          setName(e.target.value);
        }}
        onKeyDown={handleKeyDown}
      />
      <div className="flex flex-col gap-1">
        <IoChevronUp
          className={`${showSpotifyPlaylists ? "rotate-180" : ""}`}
          onClick={() => setShowSpotifyPlaylists(!showSpotifyPlaylists)}
        />
        {showSpotifyPlaylists && (
          <div className="flex flex-col">
            {spotifyPlaylists.map((playlist, index) => (
              <div className="flex items-center justify-between">
                <button onClick={() => setPlaylist(playlist)} key={index}>
                  {playlist.name}
                </button>
                <AiOutlineDelete
                  className="w-5 cursor-pointer hover:text-red-900"
                  onClick={() => handleDelete(index)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
