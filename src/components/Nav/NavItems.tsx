import { FC } from "react";

export const NavItem: FC<{
  onClick?: () => void;
  toggled?: boolean;
  shown?: boolean;
}> = ({ children, onClick, toggled, shown }) => {
  if (shown) {
    return (
      <li>
        <button
          className={`${
            toggled &&
            "relative border-b-2 border-black bg-gray-200 text-black dark:bg-violet-500 dark:text-black"
          } flex h-14  w-full items-center justify-center px-4 text-gray-300 bg-gray-600 sm:h-16 sm:px-6 md:hover:bg-gray-200 md:hover:text-gray-800 md:dark:hover:bg-violet-500`}
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
