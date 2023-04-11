import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { AiOutlineReload } from "react-icons/ai";
import { useToggleYoutube } from "@Store";

export const YoutubeVideo = () => {
  const defaultVideoId = "TYCBicKyVhs";
  const playlistText = "?listType=playlist&list=";
  const { isYoutubeToggled, isYoutubeShown, setIsYoutubeToggled } = useToggleYoutube();
  const [inputText, setInputText] = useState("");
  const [videoId, setVideoId] = useState(defaultVideoId);
  const regex = new RegExp("[^=|\/]*$");

  const handleVideoChange = (streamName: string) => {
    const id = streamName.match(regex)[0];
    
    if (id.length > 0) setVideoId(id);

    if (id.length > 11) setVideoId(playlistText + id);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const url = e.target.value;
      const id = url.match(regex)[0];
      handleVideoChange(id);
    }
  };

  return (
    <div className="w-full resize-x justify-between overflow-auto rounded-lg bg-white/[.96] py-2 text-gray-800 shadow-md dark:border-gray-700 dark:bg-gray-800/[.96] dark:text-gray-300 sm:w-96">
      <div className="handle flex items-center justify-between p-1">
        <p>Youtube</p>
        <IoCloseSharp
          className="cursor-pointer text-red-500 hover:bg-red-200"
          onClick={() => setIsYoutubeToggled(false)}
        />
      </div>
      <div className="relative aspect-video justify-center">
        {isYoutubeShown && isYoutubeToggled && (
          <iframe
            className="left-0 h-full w-full"
            src={"https://www.youtube.com/embed/" + videoId}
            allowFullScreen
          ></iframe>
        )}
      </div>
      <div className="cancelDrag flex items-center space-x-1 p-1">
        <input
          className="w-full border border-gray-300 p-1 dark:border-gray-500 dark:bg-gray-700/[.96]"
          type="text"
          value={inputText}
          placeholder="Paste video/playlist here..."
          onChange={e => {
            setInputText(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
        <AiOutlineReload
          className="w-5 cursor-pointer hover:text-slate-500"
          onClick={() => {
            handleVideoChange(inputText);
          }}
        />
      </div>
    </div>
  );
};
