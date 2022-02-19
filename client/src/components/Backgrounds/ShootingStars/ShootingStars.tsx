import "./ShootingStars.scss";
import "../Space/Space.scss";

export const stars = 10;

export const ShootingStars = () => {
  return (
    <div className="spaceContainer">
      <div className="spaceStars"></div>
      <div className="twinkling"></div>
      <div className="stars">{Array(stars).fill(Star())}</div>
    </div>
  );
};

const Star = () => {
  return <div className="star"></div>;
};
