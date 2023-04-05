import { City } from "./City/City";
import { Fade } from "./Fade/Fade";
import { Gradient } from "./Gradient/Gradient";
import { Japan } from "./Japan/Japan";
import { Cottage } from "./Cottage/Cottage";
import { LofiGirl } from "./LofiGirl/LofiGirl";
import { Train } from "./Train/Train";
import { DvdPlayer } from "./Dvd/DvdPlayer";
import { Unsplash } from "./Unsplash/Unsplash";
import { useSetBackground } from "@Store";
import { CustomColor } from "./CustomColor/CustomColor";
import { Background } from "@Root/src/App";

const getBackgroundImage = (id: Background) => {
  const Components = {
    [Background.CITY]: City,
    [Background.FADE]: Fade,
    [Background.GRADIENT]: Gradient,
    [Background.JAPAN]: Japan,
    [Background.COTTAGE]: Cottage,
    [Background.LOFIGIRL]: LofiGirl,
    [Background.TRAIN]: Train,
    [Background.DVD]: DvdPlayer,
    [Background.UNSPLASH]: Unsplash,
    [Background.CUSTOM_COLOR]: CustomColor,
  };

  return Components[id];
};

export const Backgrounds = () => {
  const { backgroundId } = useSetBackground();

  const BackgroundComp = getBackgroundImage(backgroundId);
  return (
    <div className="fixed inset-0 bg-black">
      <BackgroundComp />
    </div>
  );
};
