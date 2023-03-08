import { NavItem } from "./NavItems";
import { useStickyNote } from "@Store";
import { toggledToastNotification } from "../../utils/toast";
import clsx from "clsx";

export const DraggableNavItem = ({
  active,
  item,
}: {
  active: boolean;
  item: any;
}) => {
  const { stickyNotes } = useStickyNote();
  return (
    <div
      className={clsx(
        active ? "" : "hidden",
        "w-full sm:flex sm:w-auto sm:flex-grow sm:flex-col"
      )}
    >
      <NavItem
        onClick={() =>
          toggledToastNotification(
            item.isToggled,
            item.setToggled,
            item.toggleString,
            750,
            item.toggleIcon
          )
        }
        toggled={item.isToggled}
        shown={item.isShown}
      >
        {item.content}
        {item.tooltipTitle == "Sticky Note" && stickyNotes.length > 0 && (
          <span className="absolute right-[8px] bottom-[8px] h-[25px] w-[25px] rounded-full bg-[#000] text-center text-white">
            {stickyNotes.length}
          </span>
        )}
      </NavItem>
    </div>
  );
};
