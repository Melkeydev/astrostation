import { NavItem } from "./NavItems";
import { useStickyNote } from "@Store";
import { toggledToastNotification } from "../../utils/toast";

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
      className={`${
        active ? "" : "hidden"
      } w-full sm:flex sm:flex-grow sm:w-auto sm:flex-col`}
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
          <span className="h-[25px] w-[25px] bg-[#000] rounded-full absolute right-[8px] bottom-[8px] text-white text-center">
            {stickyNotes.length}
          </span>
        )}
      </NavItem>
    </div>
  );
};
