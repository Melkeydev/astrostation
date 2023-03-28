import { IoCloseSharp, IoEllipsisHorizontalSharp } from "react-icons/io5";
import { MouseEventHandler, useState } from "react";
import { useStickyNote } from "@Store";
import { ColorOptions } from "@Root/src/interfaces";
import TextareaAutosize from "react-textarea-autosize";

export const Sticky = ({ id, text, color }) => {
  const { removeNote, editNote } = useStickyNote();
  const [showColorSelector, setShowColorSelector] = useState(false);

  // Toggles the state of the color selector open/closed
  const handleToggleSelector: MouseEventHandler<SVGElement> = event => {
    event.stopPropagation();
    setShowColorSelector(!showColorSelector);
  };

  // Sets the selected color and closes the color selector
  const selectColor = selectedColor => {
    editNote(id, "color", selectedColor);
    setShowColorSelector(!showColorSelector);
  };

  // Renders a row of color elements
  const displayColors = () => {
    return (
      <div className="mb-1 flex">
        {Object.values(ColorOptions).map(c => (
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
    <div className="cursor-move bg-[#feff9c]" style={{ backgroundColor: color }}>
      {showColorSelector && displayColors()}
      <div className="flex w-full justify-end p-2">
        <IoEllipsisHorizontalSharp className="mr-2 cursor-pointer" onClick={handleToggleSelector} />
        <IoCloseSharp className="cursor-pointer text-red-500 hover:bg-red-200" onClick={() => removeNote(id)} />
      </div>
      <div className="cancelDrag m-auto min-h-[150px] min-w-[150px] max-w-[215px] break-words rounded pl-4 pb-4 pr-4">
        <TextareaAutosize
          rows={4}
          cols={18}
          placeholder="Add a note"
          value={text}
          onChange={e => {
            editNote(id, "text", e.target.value);
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
