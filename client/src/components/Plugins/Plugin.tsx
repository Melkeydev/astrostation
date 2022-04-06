import React from "react";
import { IoCloseSharp } from "react-icons/io5";

type Props = {
  title: string;
  onClose: () => void;
  titleChildren?: React.ReactNode;
  children: React.ReactNode;
};

function defaultOnClick() {
  console.error("CLOSE HANDLER IS NEEDED");
}

export const Plugin = ({ children, onClose, title, titleChildren }: Props) => (
  <div className="py-4 px-3 bg-white text-gray-800 rounded-lg border border-gray-200 shadow-md dark:text-gray-300 dark:bg-gray-800 dark:border-gray-700">
    <div className="flex justify-between items-center p-1">
      <p>{title ?? "Plugin"}</p>

      <div className="flex space-x-2">
        {titleChildren ?? null}

        <IoCloseSharp
          className="text-red-500 cursor-pointer hover:bg-red-200"
          onClick={onClose ?? defaultOnClick}
        />
      </div>
    </div>

    {children}
  </div>
);
