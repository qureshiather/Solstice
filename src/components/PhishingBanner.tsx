import React from "react"; // we need this to make JSX compile;

export const PhishingBanner = () => {
  return (
    <div className={`rotatingBanner`}>
      <h5 className="blackText"> Please Double check url is: Https://projectsolstice.exchange</h5>
    </div>
  );
};
