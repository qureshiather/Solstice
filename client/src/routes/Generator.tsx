import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { SocialsDiv } from "../components/SocialsDiv";
import GeneratorDiv from "../components/GeneratorDiv";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

import * as anchor from "@project-serum/anchor";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { WalletDialogButton } from "@solana/wallet-adapter-material-ui";
import { shortenAddress } from "../candy-machine";
import axios from "axios";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

export interface GeneratorProps {
  connection: anchor.web3.Connection;
}

export const Generator = (props: GeneratorProps) => {
  // 0 is black, and 1 is gradient
  const [backgroundType, setBackgroundType] = useState(0);
  // 0 is no shape, 1 is circle, 2 is square
  const [shapeType, setShapeType] = useState(1);
  // 0 is no border, 1 is border
  const [shapeBorder, setShapeBorder] = useState(0);
  // You can not have black background, or no shape -> then have border
  const [seedString, setSeedString] = useState("Solana");
  const [seedStringError, setSeedStringError] = useState<string | undefined>();
  const [isStringUnique, setIsStringUnique] = useState<string | undefined>();
  const [validTicketCount, setValidTicketCount] = useState<number>(0);

  const [disableBorderType, setDisableBorderType] = useState<boolean>(false);
  const [banner, setBanner] = useState<string>("");
  const [sinceLastUniqueFetch, setSinceLastUniqueFetch] = useState<number | undefined>(0);

  const [childKey, setChildKey] = useState(1);

  const wallet = useAnchorWallet();

  const validateSeedString = (value: string) => {
    if (value.length > 12) {
      setSeedStringError(
        "Seed String must equal 12 characters or less characters"
      );
    } else {
      setSeedString(value);
      setSeedStringError(undefined);
    }
  };

  const CheckIfStringIsUnique = async (value: String) => {
    const API_URL = "/api/ValidateStringUnique?";
    if (sinceLastUniqueFetch && Date.now() - sinceLastUniqueFetch < 5000) {
      const timeLeft = (5000 - (Date.now() - sinceLastUniqueFetch))/1000;
      setBanner(`Please wait ${timeLeft} seconds before next request`);
    } else {
      setSinceLastUniqueFetch(Date.now());
      axios.get(
        API_URL + `seedString=${value}`
      ).then(
        (response) => {
          if (response.data.seedString === "true") {
            setIsStringUnique(`${value} is unique (Has not been minted)`);
          } else {
            setIsStringUnique(`${value} is not unique (Has been minted)`);
          }
        }
      ).catch(() => {setBanner("Error submitting unique request, try again")})
    }
  };

  const DoesWalletHaveUnusuedTicket = async (walletPublicKey: String) => {
    const API_URL = "/api/GetUnusedTicketCount?";
    axios.get(
      API_URL + `walletPublicKey=${walletPublicKey}`
    ).then((response) => {
      setBanner(`Found ${response.data.walletPublicKey} Tickets!`);
      setValidTicketCount(response.data.walletPublicKey);
    }).catch(
      () => setBanner("Error when grabbing ticket count")
    )
    setBanner("Grabbing Ticket Count");
  };

  useEffect(() => {
    if (shapeType === 0 || backgroundType === 0) {
      setShapeBorder(0);
      setDisableBorderType(true);
    } else {
      setDisableBorderType(false);
    }
  }, [shapeType, backgroundType]);

  useEffect(() => {
    setChildKey((prev) => prev + 1);
  }, [shapeType, backgroundType, shapeBorder]);

  useEffect(() => {
    if (wallet) {
      DoesWalletHaveUnusuedTicket(wallet.publicKey.toBase58());
    }
  }, [wallet]);

  const SelectItem = styled(Select)(({ theme }) => ({
    padding: 2,
    textAlign: "center",
    fontFamily: "Orbitron",
  }));

  return (
    <main>
      <SocialsDiv />

      <h1 className="centerTitle glitch"> GENERATOR </h1>

      {wallet && (
        <p style={{ margin: "0 auto", textAlign: "center" }}>
          {" "}
          Wallet: {shortenAddress(wallet.publicKey.toBase58())}{" "}
        </p>
      )}
        <>
          <br></br>
          <p style={{ margin: "0 auto", textAlign: "center" }}>
            {`You have a total of ${validTicketCount} valid ticket(s)`}{" "}
          </p>
          <Box
            component="form"
            autoComplete="off"
            noValidate
            sx={{
              width: 600,
              bgcolor: "#4834d4",
              "& .MuiTextField-root": { m: 1, width: "25ch" },
              margin: "0 auto",
              opacity: "0.8",
              border: "20px solid black",
              padding: 3,
              borderRadius: 1,
              boxShadow: 1,
            }}
          >
            <Stack spacing={3}>
              <FormControl>
                <InputLabel id="demo-simple-select-label">
                  Background
                </InputLabel>
                <SelectItem
                  variant="filled"
                  autoWidth
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={backgroundType}
                  label="Background"
                  onChange={(event) => {
                    setBackgroundType(event.target.value as number);
                  }}
                >
                  <MenuItem value={0}>Black</MenuItem>
                  <MenuItem value={1}>Gradient</MenuItem>
                </SelectItem>
              </FormControl>
              <FormControl>
                <InputLabel id="demo-simple-select-label">
                  Shape Type
                </InputLabel>
                <SelectItem
                  variant="filled"
                  autoWidth
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={shapeType}
                  label="Shape Type"
                  onChange={(event) => {
                    setShapeType(event.target.value as number);
                  }}
                >
                  <MenuItem value={0}>None</MenuItem>
                  <MenuItem value={1}>Circle</MenuItem>
                  <MenuItem value={2}>Square</MenuItem>
                </SelectItem>
              </FormControl>
              <FormControl>
                <InputLabel id="demo-simple-select-label">
                  Shape Border
                </InputLabel>
                <SelectItem
                  variant="filled"
                  autoWidth
                  disabled={disableBorderType}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={shapeBorder}
                  label="Shape Border"
                  onChange={(event) => {
                    setShapeBorder(event.target.value as number);
                  }}
                >
                  <MenuItem value={0}>No Border</MenuItem>
                  <MenuItem value={1}>Border</MenuItem>
                </SelectItem>
              </FormControl>
              <FormControl>
                <TextField
                  sx={{
                    textAlign: "center",
                    padding: 2,
                    fontFamily: "Orbitron",
                  }}
                  label="Seed String"
                  variant="outlined"
                  error={seedStringError !== undefined}
                  helperText={seedStringError}
                  id="outlined-multiline-flexible"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={seedString}
                  onChange={(event) => {
                    validateSeedString(event.target.value);
                  }}
                />
                <Button
                  variant="contained"
                  onClick={() => {
                    CheckIfStringIsUnique(seedString);
                  }}
                >
                  IS TAKEN?
                </Button>
                {isStringUnique && <p> {isStringUnique} </p>}
              </FormControl>
            </Stack>
          </Box>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ padding: "20px" }}
          >
            <Button
              sx={{ margin: "0 auto" }}
              variant="outlined"
              size="large"
              onClick={() => {
                setChildKey((prev) => prev + 1);
              }}
            >
              GENERATE
            </Button>
          </Stack>
          {childKey !== 1 ? (
            <div key={childKey}>
              <GeneratorDiv
                BACKGROUND_TYPE={backgroundType}
                SHAPE_TYPE={shapeType}
                SHAPE_BORDER={shapeBorder}
                SEED_STRING={seedString}
              />
            </div>
          ) : <></>
          }
        </>

      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ padding: "20px" }}
      >
        {validTicketCount === 0 ? (
          <>
            {validTicketCount === 0 && (
              <p>
                Connect a wallet that has Solstice Tickets
              </p>
            )}
            <WalletDialogButton variant="contained" size="large">
              Connect Wallet
            </WalletDialogButton>
          </>
        ) : (
          <div>
            <Button
              variant="contained"
              size="large"
              onClick={() => {
                // create loading overlay!
                const requestBody = {
                  seedString: seedString,
                  //@ts-ignore
                  walletPublicKey: wallet.publicKey.toBase58(),
                  artConfig: {
                    BackgroundType: backgroundType,
                    ShapeType: shapeType,
                    borderType: shapeBorder,
                  },
                };
                axios
                  .post("/api/updateMetadata", requestBody)
                  .then((result) => {
                    if (result.data.walletPublicKey === "no valid tickets") {
                      setBanner("no valid tickets found");
                    } else {
                      setBanner("Processing request");
                    }
                  }).catch(() => {
                    setBanner("Error processing Request, try again");
                  })
                  .finally(() => {
                    //@ts-ignore
                    DoesWalletHaveUnusuedTicket(wallet.publicKey.toBase58());
                  });
                setBanner("sent request");
              }}
            >
              SUBMIT TICKET
            </Button>
          </div>
        )}
      </Stack>
      <Snackbar
        open={banner !== ""}
        autoHideDuration={6000}
        onClose={() => setBanner("")}
        anchorOrigin={{ vertical: "top", horizontal: "right"}}
      >
        <Alert
          onClose={() => setBanner("")}
        >
          {banner}
        </Alert>
      </Snackbar>
    </main>
  );
};
