import { useEffect, useState } from "react";

import styled from "styled-components";
// eslint-disable-next-line
import Countdown from "react-countdown";
// eslint-disable-next-line
import { Button, CircularProgress, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import * as anchor from "@project-serum/anchor";

import { LAMPORTS_PER_SOL } from "@solana/web3.js";

import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { WalletDialogButton } from "@solana/wallet-adapter-material-ui";

import {
  CandyMachine,
  awaitTransactionSignatureConfirmation,
  getCandyMachineState,
  mintOneToken,
  shortenAddress,
} from "./candy-machine";

import { SocialsDiv } from "./components/SocialsDiv";

import { PhishingBanner } from "./components/PhishingBanner";

import { AudioButton } from "./components/AudioButton";

import NFTCarousel from "./components/NFTCarousel";
import { InformationBox } from "./components/InformationBox";
import { FAQModalButton } from "./components/FAQModalButton";
import { AboutModalButton } from "./components/AboutModalButton";
import { ParticleContainer3D } from "./components/3DParticles";

// eslint-disable-next-line
const ConnectButton = styled(WalletDialogButton)`
  font-family: "Orbitron";
`;

const CounterText = styled.span``; // add your styles here

// eslint-disable-next-line
const MintContainer = styled.div`
  text-align: center;
`; // add your styles here

// eslint-disable-next-line
const MintButton = styled(Button)`
  position: absolute;
  top: 50%;
`; // add your styles here

export interface HomeProps {
  candyMachineId: anchor.web3.PublicKey;
  config: anchor.web3.PublicKey;
  connection: anchor.web3.Connection;
  startDate: number;
  treasury: anchor.web3.PublicKey;
  txTimeout: number;
}

const Home = (props: HomeProps) => {
  const [balance, setBalance] = useState<number>();
  // eslint-disable-next-line
  const [isActive, setIsActive] = useState(false); // true when countdown completes
  // eslint-disable-next-line
  const [isSoldOut, setIsSoldOut] = useState(false); // true when items remaining is zero
  // eslint-disable-next-line
  const [isMinting, setIsMinting] = useState(false); // true when user got to press MINT

  const [itemsAvailable, setItemsAvailable] = useState(0);
  const [itemsRedeemed, setItemsRedeemed] = useState(0);
  const [itemsRemaining, setItemsRemaining] = useState(0);

  const [alertState, setAlertState] = useState<AlertState>({
    open: false,
    message: "",
    severity: undefined,
  });

  // eslint-disable-next-line
  const [startDate, setStartDate] = useState(new Date(props.startDate * 1000));

  const wallet = useAnchorWallet();
  const [candyMachine, setCandyMachine] = useState<CandyMachine>();

  const refreshCandyMachineState = () => {
    (async () => {
      if (!wallet) return;

      const {
        candyMachine,
        goLiveDate,
        itemsAvailable,
        itemsRemaining,
        itemsRedeemed,
      } = await getCandyMachineState(
        wallet as anchor.Wallet,
        props.candyMachineId,
        props.connection
      );

      setItemsAvailable(itemsAvailable);
      setItemsRemaining(itemsRemaining);
      setItemsRedeemed(itemsRedeemed);

      setIsSoldOut(itemsRemaining === 0);
      setStartDate(goLiveDate);
      setCandyMachine(candyMachine);
    })();
  };

  // eslint-disable-next-line
  const onMint = async () => {
    try {
      setIsMinting(true);
      if (wallet && candyMachine?.program) {
        const mintTxId = await mintOneToken(
          candyMachine,
          props.config,
          wallet.publicKey,
          props.treasury
        );

        const status = await awaitTransactionSignatureConfirmation(
          mintTxId,
          props.txTimeout,
          props.connection,
          "singleGossip",
          false
        );

        if (!status?.err) {
          setAlertState({
            open: true,
            message: "Congratulations! Mint succeeded!",
            severity: "success",
          });
        } else {
          setAlertState({
            open: true,
            message: "Mint failed! Please try again!",
            severity: "error",
          });
        }
      }
    } catch (error: any) {
      // TODO: blech:
      let message = error.msg || "Minting failed! Please try again!";
      if (!error.msg) {
        if (error.message.indexOf("0x138")) {
        } else if (error.message.indexOf("0x137")) {
          message = `SOLD OUT!`;
        } else if (error.message.indexOf("0x135")) {
          message = `Insufficient funds to mint. Please fund your wallet.`;
        }
      } else {
        if (error.code === 311) {
          message = `SOLD OUT!`;
          setIsSoldOut(true);
        } else if (error.code === 312) {
          message = `Minting period hasn't started yet.`;
        }
      }

      setAlertState({
        open: true,
        message,
        severity: "error",
      });
    } finally {
      if (wallet) {
        const balance = await props.connection.getBalance(wallet.publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      }
      setIsMinting(false);
      refreshCandyMachineState();
    }
  };

  useEffect(() => {
    (async () => {
      if (wallet) {
        const balance = await props.connection.getBalance(wallet.publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      }
    })();
  }, [wallet, props.connection]);

  useEffect(refreshCandyMachineState, [
    wallet,
    props.candyMachineId,
    props.connection,
  ]);

  return (
    <main>
      <ParticleContainer3D />
      <PhishingBanner />

      <AudioButton />

      <SocialsDiv />

      <h1 className="centerTitle glitch"> SOLSTICE </h1>

      <NFTCarousel />

      {/* <br /> */}

      {wallet && (
        <div id="walletbox">
          {
            <h3 className="centerTitle">
              {shortenAddress(wallet.publicKey.toBase58() || "")}
            </h3>
          }

          {
            <h3 className="centerTitle">
              Balance: {(balance || 0).toLocaleString()} SOL
            </h3>
          }

          {<h3 className="centerTitle"> 1 SOL </h3>}

          {<h5>Total Available: {itemsAvailable}</h5>}

          {<h5>Redeemed: {itemsRedeemed}</h5>}

          {<h5>Remaining: {itemsRemaining}</h5>}
        </div>
      )}
{/* 
      <br /> */}

      {/* <div style={{ margin: "auto", textAlign: "center" }}>
        <Countdown
          date={startDate}
          onMount={({ completed }) => completed && setIsActive(true)}
          onComplete={() => setIsActive(true)}
          renderer={renderCounter}
        />
      </div> */}

      {/* <br /> */}

      {/* <MintContainer>
        {!wallet ? (
          <ConnectButton>Select Wallet</ConnectButton>
        ) : (
          <MintButton
            disabled={isSoldOut || isMinting || !isActive}
            onClick={onMint}
            variant="contained"
          >
            {isSoldOut ? (
              "SOLD OUT"
            ) : isActive ? (
              isMinting ? (
                <CircularProgress />
              ) : (
                "MINT"
              )
            ) : (
              <Countdown
                date={startDate}
                onMount={({ completed }) => completed && setIsActive(true)}
                onComplete={() => setIsActive(true)}
                renderer={renderCounter}
              />
            )}
          </MintButton>
        )}
      </MintContainer> */}

      <h5 className="centerParagraph">
        Each SolsticeNFT will be uniquely generated and signed with the mint number 
      </h5>

      <InformationBox />

      <FAQModalButton/>

      <AboutModalButton/>

      <Snackbar
        open={alertState.open}
        autoHideDuration={6000}
        onClose={() => setAlertState({ ...alertState, open: false })}
      >
        <Alert
          onClose={() => setAlertState({ ...alertState, open: false })}
          severity={alertState.severity}
        >
          {alertState.message}
        </Alert>
      </Snackbar>
    </main>
  );
};

interface AlertState {
  open: boolean;
  message: string;
  severity: "success" | "info" | "warning" | "error" | undefined;
}

// eslint-disable-next-line
const renderCounter = ({ days, hours, minutes, seconds }: any) => {
  return (
    <CounterText>
      {hours + (days || 0) * 24} hours, {minutes} minutes, {seconds} seconds
    </CounterText>
  );
};

export default Home;
