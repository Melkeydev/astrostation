import { NavItem } from "./NavItems";
import { Tooltip } from "@mui/material";
import { toggledToastNotification } from "../../utils/toast";

export const DraggableNavItem = ({
  active,
  item,
}: {
  active: boolean;
  item: any;
}) => {
  return (
    <div
      className={`${
        active ? "" : "hidden"
      } w-full sm:flex sm:flex-grow sm:w-auto sm:flex-col`}
    >
      <Tooltip title={item.tooltipTitle} placement="right">
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
        </NavItem>
      </Tooltip>
    </div>
  );
};
