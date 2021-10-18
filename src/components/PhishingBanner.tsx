import React from "react"; // we need this to make JSX compile;

export const PhishingBanner = () => {
  return (
    <div className={`rotatingBanner teal`}>
      <h5 className="blackText"> Please Double check url is: Https://solambo.exchange</h5>
    </div>
  );
};
