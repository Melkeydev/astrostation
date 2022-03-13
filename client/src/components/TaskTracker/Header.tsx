import { Button } from "../Common/Button";

export const Header = ({ title, onAdd, showAdd }) => {
  return (
    //TODO: Add css to header and to button
    <header className="flex justify-between items-center mb-5">
      <h1 className="text-gray-800 dark:text-white font-bold">{title}</h1>
      {showAdd ? (
        <Button onClick={onAdd} variant="danger">
          Close
        </Button>
      ) : (
        <Button onClick={onAdd}>Add</Button>
      )}
    </header>
  );
};
