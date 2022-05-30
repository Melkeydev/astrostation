import "./ShootingStars.scss";

const getStars = () => {
  const items = [];
  for(let i=0; i<10; i++) {
    items.push(<div className="star" key={i}></div>);
  }
  return items;
}

export const ShootingStars = () => {
  return (
    <div className="spaceContainer">
      <div className="spaceStars"></div>
      <div className="twinkling"></div>
      <div className="stars">{getStars()}</div>
    </div>
  );
};
