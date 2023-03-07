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

export const Backgrounds = ({ backgrounds }: { backgrounds: any }) => {
  const { isBackground } = useSetBackground();
  return (
    <div className="fixed inset-0 bg-black">
      {
        {
          [backgrounds.CITY]: <City />,
          [backgrounds.FADE]: <Fade />,
          [backgrounds.GRADIENT]: <Gradient />,
          [backgrounds.JAPAN]: <Japan />,
          [backgrounds.COTTAGE]: <Cottage />,
          [backgrounds.LOFIGIRL]: <LofiGirl />,
          [backgrounds.TRAIN]: <Train />,
          [backgrounds.DVD]: <DvdPlayer />,
          [backgrounds.UNSPLASH]: <Unsplash />,
        }[isBackground]
      }
    </div>
  );
};
