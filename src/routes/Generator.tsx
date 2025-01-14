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
import Grid from "@mui/material/Grid2";
import GeneratorDiv from "../components/GeneratorDiv";
import FormHelperText from "@mui/material/FormHelperText";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";

export const Generator = () => {
  const [refreshKey, setRefreshKey] = useState(0); // State to force a remount

  // 0 is black, and 1 is gradient
  const [backgroundType, setBackgroundType] = useState(0);
  // 1 is circle, 2 is square
  const [shapeType, setShapeType] = useState(1);
  // 0 is no border, 1 is border
  const [shapeBorder, setShapeBorder] = useState(0);

  const [resolution, setResolution] = useState<number>(0);

  // You can not have black background, or no shape -> then have border
  const [seedString, setSeedString] = useState("REACT");
  const [seedStringError, setSeedStringError] = useState<string | undefined>();

  const [snackBarText, setSnackBarText] = useState<string>("");
  const [openSnackBar, setOpenSnackBar] = useState<boolean>(false);

  const [disableBorderType, setDisableBorderType] = useState<boolean>(false);

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
    textAlign: "center",
  }));

  return (
    <main>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={5000}
        message={snackBarText}
        onClose={() => {
          setOpenSnackBar(false);
          setSnackBarText("");
        }}
      />
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid container size={12} justifyContent="center">
          <Typography variant="h2" component="h2">
            Generator
          </Typography>
        </Grid>
        <Grid container size={6} justifyContent="center" alignItems="center">
          <Box
            component="form"
            autoComplete="off"
            noValidate
            sx={{
              bgcolor: "#363a4f",
              border: "3px solid #181926",
              borderRadius: "4px",
              padding: 2,
              height: "500px",
              width: "500px",
            }}
          >
            <Stack spacing={3}>
              <FormControl>
                <InputLabel>Background</InputLabel>
                <SelectItem
                  value={backgroundType}
                  label="Background"
                  onChange={(event) => {
                    setBackgroundType(event.target.value as number);
                  }}
                >
                  <MenuItem value={0}>Black</MenuItem>
                  <MenuItem value={1}>Gradient</MenuItem>
                </SelectItem>
                <FormHelperText>
                  Background for the Image, either black or gradiant
                </FormHelperText>
              </FormControl>
              <FormControl>
                <InputLabel>Shape Type</InputLabel>
                <SelectItem
                  value={shapeType}
                  label="Shape Type"
                  onChange={(event) => {
                    setShapeType(event.target.value as number);
                  }}
                >
                  <MenuItem value={1}>Circle</MenuItem>
                  <MenuItem value={2}>Square</MenuItem>
                </SelectItem>
                <FormHelperText>
                  The pattern can be drawn in either a circle or square
                </FormHelperText>
              </FormControl>
              <FormControl>
                <InputLabel>Shape Border</InputLabel>
                <SelectItem
                  value={shapeBorder}
                  label="Shape Border"
                  onChange={(event) => {
                    if (disableBorderType) {
                      setSnackBarText(
                        "Unable to set border when background is black",
                      );
                      setOpenSnackBar(true);
                    } else {
                      setShapeBorder(event.target.value as number);
                    }
                  }}
                >
                  <MenuItem value={0}>No Border</MenuItem>
                  <MenuItem value={1}>Border</MenuItem>
                </SelectItem>
                <FormHelperText>
                  Border can be used to make the pattern more visible over the
                  background
                </FormHelperText>
              </FormControl>
              <FormControl>
                <InputLabel>Resolution</InputLabel>
                <SelectItem
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
                <FormHelperText>
                  Resolution of which to download the image in
                </FormHelperText>
              </FormControl>
              <FormControl>
                <TextField
                  label="Seed String"
                  variant="outlined"
                  error={seedStringError !== undefined}
                  helperText={seedStringError}
                  value={seedString}
                  onChange={(event) => {
                    validateSeedString(event.target.value);
                  }}
                />
                <FormHelperText>
                  The unique seed string used to generate your pattern
                </FormHelperText>
              </FormControl>
            </Stack>
          </Box>
        </Grid>
        <Grid container size={6} justifyContent="center" alignItems="center">
          <Box
            component="form"
            autoComplete="off"
            noValidate
            sx={{
              bgcolor: "#363a4f",
              border: "3px solid #181926",
              borderRadius: "4px",
              padding: 2,
            }}
          >
            <GeneratorDiv
              key={refreshKey} // Use refreshKey to force remount
              BACKGROUND_TYPE={backgroundType}
              SHAPE_TYPE={shapeType}
              SHAPE_BORDER={shapeBorder}
              SEED_STRING={seedString}
              RESOLUTION={{
                heightPx: "500",
                widthPx: "500",
                label: "500",
              }}
              showDownload={false}
            />
          </Box>
        </Grid>
        <Grid container justifyContent="center" size={6}>
          <Button
            variant="contained"
            size="large"
            onClick={() => {
              setSnackBarText("Generating new Preview...");
              setOpenSnackBar(true);
              setRefreshKey((prevKey) => prevKey + 1);
            }}
          >
            Preview
          </Button>
        </Grid>
        <Grid container justifyContent="center" size={6}>
          <Button
            sx={{ margin: "auto" }}
            variant="contained"
            size="large"
            onClick={() => {
              window.open(
                `/generate/${seedString}/${backgroundType}/${shapeType}/${shapeBorder}/${resolution}`,
                "_blank",
                "noopener,noreferrer",
              );
            }}
          >
            Download
          </Button>
        </Grid>
      </Grid>
    </main>
  );
};
