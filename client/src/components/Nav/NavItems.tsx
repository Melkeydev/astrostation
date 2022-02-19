export const NavItem = ({ children }: { children: any }) => {
  return (
    <li className="hover:bg-gray-100">
      <div className="hover:bg-gray-100 h-16 px-6 flex justify-center items-center w-full focus:text-orange-500">
        {children}
      </div>
    </li>
  );
};
