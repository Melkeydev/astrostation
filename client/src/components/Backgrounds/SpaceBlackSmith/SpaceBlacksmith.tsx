import "../Backgrounds.scss";

export const SpaceBlacksmith = () => {
  return (
    <div className="background-container">
      <video autoPlay muted loop id="spaceBlacksmithVideo">
        <source src="/assets/videos/space_blacksmith.mp4" type="video/mp4" />
      </video>
    </div>
  );
};
