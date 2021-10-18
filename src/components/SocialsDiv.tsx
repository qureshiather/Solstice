import React from "react"; // we need this to make JSX compile

export const SocialsDiv = () => {
  return (
    <div id="topButtonsHolder">
      <a href="." rel="noreferrer" className="topButtons glitch isInteractive">
        <p>HOME</p>
      </a>
      <a
        href="https://google.com"
        target="_blank"
        rel="noreferrer"
        className="topButtons glitch isInteractive"
      >
        <p>DISCORD</p>
      </a>
      <a
        href="https://twitter.com/MSolambo"
        target="_blank"
        rel="noreferrer"
        className="topButtons glitch isInteractive"
      >
        <p>TWITTER</p>
      </a>
    </div>
  );
};
