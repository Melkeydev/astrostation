export const ToggleOption = ({
  title,
  decrement,
  increment,
  onClick,
  propertyLength,
}: {
  title: string;
  decrement: string;
  increment: string;
  onClick: any;
  propertyLength: number;
}) => {
  return (
    <div>
      {title}
      <div className="bg-gray-200 text-center items-center">
        <div className="flex justify-between p-2">
          <button id={decrement} onClick={onClick}>
            &lt;
          </button>
          {propertyLength}
          <button id={increment} onClick={onClick}>
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};
