import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import GeneratorDiv from "../components/GeneratorDiv";
import Paper from "@mui/material/Paper";
import { MAPPINGS } from "../utils/config-mappings";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

type ParamTypes = {
  seedString: string;
  shapeType: keyof typeof MAPPINGS.shapeType;
  shapeBorder: keyof typeof MAPPINGS.borderType;
  resolution: keyof typeof MAPPINGS.resolution;
  backgroundType: keyof typeof MAPPINGS.backgroundType;
};

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
}));

export const Generate = () => {
  let { seedString, shapeType, shapeBorder, resolution, backgroundType } =
    useParams<ParamTypes>();

  if (seedString && shapeType && shapeBorder && resolution && backgroundType) {
    return (
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid container size={12} justifyContent="center">
          <Item>
            <Typography variant="body1">
              Shape: {MAPPINGS.shapeType[shapeType]} <br />
              Border: {MAPPINGS.borderType[shapeBorder]} <br />
              Background: {MAPPINGS.backgroundType[backgroundType]} <br />
              Resolution: {MAPPINGS.resolution[resolution].label} <br />
              Seed: {seedString}
            </Typography>
          </Item>
        </Grid>
        <Grid container size={6} justifyContent="center">
          <Item>
            <Typography variant="body1">
              Wait until the image has finished rendering (1500 frames), and
              then click download
            </Typography>
          </Item>
        </Grid>
        <Grid container size={12} justifyContent="center">
          <GeneratorDiv
            showDownload={true}
            BACKGROUND_TYPE={parseInt(backgroundType)}
            SHAPE_TYPE={parseInt(shapeType)}
            SHAPE_BORDER={parseInt(shapeBorder)}
            SEED_STRING={seedString}
            RESOLUTION={MAPPINGS.resolution[resolution]}
          />
        </Grid>
      </Grid>
    );
  }

  return <div> Invalid Parameters </div>;
};
