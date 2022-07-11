import "../Backgrounds.scss";

export const LofiGirl = () => {
  return (
    <div className="background-container">
      <video autoPlay muted loop id="lofiGirlVideo">
        <source src="/assets/videos/lofi_girl.mp4" type="video/mp4" />
      </video>
    </div>
  );
};
