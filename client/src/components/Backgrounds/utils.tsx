import { ShootingStars } from "./ShootingStars/ShootingStars";
import { City } from "./City/City";
import { Dots } from "./Dots/Dots";
import { Snow } from "./Snow/Snow";
import { Fade } from "./Fade/Fade";
import { Gradient } from "./Gradient/Gradient";
import { SpaceBlacksmith } from "./SpaceBlackSmith/SpaceBlacksmith";
import { Japan } from "./Japan/Japan";
import { Cottage } from "./Cottage/Cottage";
import { LofiGirl } from "./LofiGirl/LofiGirl";
import { Train } from "./Train/Train";
import { DvdPlayer } from "./Dvd/DvdPlayer";
import { useSetBackground } from "@Store";

export const Backgrounds = ({ backgrounds }: { backgrounds: any }) => {
  const { isBackground } = useSetBackground();
  return (
    <div className="fixed inset-0 bg-black">
      {
        {
          [backgrounds.STARS]: <ShootingStars />,
          [backgrounds.CITY]: <City />,
          [backgrounds.DOTS]: <Dots />,
          [backgrounds.SNOW]: <Snow />,
          [backgrounds.FADE]: <Fade />,
          [backgrounds.GRADIENT]: <Gradient />,
          [backgrounds.SPACEBLACKSMITH]: <SpaceBlacksmith />,
          [backgrounds.JAPAN]: <Japan />,
          [backgrounds.COTTAGE]: <Cottage />,
          [backgrounds.LOFIGIRL]: <LofiGirl />,
          [backgrounds.TRAIN]: <Train />,
          [backgrounds.DVD]: <DvdPlayer />,
        }[isBackground]
      }
    </div>
  );
};
