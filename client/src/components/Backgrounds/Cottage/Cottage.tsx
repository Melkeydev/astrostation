import "../Backgrounds.scss";

export const Cottage = () => {
  return (
    <div className="background-container">
      <video autoPlay muted loop id="cottageVideo">
        <source src="/assets/videos/cottage.mp4" type="video/mp4" />
      </video>
    </div>
  );
};
