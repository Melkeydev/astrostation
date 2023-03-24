import {Button} from "../Common/Button"
import { AiOutlineGithub } from "react-icons/ai";
import { WithTooltip } from "../Tooltip"
import { SiGithub } from "react-icons/si";

function navigateToGithub(){
window.open("https://github.com/MelkeyOSS/astrostation")
}
function BottomButtons(){
return(
    <WithTooltip text="Astrostation is an open source project and is open to contributions."> 
        <div className="fixed bottom-2 ml-32">  
            <Button  onClick={()=>navigateToGithub()} className=" flex items-center rounded-md h-10 mw-10 w-14  " variant="bottomButton">
            <SiGithub size={30} />  
           </Button>
        </div>
    </WithTooltip>
)}
export default BottomButtons      
