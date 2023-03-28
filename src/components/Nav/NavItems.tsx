import { FC } from "react";
import clsx from "clsx";

export const NavItem: FC<{
  onClick?: () => void;
  toggled?: boolean;
  shown?: boolean;
}> = ({ children, onClick, toggled, shown }) => {
  if (shown) {
    return (
      <li>
        <button
          className={clsx(
            "relative flex h-14 items-center bg-white px-4 dark:bg-gray-800 dark:text-white sm:h-16 sm:px-6 md:hover:bg-gray-200 md:hover:dark:bg-gray-700",
            toggled &&
              "border-b-2 border-black bg-violet-500 text-white dark:bg-violet-500 md:hover:bg-violet-400 md:hover:dark:bg-violet-400"
          )}
          onClick={onClick}
        >
          {children}
        </button>
      </li>
    );
  } else {
    return <></>;
  }
};
