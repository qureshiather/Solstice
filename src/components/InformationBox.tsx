import React from "react"; // we need this to make JSX compile

export const InformationBox = () => {
  return (
    <div id="dataHolder">
      <div className="gradient-border" id="box">
          <div className="subHolder">
            <p className="dataName">MINT PRICE</p>
            <p className="data glitch">1 SOL</p>
          </div>
          <div className="subHolder">
            <p className="dataName">SUPPLY</p>
            <p className="data glitch">8888</p>
          </div>
          <div className="subHolder">
            <p className="dataName">LAUNCH</p>
            <p className="data glitch">11/01 7PM EST</p>
          </div>
      </div>
    </div>
  );
};

export default InformationBox;
