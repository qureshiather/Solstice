import { useParams } from "react-router-dom";
import GeneratorDiv from "../components/GeneratorDiv";
import { MAPPINGS } from "../utils/config-mappings";

type ParamTypes = {
  seedString: string;
  shapeType: keyof typeof MAPPINGS.shapeType;
  shapeBorder: keyof typeof MAPPINGS.borderType;
  resolution: keyof typeof MAPPINGS.resolution;
  backgroundType: keyof typeof MAPPINGS.backgroundType;
};

export const Generate = () => {
  let { seedString, shapeType, shapeBorder, resolution, backgroundType } =
    useParams<ParamTypes>();

  if (seedString && shapeType && shapeBorder && resolution && backgroundType) {
    return (
      <>
        <h3>
          Shape: {MAPPINGS.shapeType[shapeType]} <br />
          Border: {MAPPINGS.borderType[shapeBorder]} <br />
          Background: {MAPPINGS.backgroundType[backgroundType]} <br />
          Resolution: {MAPPINGS.resolution[resolution].label} <br />
          Seed: {seedString}
        </h3>
        <GeneratorDiv
          BACKGROUND_TYPE={parseInt(backgroundType)}
          SHAPE_TYPE={parseInt(shapeType)}
          SHAPE_BORDER={parseInt(shapeBorder)}
          SEED_STRING={seedString}
          RESOLUTION={MAPPINGS.resolution[resolution]}
        />
      </>
    );
  }

  return <div> Invalid Parameters </div>;
};
