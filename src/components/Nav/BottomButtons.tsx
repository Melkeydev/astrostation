import { Button } from "../Common/Button";
import { AiOutlineGithub } from "react-icons/ai";
import { WithTooltip } from "../Tooltip";
import { SiGithub } from "react-icons/si";
import { useStickyNote } from "@Root/src/store";
import { IStickyNote } from "@Root/src/interfaces";


function getNotes(notes: IStickyNote[]): string {
  const stickyobjs = new Blob([JSON.stringify({ notes })], {
    type: "application/json"
  })
  return URL.createObjectURL(stickyobjs)
}


function BottomButtons() {
  const { stickyNotes } = useStickyNote()
  const notesurl = getNotes(stickyNotes)

  return (
    <div className="fixed bottom-2 z-10 flex items-center space-x-4 ml-32">
      <WithTooltip text="Astrostation is an open source project and is open to contributions.">
        <a href="https://github.com/MelkeyOSS/astrostation" target="_blank" className="inline-flex">
          <Button className="flex h-10 w-14 items-center justify-center rounded-md" variant="bottomButton">
            <SiGithub size={23} />
          </Button>
        </a>
      </WithTooltip>

      <WithTooltip text="Export Notes Locally">
        <a
          href={notesurl}
          download="notes.json"
          className="inline-flex"
        >
          <Button className="h-10 px-4 flex items-center justify-center" variant="bottomButton">
            Export
          </Button>
        </a>
      </WithTooltip>
    </div>
  );
}
export default BottomButtons;
