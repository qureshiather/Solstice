import React from 'react'; // we need this to make JSX compile;
import { useState } from "react";
import ReactAudioPlayer from 'react-audio-player';
import styled from "styled-components";
import { Button } from "@material-ui/core";

const MuteButton = styled(Button)`
position: absolute;
top: 0;
left: 0;
`; // add your styles here

export const AudioButton = () => {

    const [soundMuted, setSoundMuted] = useState<boolean>(false);

    return (
        <>
        <ReactAudioPlayer
        src="Loop.mp3"
        autoPlay
        muted={soundMuted}
        />

        <MuteButton onClick={() => {setSoundMuted(!soundMuted);}}>
            {soundMuted ? "Unmute" : "Mute"}
        </MuteButton>
    
    </>
    )
}