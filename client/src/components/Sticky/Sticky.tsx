import { IoCloseSharp } from "react-icons/io5";
import { useStickyNote } from "@Store";
export const Sticky = ({ id }) => {
  const colors = ["feff9c", "#7afcff", "#ff7eb9"];
  const randomItem = colors[Math.floor(Math.random() * colors.length)];

  const { removeNote } = useStickyNote();
  return (
    <div className="bg-[#feff9c] cursor-move max-w-[215px] break-words rounded p-4 m-auto">
      <div className="flex justify-end">
        <IoCloseSharp
          className="text-red-500 cursor-pointer hover:bg-red-200"
          onClick={() => removeNote(id)}
        />
      </div>
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </div>
  );
};
