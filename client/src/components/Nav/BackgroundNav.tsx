import { useRef, useEffect } from "react";
import { useSetBackground } from "@Store";
import { BackgroundDropdownItem } from "./BackgroundDropdownItem";

export const BackgroundNav = ({
  backgrounds,
  isVisible = false,
  onClose,
}: {
  backgrounds: any;
  isVisible: boolean;
  onClose: any;
}) => {
  const { isBackground, setIsBackground } = useSetBackground();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
    function handleClickOutside(event: any) {
      if (!menuRef.current?.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return !isVisible ? null : (
    <div className="flex justify-end" ref={menuRef}>
      <div className="w-70 text-left">
        <div
          className="origin-top-right absolute right-0 w-56 rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none z-10"
          role="menu"
          ref={menuRef}
        >
          <BackgroundDropdownItem
            isPicked={isBackground == backgrounds.STARS}
            setIsBackground={setIsBackground}
            background={backgrounds.STARS}
            title="Stars"
          />
          <BackgroundDropdownItem
            isPicked={isBackground == backgrounds.CITY}
            setIsBackground={setIsBackground}
            background={backgrounds.CITY}
            title="City"
          />
          <BackgroundDropdownItem
            isPicked={isBackground == backgrounds.SNOW}
            setIsBackground={setIsBackground}
            background={backgrounds.SNOW}
            title="Snow"
          />
          <BackgroundDropdownItem
            isPicked={isBackground == backgrounds.FADE}
            setIsBackground={setIsBackground}
            background={backgrounds.FADE}
            title="Fade"
          />
          <BackgroundDropdownItem
            isPicked={isBackground == backgrounds.GRADIENT}
            setIsBackground={setIsBackground}
            background={backgrounds.GRADIENT}
            title="Gradient"
          />
          <BackgroundDropdownItem
            isPicked={isBackground == backgrounds.NYANCAT}
            setIsBackground={setIsBackground}
            background={backgrounds.NYANCAT}
            title="NyanCat"
          />
          <BackgroundDropdownItem
            isPicked={isBackground == backgrounds.JAPAN}
            setIsBackground={setIsBackground}
            background={backgrounds.JAPAN}
            title="Japan"
          />
          <BackgroundDropdownItem
            isPicked={isBackground == backgrounds.COTTAGE}
            setIsBackground={setIsBackground}
            background={backgrounds.COTTAGE}
            title="Cottage"
          />
          <BackgroundDropdownItem
            isPicked={isBackground == backgrounds.LOFIGIRL}
            setIsBackground={setIsBackground}
            background={backgrounds.LOFIGIRL}
            title="Lofi Girl"
          />
          <BackgroundDropdownItem
            isPicked={isBackground == backgrounds.TRAIN}
            setIsBackground={setIsBackground}
            background={backgrounds.TRAIN}
            title="Train"
          />
          <BackgroundDropdownItem
            isPicked={isBackground == backgrounds.DVD}
            setIsBackground={setIsBackground}
            background={backgrounds.DVD}
            title="DVD Player"
          />
          <BackgroundDropdownItem
            isPicked={isBackground == backgrounds.UNSPLASH}
            setIsBackground={setIsBackground}
            background={backgrounds.UNSPLASH}
            title="Unsplash"
          />
        </div>
      </div>
    </div>
  );
};
