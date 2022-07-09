import "./Cottage.scss";

export const Cottage = () => {
  return (
    <div className="backgroundContainer">
      <video autoPlay muted loop id="myVideo">
        <source src="/assets/videos/cottage.mp4" type="video/mp4" />
      </video>
    </div>
  );
};
