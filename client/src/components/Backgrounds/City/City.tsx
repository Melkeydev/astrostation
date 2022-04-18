import "./City.scss";


export const City = () => {
  return (
    <div className="cityContainer">
      {Array(150).fill(<div className="falling"></div>)}
    </div>
  );
};
