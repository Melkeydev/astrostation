import { IoCloseSharp } from "react-icons/io5";
import { useStickyNote } from "@Store";
import TextareaAutosize from "react-textarea-autosize";

export const Sticky = ({ id, text }) => {
  const { removeNote, editNote } = useStickyNote();
  //<div className="handle w-full">Test</div>

  return (
    <div className="bg-[#feff9c] cursor-move">
      <div className="flex justify-end w-full p-2">
        <IoCloseSharp
          className="text-red-500 cursor-pointer hover:bg-red-200"
          onClick={() => removeNote(id)}
        />
      </div>
      <div className="cancelDrag min-w-[150px] min-h-[150px] max-w-[215px] break-words rounded pl-4 pb-4 pr-4 m-auto">
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
