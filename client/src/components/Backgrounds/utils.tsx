import { City } from "./City/City";
import { Fade } from "./Fade/Fade";
import { Gradient } from "./Gradient/Gradient";
import { Japan } from "./Japan/Japan";
import { Cottage } from "./Cottage/Cottage";
import { LofiGirl } from "./LofiGirl/LofiGirl";
import { Train } from "./Train/Train";
import { DvdPlayer } from "./Dvd/DvdPlayer";
import { Unsplash } from "./Unsplash/Unsplash";
import Stars from "./Stars";
import Snow from "./Snow";
import NyanCat from "./NyanCat";
import { useSetBackground } from "@Store";
import { loadFull } from "tsparticles";

const particlesInit = async (main) => {
  // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
  // starting from v2 you can add only the features you need reducing the bundle size
  await loadFull(main);
};

export const Backgrounds = ({ backgrounds }: { backgrounds: any }) => {
  const { isBackground } = useSetBackground();
  return (
    <div className="fixed inset-0 bg-black">
      {
        {
          [backgrounds.CITY]: <City />,
          [backgrounds.SNOW]: <Snow particlesInit={particlesInit} />,
          [backgrounds.FADE]: <Fade />,
          [backgrounds.GRADIENT]: <Gradient />,
          [backgrounds.JAPAN]: <Japan />,
          [backgrounds.COTTAGE]: <Cottage />,
          [backgrounds.LOFIGIRL]: <LofiGirl />,
          [backgrounds.TRAIN]: <Train />,
          [backgrounds.DVD]: <DvdPlayer />,
          [backgrounds.STARS]: <Stars particlesInit={particlesInit} />,
          [backgrounds.NYANCAT]: <NyanCat particlesInit={particlesInit} />,
          [backgrounds.UNSPLASH]: <Unsplash />,
        }[isBackground]
      }
    </div>
  );
};
