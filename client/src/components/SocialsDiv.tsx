import React from "react"; // we need this to make JSX compile
import { Link } from "react-router-dom";

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
        href="https://discord.gg/KUE85VAXBF"
        target="_blank"
        rel="noreferrer"
        className="topButtons glitch isInteractive"
        style={{ zIndex: 1 }}
      >
        <p>DISCORD</p>
      </a>
      <a
        href="https://twitter.com/NftSolstice"
        target="_blank"
        rel="noreferrer"
        className="topButtons glitch isInteractive"
        style={{ zIndex: 1 }}
      >
        <p>TWITTER</p>
      </a>
      <Link
          to={{
            pathname: "/generator",
          }}
          style={{ zIndex: 1 }}
          className="topButtons glitch isInteractive"
      >
        <p>GENERATOR</p>
      </Link>
    </div>
  );
};
