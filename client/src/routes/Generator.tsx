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
import { PublicKey } from "@solana/web3.js";
import { shortenAddress } from "../candy-machine";

export interface GeneratorProps {
  connection: anchor.web3.Connection;
}

export const Generator = (props: GeneratorProps) => {
  const [backgroundType, setBackgroundType] = useState(0);
  const [shapeType, setShapeType] = useState(1);
  const [shapeBorder, setShapeBorder] = useState(0);
  const [seedString, setSeedString] = useState("Solana");
  const [seedStringError, setSeedStringError] = useState<string | undefined>(
    undefined
  );
  const [isStringUnique, setIsStringUnique] = useState<string | undefined>(undefined);

  const [disableBorderType, setDisableBorderType] = useState<boolean>(false);

  const [childKey, setChildKey] = useState(1);

  const wallet = useAnchorWallet();
  const TICKET_TOKEN_PROGRAM_ID = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";

  const [tickets, setTickets] = useState(0);

  const validateSeedString = (value: string) => {
    if (value.length > 16) {
      setSeedStringError(
        "Seed String must equal 16 characters or less characters"
      );
    } else {
      setSeedString(value);
      setSeedStringError(undefined);
    }
  };

  const CheckIfStringIsUnique = async (value: String) => {
    const API_URL = "/api/ValidateStringUnique?"
    const response = await fetch(API_URL + `seedString=${value}`);
    const body = await response.json();
    if (body['seedString'] === true){
      setIsStringUnique(`${value} is unique (Has not been minted)`);
    } else {
      setIsStringUnique(`${value} is not unique (Has been minted)`);
    }
  }

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
    // if (wallet) {
    //   props.connection
    //     .getTokenAccountsByOwner(wallet?.publicKey, {
    //       programId: new PublicKey(TICKET_TOKEN_PROGRAM_ID),
    //     })
    //       .then(async (result) => {
    //         // loop through public keys, check if they were already created in db
    //         console.log(result.value[0].pubkey.toBase58());
    //         const response = await fetch('/api/hello');
    //         const body = await response.json()
    //         console.log(body);
    //         setTickets(result.value.length);
    //       }
    //     );
    // }
  }, [wallet, props.connection]);

  const SelectItem = styled(Select)(({ theme }) => ({
    padding: 2,
    textAlign: "center",
    fontFamily: "Orbitron",
  }));

  return (
    <main>
      <SocialsDiv />

      <h1 className="centerTitle glitch"> GENERATOR </h1>

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
            <InputLabel id="demo-simple-select-label">Background</InputLabel>
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
            <InputLabel id="demo-simple-select-label">Shape Type</InputLabel>
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
            <InputLabel id="demo-simple-select-label">Shape Border</InputLabel>
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
            { isStringUnique && <p> {isStringUnique} </p> }
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
        {!wallet ? (
          <WalletDialogButton variant="contained" size="large">
            Connect Wallet
          </WalletDialogButton>
        ) : (
          <div>
            <p> Wallet: {shortenAddress(wallet.publicKey.toBase58())} </p>
            <p> Tickets: {tickets} </p>
            <Button
              variant="contained"
              size="large"
              onClick={() => {
                // create loading overlay
                // POST request to backend
                // send pubkey of wallet + seed string, and parameters (background, shape, border etc)
                // then, remove overlay, and refresh ticket count (query blockchain again)
              }}
            >
              SUBMIT TICKET
            </Button>
          </div>
        )}
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
      ) : (
        <></>
      )}
    </main>
  );
};
