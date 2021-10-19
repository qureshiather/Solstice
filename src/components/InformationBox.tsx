import React from "react"; // we need this to make JSX compile

export const InformationBox = () => {
  return (
    <div id="dataHolder">
      <div className="gradient-border" id="box">
        <div id="content">
          <div className="subHolder">
            <p className="dataName">SOLANA</p>
            <p className="data glitch">1</p>
          </div>
          <div className="subHolder">
            <p className="dataName">SUPPLY</p>
            <p className="data glitch">777</p>
          </div>
          <div className="subHolder">
            <p className="dataName">LAUNCH</p>
            <p className="data glitch">11/01</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationBox;
