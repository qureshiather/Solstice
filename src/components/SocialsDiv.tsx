import React from "react"; // we need this to make JSX compile

export const SocialsDiv = () => {
  return (
    <div id="topButtonsHolder">
      <a
        href="."
        rel="noreferrer"
        className="topButtons glitch isInteractive"
        style={{ zIndex: 1 }}
      >
        <p>HOME</p>
      </a>
      <a
        href="https://discord.gg/N9JY6sjGdt"
        target="_blank"
        rel="noreferrer"
        className="topButtons glitch isInteractive"
        style={{ zIndex: 1 }}
      >
        <p>DISCORD</p>
      </a>
      <a
        href="https://twitter.com/SolanaLambos"
        target="_blank"
        rel="noreferrer"
        className="topButtons glitch isInteractive"
        style={{ zIndex: 1 }}
      >
        <p>TWITTER</p>
      </a>
    </div>
  );
};
