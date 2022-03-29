import { IoCloseSharp } from "react-icons/io5";
import { useSpotifyMusic } from "../../../store";
export const Spotify = () => {
  const { setIsSpotifyToggled } = useSpotifyMusic();
  return (
    <div className="py-2 mb-2 max-w-sm text-gray-800 shadow-md rounded-lg dark:text-gray-300 bg-white dark:bg-gray-800 dark:border-gray-700 w-1/2 justify-between">
      <div className="flex justify-between items-center p-1">
        <p>Spotify</p>
        <IoCloseSharp
          className="text-red-500 cursor-pointer hover:bg-red-200"
          onClick={() => setIsSpotifyToggled(false)}
        />
      </div>
      <div className="justify-center">
        <iframe
          src="https://open.spotify.com/embed/playlist/37i9dQZF1DWWQRwui0ExPn?utm_source=generator&theme=0"
          height="380"
          width="100%"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        ></iframe>
      </div>
    </div>
  );
};
