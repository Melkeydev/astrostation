import { IoCloseSharp, IoEllipsisHorizontalSharp } from "react-icons/io5";
import { useState } from "react";
import { useStickyNote } from "@Store";
import TextareaAutosize from "react-textarea-autosize";

export const Sticky = ({ id, text }) => {
  const { removeNote, editNote } = useStickyNote();
  const [showColorSelector, setShowColorSelector] = useState(false);
  const [color, setColor] = useState("#feff9c");

  // Toggles the state of the color selector open/closed
  const toggleColorSelector = () => {
    setShowColorSelector((prevState) => !prevState);
  };

  // Sets the selected color and closes the color selector
  const selectColor = (selectedColor) => {
    setColor(selectedColor);
    toggleColorSelector();
  };

  // Renders a row of color elements
  const displayColors = () => {
    const colors = ["#feff9c", "#d1fae5", "#f6ccd7", "#e0bbff", "#a7cdfa"];
    return (
      <div className="mb-1 flex">
        {colors.map((c) => (
          <div
            key={c}
            className="h-10 w-10 cursor-pointer"
            style={{ backgroundColor: c }}
            onClick={() => selectColor(c)}
          />
        ))}
      </div>
    );
  };

  return (
    <div
      className="cursor-move bg-[#feff9c]"
      style={{ backgroundColor: color }}
    >
      {showColorSelector && displayColors()}
      <div className="flex w-full justify-end p-2">
        <IoEllipsisHorizontalSharp
          className="mr-2 cursor-pointer"
          onClick={toggleColorSelector}
        />
        <IoCloseSharp
          className="cursor-pointer text-red-500 hover:bg-red-200"
          onClick={() => removeNote(id)}
        />
      </div>
      <div className="cancelDrag m-auto min-h-[150px] min-w-[150px] max-w-[215px] break-words rounded pl-4 pb-4 pr-4">
        <TextareaAutosize
          rows={4}
          cols={18}
          placeholder="Add a note"
          value={text}
          onChange={(e) => {
            editNote(id, e.target.value);
          }}
          style={{
            border: "none",
            backgroundColor: "transparent",
            outline: "none",
            resize: "none",
          }}
        />
      </div>
    </div>
  );
};
