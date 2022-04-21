import { useState, useEffect } from "react";

export const Sticky = () => {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  return (
    <div className="cursor-move max-w-[215px] break-words border rounded p-4 m-auto">
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </div>
  );
};
