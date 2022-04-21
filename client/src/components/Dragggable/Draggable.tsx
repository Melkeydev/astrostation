import "./Draggable.scss";
import { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import { FC } from "react";
let int = 0;

export const DWrapper = ({
  children,
  toggleHook,
  defaultX,
  defaultY,
  setPosition,
}) => {
  const [z, setZ] = useState(0);
  const ref = useRef();

  const handleDrag = (e, ui) => {
    let deltaX = defaultX + ui.deltaX;
    let deltaY = defaultY + ui.deltaY;
  };

  function trackPosition(data) {
    setZ(++int);
  }

  function changePosition(data) {
    setPosition(data.x, data.y);
  }

  const triggerMouseEvent = (element, eventType) => {
    const mouseEvent = document.createEvent("MouseEvents");

    mouseEvent.initEvent(eventType, true, true);
    element.dispatchEvent(mouseEvent);
  };

  useEffect(() => {
    const listener = () => {
      triggerMouseEvent(ref.current, "mouseover");
      triggerMouseEvent(ref.current, "mousedown");
      triggerMouseEvent(document, "mousemove");
      triggerMouseEvent(ref.current, "mouseup");
      triggerMouseEvent(ref.current, "click");
    };

    addEventListener("resize", listener);
    return () => removeEventListener("resize", listener);
  }, []);

  return (
    <Draggable
      bounds="parent"
      defaultPosition={{ x: defaultX, y: defaultY }}
      onDrag={(e, data) => trackPosition(data)}
      onStop={(e, data) => changePosition(data)}
    >
      <div
        style={{ zIndex: z, position: "absolute" }}
        className="dcard box dwidth"
        onClick={() => setZ(++int)}
      >
        <div
          ref={ref}
          className={`inline-block ${
            toggleHook ? "visible" : "hidden pointer-events-none"
          }`}
        >
          {children}
        </div>
      </div>
    </Draggable>
  );
};
