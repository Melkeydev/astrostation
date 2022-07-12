import "../Backgrounds.scss";
import spaceBlackSmith from "/assets/videos/space_blacksmith.mp4";

export const SpaceBlacksmith = () => {
  return (
    <div className="background-container">
      <video autoPlay muted loop id="spaceBlacksmithVideo">
        <source src={spaceBlackSmith} type="video/mp4" />
      </video>
    </div>
  );
};
