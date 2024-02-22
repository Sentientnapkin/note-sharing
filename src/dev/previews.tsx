import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import SignUp from "../components/pages/SignUp";

const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree/>}>
      <ComponentPreview path="/SignUp">
        <SignUp/>
      </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;