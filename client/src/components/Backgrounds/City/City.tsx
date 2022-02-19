import "./City.scss";
import { Circle } from "./Circle";
import { CircleContainer } from "./CircleContainer";

export const City = () => {
  return (
    <div className="cityContainer">
      <img
        className="cityBackground"
        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/221808/sky.jpg"
      />

      {Array(99).fill(<CircleContainer />)}
    </div>
  );
};
