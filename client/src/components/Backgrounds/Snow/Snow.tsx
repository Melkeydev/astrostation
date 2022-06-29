import "./Snow.scss";

export const Snow = () => {
  return (
    <div className="snowContainer">
      {[...Array(150).keys()].map(i => <div key={i} className="snow"></div>)}
    </div>
  );
};
