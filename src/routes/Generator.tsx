import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

export const Generator = () => {
  // 0 is black, and 1 is gradient
  const [backgroundType, setBackgroundType] = useState(0);
  // 1 is circle, 2 is square
  const [shapeType, setShapeType] = useState(1);
  // 0 is no border, 1 is border
  const [shapeBorder, setShapeBorder] = useState(0);

  const [resolution, setResolution] = useState<number>(0);

  // You can not have black background, or no shape -> then have border
  const [seedString, setSeedString] = useState("MEWTWO");
  const [seedStringError, setSeedStringError] = useState<string | undefined>();

  const [disableBorderType, setDisableBorderType] = useState<boolean>(false);
  const [banner, setBanner] = useState<string>("");

  const validateSeedString = (value: string) => {
    if (value.length > 12) {
      setSeedStringError(
        "Seed String must equal 12 characters or less characters",
      );
    } else {
      setSeedString(value);
      setSeedStringError(undefined);
    }
  };

  useEffect(() => {
    if (backgroundType === 0) {
      setShapeBorder(0);
      setDisableBorderType(true);
    } else {
      setDisableBorderType(false);
    }
  }, [shapeType, backgroundType]);

  const SelectItem = styled(Select)(({ theme }) => ({
    padding: 2,
    textAlign: "center",
    fontFamily: "Orbitron",
  }));

  return (
    <main>
      <h1 className="centerTitle glitch"> GENERATOR </h1>

      <>
        <br></br>
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
              <InputLabel id="demo-simple-select-label">Resolution</InputLabel>
              <SelectItem
                variant="filled"
                autoWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={resolution}
                label="Resolution"
                onChange={(event) => {
                  setResolution(event.target.value as number);
                }}
              >
                <MenuItem value={0}>1080</MenuItem>
                <MenuItem value={1}>2k</MenuItem>
                <MenuItem value={2}>4K</MenuItem>
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
              window.open(
                `/generate/${seedString}/${backgroundType}/${shapeType}/${shapeBorder}/${resolution}`,
                "_blank",
                "noopener,noreferrer",
              );
            }}
          >
            GENERATE
          </Button>
        </Stack>
      </>

      <Snackbar
        open={banner !== ""}
        autoHideDuration={6000}
        onClose={() => setBanner("")}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setBanner("")}>{banner}</Alert>
      </Snackbar>
    </main>
  );
};
