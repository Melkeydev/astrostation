export const ToggleOption = ({
  title,
  decrement,
  increment,
  onClick,
  onChange,
  propertyLength,
  hasStarted,
}: {
  title: string;
  decrement: string;
  increment: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onChange: any;
  propertyLength: number;
  hasStarted: boolean;
}) => {
  return (
    <div>
      {title}
      <div className="items-center bg-gray-200 text-center dark:bg-gray-700 dark:text-gray-200">
        <div className="flex justify-between p-2">
          <button id={decrement} onClick={onClick}>
            &lt;
          </button>
          <input
            className="w-9/12 text-center dark:bg-gray-700"
            defaultValue={propertyLength}
            onChange={onChange}
            readOnly={hasStarted}
          />
          <button id={increment} onClick={onClick}>
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};
