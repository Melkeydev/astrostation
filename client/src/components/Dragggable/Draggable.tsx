import Draggable from "react-draggable";
import "./Draggable.scss";
export const DWrapper = ({ children, toggleHook }) => {
  return (
    <Draggable bounds="parent">
      <div className="box dwidth">
        <div
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
