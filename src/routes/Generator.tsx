import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { SocialsDiv } from "../components/SocialsDiv";
import GeneratorDiv from "../components/GeneratorDiv";
import { Button, TextField } from "@material-ui/core";

export const Generator = () => {
  const [backgroundType, setBackgroundType] = useState(0);
  const [shapeType, setShapeType] = useState(1);
  const [shapeBorder, setShapeBorder] = useState(0);
  const [seedString, setSeedString] = useState("123");

  const [childKey, setChildKey] = useState(1);

  return (
    <main>
      <SocialsDiv />

      <h1 className="centerTitle glitch"> GENERATOR </h1>

      <Box>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Background</InputLabel>
          <Select
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
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Shape Type</InputLabel>
          <Select
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
          </Select>
        </FormControl>
        {shapeType !== 0 && (
          <FormControl>
            <InputLabel id="demo-simple-select-label">Shape Border</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={shapeType}
              label="Shape Border"
              onChange={(event) => {
                setShapeBorder(event.target.value as number);
              }}
            >
              <MenuItem value={0}>No Border</MenuItem>
              <MenuItem value={1}>Border</MenuItem>
            </Select>
          </FormControl>
        )
        }
        <FormControl>
        <InputLabel htmlFor="input-with-icon-adornment">
          Seed String
        </InputLabel>
        <TextField
          id="outlined-multiline-flexible"
          value={seedString}
          onChange={(event) => {setSeedString(event.target.value)}}
        />
        </FormControl>
        )
      </Box>

      <Button onClick={() => {setChildKey((prev) => prev + 1)}}>
        GENERATE
      </Button>

      <div key={childKey}>
        <GeneratorDiv
          BACKGROUND_TYPE={backgroundType}
          SHAPE_TYPE={shapeType}
          SHAPE_BORDER={shapeBorder}
          SEED_STRING={seedString}
        />
      </div>
    </main>
  );
};
