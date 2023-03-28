import { Button } from "../Common/Button";
import { AiOutlineGithub } from "react-icons/ai";
import { WithTooltip } from "../Tooltip";
import { SiGithub } from "react-icons/si";

function BottomButtons() {
  return (
    <WithTooltip text="Astrostation is an open source project and is open to contributions.">
      <div className="fixed bottom-2 z-10 ml-32">
        <a href="https://github.com/MelkeyOSS/astrostation" target="_blank">
          <Button className="flex h-10 w-14 items-center rounded-md" variant="bottomButton">
            <SiGithub size={23} />
          </Button>
        </a>
      </div>
    </WithTooltip>
  );
}
export default BottomButtons;
