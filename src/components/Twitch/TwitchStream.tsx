import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { AiOutlineReload } from "react-icons/ai";
import { useToggleTwitch } from "@Store";

export const TwitchStream = () => {
  const { isTwitchToggled, isTwitchShown, setIsTwitchToggled } = useToggleTwitch();
  const [inputText, setInputText] = useState("");
  const [twitchStreamer, setTwitchStreamer] = useState("melkey");
  const [parentHostName, setParentHostName] = useState("astrostation.me");

  // doing this for convenience (we don't have a real staging env)
  // don't ever mix prod and dev code, can cause major security flaws (not here, but you know)
  useEffect(() => {
    if (window.location.hostname === "localhost") {
      setParentHostName("localhost");
    }
  }, []);

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      handleStreamerChange(e.target.value);
    }
  };

  const handleStreamerChange = streamName => {
    if (streamName.length > 0) {
      setTwitchStreamer(streamName);
    }
  };

  // The following resize fix is a thanks to adamdotjs.
  // https://play.tailwindcss.com/jp2JnWgRoW -> his solution
  return (
    <div className="w-full resize-x justify-between overflow-auto rounded-lg bg-white/[.96] py-2 text-gray-800 shadow-md dark:border-gray-700 dark:bg-gray-800/[.96] dark:text-gray-300 sm:w-96">
      <div className="handle flex items-center justify-between p-1">
        <p>Twitch</p>
        <IoCloseSharp
          className="cursor-pointer text-red-500 hover:bg-red-200"
          onClick={() => setIsTwitchToggled(false)}
        />
      </div>
      <div className="relative aspect-video justify-center">
        {isTwitchShown && isTwitchToggled && (
          <iframe
            className="left-0 h-full w-full"
            src={"https://player.twitch.tv/?channel=" + twitchStreamer + "&parent=" + parentHostName}
            allowFullScreen
          ></iframe>
        )}
      </div>
      <div className="cancelDrag flex items-center space-x-1 p-1">
        <input
          className="w-full border border-gray-300 p-1 dark:border-gray-500 dark:bg-gray-700/[.96]"
          type="text"
          value={inputText}
          placeholder="Search stream..."
          onChange={e => {
            setInputText(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
        <AiOutlineReload
          className="w-5 cursor-pointer hover:text-slate-500"
          onClick={() => {
            handleStreamerChange(inputText);
          }}
        />
      </div>
    </div>
  );
};
