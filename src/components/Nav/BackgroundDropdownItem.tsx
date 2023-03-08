import clsx from "clsx";

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
      className={clsx(
        "cursor-pointer py-1 hover:rounded-md hover:bg-gray-100 dark:hover:bg-gray-900",
        isPicked && " rounded-md bg-gray-100 dark:bg-gray-900"
      )}
      onClick={() => setIsBackground(background)}
    >
      <div className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200">
        {title}
      </div>
    </div>
  );
};
