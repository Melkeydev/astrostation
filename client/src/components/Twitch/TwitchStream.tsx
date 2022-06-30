import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { AiOutlineReload } from "react-icons/ai";
import { useToggleTwitch } from "@Store";

export const TwitchStream = () => {
  const { isTwitchToggled, isTwitchShown, setIsTwitchToggled } =
    useToggleTwitch();
  const [inputText, setInputText] = useState("");
  const [twitchStreamer, setTwitchStreamer] = useState("melkeydev");
  const [parentHostName, setParentHostName] = useState("astrostation.me");

  // doing this for convenience (we don't have a real staging env)
  // don't ever mix prod and dev code, can cause major security flaws (not here, but you know)
  useEffect(() => {
    if (window.location.hostname === "localhost") {
      setParentHostName("localhost");
    }
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleStreamerChange(e.target.value);
    }
  };

  const handleStreamerChange = (streamName) => {
    if (streamName.length > 0) {
      setTwitchStreamer(streamName);
    }
  };

  // The following resize fix is a thanks to adamdotjs.
  // https://play.tailwindcss.com/jp2JnWgRoW -> his solution
  return (
    <div className="resize-x overflow-auto py-2 sm:w-96 w-full text-gray-800 shadow-md rounded-lg dark:text-gray-300 bg-white/[.96] dark:bg-gray-800/[.96] dark:border-gray-700 justify-between">
      <div className="flex justify-between handle items-center p-1">
        <p>Twitch</p>
        <IoCloseSharp
          className="text-red-500 cursor-pointer hover:bg-red-200"
          onClick={() => setIsTwitchToggled(false)}
        />
      </div>
      <div className="cancelDrag justify-center aspect-video relative">
        {isTwitchShown && isTwitchToggled && (
          <iframe
            className="left-0 h-full w-full"
            src={
              "https://player.twitch.tv/?channel=" +
              twitchStreamer +
              "&parent=" +
              parentHostName
            }
            allowFullScreen
            //width="100%"
            //height="250px"
          ></iframe>
        )}
      </div>
      <div className="flex items-center space-x-1 p-1">
        <input
          className="cancelDrag w-full p-1 border border-gray-300 dark:bg-gray-700/[.96] dark:border-gray-500"
          type="text"
          value={inputText}
          placeholder="Search stream..."
          onChange={(e) => {
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
