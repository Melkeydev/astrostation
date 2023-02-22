import { IoCloseSharp } from "react-icons/io5";
import { useStickyNote } from "@Store";
import TextareaAutosize from "react-textarea-autosize";

export const Sticky = ({ id, text }) => {
  const { removeNote, editNote } = useStickyNote();

  return (
    <div className="cursor-move bg-[#feff9c]">
      <div className="flex w-full justify-end p-2">
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
