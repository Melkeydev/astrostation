import { useSpotifyMusic } from "../../../../store";
import { Plugin } from "../../Plugin";

export const SpotifyPlayer = () => {
  const { setIsSpotifyToggled } = useSpotifyMusic();

  return (
    <Plugin title="Spotify" onClose={() => setIsSpotifyToggled(false)}>
      <div className="justify-center">
        <iframe
          src="https://open.spotify.com/embed/playlist/37i9dQZF1DWWQRwui0ExPn?utm_source=generator&theme=0"
          height="380"
          width="100%"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        ></iframe>
      </div>
    </Plugin>
  );
};
