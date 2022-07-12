import { FC } from "react";

export const NavItem: FC<{ onClick?: () => void; toggled?: boolean; shown? : boolean }> = ({
  children,
  onClick,
  toggled,
  shown
}) => {
  if(shown) {
    return (
      <li>
        <button
          className={`${
            toggled &&
            "relative bg-gray-200 text-black dark:text-black border-black border-b-2 dark:bg-violet-500"
          } sm:h-16 sm:px-6  flex justify-center items-center w-full text-gray-300 md:hover:bg-gray-200 md:hover:text-gray-800 h-14 px-4 md:dark:hover:bg-violet-500`}
          onClick={onClick}
        >
          {children}
        </button>
      </li>
    );
  } else {
    return <></>
  }
};
