import "./Train.scss";

export const Train = () => {
  return (
    <div className="backgroundContainer">
      <video autoPlay muted loop id="myVideo">
        <source src="/assets/videos/train.mp4" type="video/mp4" />
      </video>
    </div>
  );
};
