import { useState } from "react";
import Draggable from "react-draggable";
import "./Draggable.scss";
let int = 0;
export const DWrapper = ({
  children,
  toggleHook,
  defaultX,
  defaultY,
  dragRef,
}) => {
  const [z, setZ] = useState(0);

  function trackPosition(data) {
    setZ(++int);
  }

  return (
    <Draggable
      bounds="parent"
      defaultPosition={{ x: defaultX, y: defaultY }}
      onDrag={(e, data) => trackPosition(data)}
    >
      <div
        style={{ zIndex: z, position: "relative" }}
        className="dcard box dwidth"
        onClick={() => setZ(++int)}
      >
        <div
          ref={dragRef}
          className={`${
            toggleHook ? "visible" : "invisible pointer-events-none"
          }`}
        >
          {children}
        </div>
      </div>
    </Draggable>
  );
};
