import { IoCloseSharp } from "react-icons/io5";
import { useStickyNote } from "@Store";
import TextareaAutosize from "react-textarea-autosize";

export const Sticky = ({ id, text }) => {
  const { removeNote, editNote } = useStickyNote();

  return (
    <div className="bg-[#feff9c] cursor-move min-w-[150px] min-h-[150px] max-w-[215px] break-words rounded p-4 m-auto">
      <div className="flex justify-end">
        <IoCloseSharp
          className="text-red-500 cursor-pointer hover:bg-red-200"
          onClick={() => removeNote(id)}
        />
      </div>
      <TextareaAutosize
        rows={4}
        defaultValue="Just a single line..."
        value={text}
        placeholder={id}
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
  );
};
