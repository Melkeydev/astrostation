import "./Draggable.scss";
import { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import { useStickyNote } from "@Store";
let int = 0;

export const DWrapper = ({
  children,
  toggleHook,
  defaultX,
  defaultY,
  setPosition,
  isSticky,
  stickyID,
}: {
  children: any;
  toggleHook: boolean;
  defaultX: number;
  defaultY: number;
  setPosition: any;
  isSticky: boolean;
  stickyID?: number;
}) => {
  const { setStickyNotesPos } = useStickyNote();
  const [z, setZ] = useState(0);
  const ref = useRef();

  function trackPosition() {
    setZ(++int);
  }

  function changePosition(data: any) {
    if (isSticky) {
      setStickyNotesPos(stickyID, data.x, data.y);
    } else {
      setPosition(data.x, data.y);
    }
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

  useEffect(() => {
    if (toggleHook) {
      setZ(++int);
    }
  }, [toggleHook]);

  return (
    <Draggable
      bounds="parent"
      defaultPosition={{ x: defaultX, y: defaultY }}
      onDrag={() => trackPosition()}
      onStop={(_, data) => changePosition(data)}
    >
      {isSticky ? (
        <div
          style={{ zIndex: z, position: "absolute" }}
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
      ) : (
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
      )}
    </Draggable>
  );
};
