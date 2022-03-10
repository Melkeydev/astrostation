export const NavItem = ({ children, onClick }: { children: any, onClick?: () => void }) => {
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
