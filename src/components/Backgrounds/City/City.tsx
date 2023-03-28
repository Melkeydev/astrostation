import "./City.scss";

export const City = () => {
  return (
    <div className="cityContainer">
      {[...Array(150).keys()].map(i => (
        <div key={i} className="falling"></div>
      ))}
    </div>
  );
};
