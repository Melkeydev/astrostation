import { FC } from "react";

export const NavItem: FC<{ onClick?: () => void }> = ({
  children,
  onClick,
}) => {
  return (
    <li>
      <button
        className="h-16 px-6 flex justify-center items-center w-full text-gray-300 hover:bg-gray-200 hover:text-gray-800"
        onClick={onClick}
      >
        {children}
      </button>
    </li>
  );
};
