import "./Snow.scss";

export const Snow = () => {
  return (
    <div className="snowContainer">
      {Array(150).fill(<div className="snow"></div>)}
    </div>
  );
};
