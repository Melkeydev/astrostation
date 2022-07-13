export const BackgroundDropdownItem = ({
  isPicked,
  setIsBackground,
  background,
  title,
}: {
  isPicked: boolean;
  setIsBackground: any;
  background: any;
  title: string;
}) => {
  return (
    <div
      className={
        "py-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 hover:rounded-md " +
        (isPicked && " bg-gray-100 dark:bg-gray-900 rounded-md")
      }
      onClick={() => setIsBackground(background)}
    >
      <div className="text-gray-700 dark:text-gray-200 block px-4 py-2 text-sm">
        {title}
      </div>
    </div>
  );
};
