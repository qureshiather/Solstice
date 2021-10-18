import React from "react"; // we need this to make JSX compile

export const InformationBox = () => {
  return (
    <div id="dataHolder">
      <div className="gradient-border" id="box">
        <div id="content">
          <div className="subHolder">
            <p className="data glitch">1</p>
            <p className="dataName">SOL</p>
          </div>
          <div className="subHolder">
            <p className="data glitch">4444</p>
            <p className="dataName">SUPPLY</p>
          </div>
          <div className="subHolder">
            <p className="data glitch">11/01</p>
            <p className="dataName">LAUNCH</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationBox;
