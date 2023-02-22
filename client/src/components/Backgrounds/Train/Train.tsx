import "../Backgrounds.scss";
import trainVideo from "/assets/videos/train.mp4";

export const Train = () => {
  return (
    <div className="background-container">
      <video autoPlay muted loop id="train-video">
        <source src={trainVideo} type="video/mp4" />
      </video>
    </div>
  );
};
