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
          className=" mt-2 ml-2 absolute right-2 z-10 w-56 origin-top-right divide-y divide-gray-100 dark:divide-gray-900 rounded-md bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          ref={menuRef}
        >
          <BackgroundDropdownItem
            isPicked={isBackground == backgrounds.CITY}
            setIsBackground={setIsBackground}
            background={backgrounds.CITY}
            title="City"
            className="rounded-t-md"
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
            className="rounded-b-md"
          />
        </div>
      </div>
    </div>
  );
};
