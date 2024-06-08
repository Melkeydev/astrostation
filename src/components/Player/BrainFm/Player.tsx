import { useDarkToggleStore, useBrainfmMusic } from "@Store";
import { useState } from "react";
import { AiOutlineReload } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { WithTooltip } from "../../Tooltip";
import { failureToast } from "@Root/src/utils/toast";

export const BrainFm = () => {
  const { setIsBrainfmToggled } = useBrainfmMusic();

  return (
    <div className="mb-2 w-72 max-w-sm justify-between rounded-lg bg-white/[.96] py-4 px-4 text-gray-800 shadow-md dark:border-gray-700 dark:bg-gray-800/[.96] dark:text-gray-300 sm:w-96">
      <div className="handle flex cursor-move items-center justify-between p-1">
        <p className="py-2 font-bold">Brain.fm</p>
        <IoCloseSharp
          className="cursor-pointer rounded bg-gray-800 text-gray-100 hover:bg-gray-900 dark:bg-gray-300 dark:text-gray-800"
          onClick={() => setIsBrainfmToggled(false)}
        />
      </div>

      <div className="cancelDrag justify-center">
        <iframe
          src={`https://my.brain.fm/`}
          height="700"
          width="100%"
          frameBorder="0"
          style={{ borderRadius: "10px" }}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        ></iframe>
      </div>
    </div>
  );
};
