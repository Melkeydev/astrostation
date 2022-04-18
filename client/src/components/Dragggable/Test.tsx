import Draggable from "react-draggable";
import { usePosTask } from "@Store";
import { useState } from "react";
import "./Draggable.scss";
export const Test = () => {
  const { taskPosX, taskPosY, setTaskPos } = usePosTask();
  const [deltaPosition, setDeltaPosition] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  function changePosition(data) {
    const { x, y } = data;
    setTaskPos(x, y);
  }

  const handleDrag = (e, ui) => {
    setDeltaPosition((prevState) => ({
      ...prevState,
      x: prevState.x + ui.deltaX,
      y: prevState.y + ui.deltaY,
    }));

    setPosition((prevState) => ({
      ...prevState,
      x: ui.x,
      y: ui.y,
    }));
  };

  return (
    <Draggable
      onDrag={handleDrag}
      bounds="parent"
      defaultPosition={{ x: taskPosX, y: taskPosY }}
      onStop={(e, data) => changePosition(data)}
    >
      <div
        style={{ position: "relative", background: "green" }}
        className="dcard box dwidth"
      >
        <div className="inline-block">
          x: {deltaPosition.x.toFixed(0)}, y: {deltaPosition.y.toFixed(0)}
          new:x {position.x.toFixed(0)}, newy: {position.y.toFixed(0)}
        </div>
      </div>
    </Draggable>
  );
};
