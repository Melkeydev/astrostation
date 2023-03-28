import { Button } from "@Components/Common/Button";

export const Header = ({ title, onAdd, showAdd }) => {
  return (
    //TODO: Add css to header and to button
    <header className="mb-5 mt-2 flex items-center justify-between">
      <h1 className="font-bold text-gray-800 dark:text-white">{title}</h1>
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
