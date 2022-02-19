import { Space } from "./Space/Space";
import { ShootingStars } from "./ShootingStars/ShootingStars";
import { City } from "./City/City";
import { useSetBackground } from "../../store";

export const Backgrounds = ({ backgrounds }: { backgrounds: any }) => {
  const { isBackground } = useSetBackground();
  console.log(isBackground);
  return (
    <div className="fixed inset-0">
      {
        {
          [backgrounds.SPACE]: <Space />,
          [backgrounds.STARS]: <ShootingStars />,
          [backgrounds.CITY]: <City />,
        }[isBackground]
      }
    </div>
  );
};
