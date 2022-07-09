import "./SpaceBlacksmith.scss";

export const SpaceBlacksmith = () => {
  return (
    <div className="backgroundContainer">
      <video autoPlay muted loop id="myVideo">
        <source src="/assets/videos/space_blacksmith.mp4" type="video/mp4" />
      </video>
    </div>
  );
};
