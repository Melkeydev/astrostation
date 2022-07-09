import "./LofiGirl.scss";

export const LofiGirl = () => {
  return (
    <div className="backgroundContainer">
      <video autoPlay muted loop id="myVideo">
        <source src="/assets/videos/lofi_girl.mp4" type="video/mp4" />
      </video>
    </div>
  );
};
