import { City } from "./City/City";
import { Dots } from "./Dots/Dots";
import { Fade } from "./Fade/Fade";
import { Gradient } from "./Gradient/Gradient";
import { Stars } from "./Stars";
import { Snow } from "./Snow";
import { AmongUs } from "./AmongUs";
import { useSetBackground } from "@Store";
import { NyanCat } from "./NyanCat";

export const Backgrounds = ({ backgrounds }: { backgrounds: any }) => {
  const { isBackground } = useSetBackground();
  return (
    <div className="fixed inset-0 bg-black">
      {
        {
          [backgrounds.CITY]: <City />,
          [backgrounds.DOTS]: <Dots />,
          [backgrounds.SNOW]: <Snow />,
          [backgrounds.FADE]: <Fade />,
          [backgrounds.GRADIENT]: <Gradient />,
          [backgrounds.STARS]: <Stars />,
          [backgrounds.AMONGUS]: <AmongUs />,
          [backgrounds.NYANCAT]: <NyanCat />,
        }[isBackground]
      }
    </div>
  );
};
