import "../Backgrounds.scss";
import lofiGirlVideo from "/assets/videos/lofi_girl.mp4";

export const LofiGirl = () => {
  return (
    <div className="background-container">
      <video autoPlay muted loop id="lofiGirlVideo">
        <source src={lofiGirlVideo} type="video/mp4" />
      </video>
    </div>
  );
};
