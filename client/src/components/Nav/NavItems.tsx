import { FC } from "react";

export const NavItem: FC<{ onClick?: () => void; toggled?: boolean }> = ({
  children,
  onClick,
  toggled,
}) => {
  return (
    <li>
      <button
        className={`${
          toggled &&
          "bg-gray-200 text-gray-800 dark:text-black border-black border-b-2 dark:bg-violet-500"
        } sm:h-16 sm:px-6  flex justify-center items-center w-full text-gray-300 hover:bg-gray-200 hover:text-gray-800 h-14 px-4 dark:hover:bg-violet-500`}
        onClick={onClick}
      >
        {children}
      </button>
    </li>
  );
};
