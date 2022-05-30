import { useRef, useEffect } from "react";
import { useSetBackground } from "@Store";

import { BackgroundDropdownItem } from "./BackgroundDropdownItem";

export const BackgroundNav = ({ backgrounds, isVisible = false, onClose }: { backgrounds: any, isVisible: boolean, onClose: any }) => {
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
            className="origin-top-right absolute right-0 w-56 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none z-10"
            role="menu"
            ref={menuRef}
          >
            <BackgroundDropdownItem 
              isPicked={isBackground == 0}
              setIsBackground={setIsBackground}
              background={backgrounds.STARS}
              title="Stars"
            />
            <BackgroundDropdownItem 
              isPicked={isBackground == 1}
              setIsBackground={setIsBackground}
              background={backgrounds.CITY}
              title="City"
            />
            <BackgroundDropdownItem 
              isPicked={isBackground == 2}
              setIsBackground={setIsBackground}
              background={backgrounds.DOTS}
              title="Dots"
            />
            <BackgroundDropdownItem 
              isPicked={isBackground == 3}
              setIsBackground={setIsBackground}
              background={backgrounds.SNOW}
              title="Snow"
            />
            <BackgroundDropdownItem 
              isPicked={isBackground == 4}
              setIsBackground={setIsBackground}
              background={backgrounds.FADE}
              title="Fade"
            />
            <BackgroundDropdownItem 
              isPicked={isBackground == 5}
              setIsBackground={setIsBackground}
              background={backgrounds.GRADIENT}
              title="Gradient"
            />
          </div>
      </div>
    </div>
  );
};
