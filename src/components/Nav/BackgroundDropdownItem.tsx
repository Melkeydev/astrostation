import clsx from "clsx";

export const BackgroundDropdownItem = ({
  isPicked,
  setIsBackground,
  background,
  title,
  className,
}: {
  isPicked: boolean;
  setIsBackground: any;
  background: any;
  title: string;
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        "cursor-pointer bg-gray-300 py-1 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900",
        isPicked && "bg-gray-100 dark:bg-gray-900"
      )}
      onClick={() => setIsBackground(background)}
    >
      <div className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200">{title}</div>
    </div>
  );
};
