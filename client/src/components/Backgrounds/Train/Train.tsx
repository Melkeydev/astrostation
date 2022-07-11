import "../Backgrounds.scss"

export const Train = () => {
  return (
    <div className="background-container">
      <video autoPlay muted loop id="train-video">
        <source src="/assets/videos/train.mp4" type="video/mp4" />
      </video>
    </div>
  );
};
