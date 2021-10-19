import React from "react";
import { useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import styled from "styled-components";
import { Button } from "@material-ui/core";
// @ts-ignore
import mp3_file from '../sounds/loop.mp3';

const MuteButton = styled(Button)`
  position: absolute;
  top: 0;
  left: 0;
`; // add your styles here

export const AudioButton = () => {
  const [soundMuted, setSoundMuted] = useState<boolean>(false);

  return (
    <>
      <ReactAudioPlayer src={mp3_file} autoPlay muted={soundMuted} loop />

      <MuteButton
        onClick={() => {
          setSoundMuted(!soundMuted);
        }}
      >
        {soundMuted ? "Unmute" : "Mute"}
      </MuteButton>
    </>
  );
};
