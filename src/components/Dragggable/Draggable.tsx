import "./Draggable.scss";
import { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import { useStickyNote, useLockWidgetsStore } from "@Store";
import clsx from 'clsx'

let int = 0;

export const DWrapper = ({
  children,
  toggleHook,
  defaultX,
  defaultY,
  setPosition,
  isSticky,
  stickyID,
  gridValues,
  handle,
}: {
  children: any;
  toggleHook: boolean;
  defaultX: number;
  defaultY: number;
  setPosition: any;
  isSticky: boolean;
  stickyID?: number;
  gridValues?: number[];
  handle?: string;
}) => {
  const { setStickyNotesPos } = useStickyNote();
  const { areWidgetsLocked } = useLockWidgetsStore();
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
    <>
      {/*@ts-ignore*/}
      <Draggable
        bounds="parent"
        cancel=".cancelDrag"
        position={{ x: defaultX, y: defaultY }}
        onDrag={() => trackPosition()}
        onStop={(_, data) => changePosition(data)}
        //@ts-ignore
        grid={gridValues}
        disabled={areWidgetsLocked}
        handle={handle}
      >
        {isSticky ? (
          <div
            style={{ zIndex: z, position: "absolute" }}
            onClick={() => setZ(++int)}
          >
            <div
              ref={ref}
              className={clsx(
                "inline-block",
                toggleHook ? "visible" : "pointer-events-none hidden"
              )}
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
              className={clsx(
                "inline-block",
                toggleHook ? "visible" : "pointer-events-none hidden"
                )}
            >
              {children}
            </div>
          </div>
        )}
      </Draggable>
    </>
  );
};
