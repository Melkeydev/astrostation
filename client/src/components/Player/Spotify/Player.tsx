export const Spotify = () => {
  return (
    <div className="py-2 max-w-sm text-gray-800 shadow-md dark:text-gray-300 dark:bg-gray-800 dark:border-gray-700 w-1/2">
      <div className="bg-white rounded-t-lg p-1">Spotify</div>
      <div className="justify-center">
        <iframe
          className="rounded-lg"
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
