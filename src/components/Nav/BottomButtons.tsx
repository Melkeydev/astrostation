import {Button} from "../Common/Button"
import { AiOutlineGithub } from "react-icons/ai";
import { WithTooltip } from "../Tooltip"

function navigateToGithub(){
window.open("https://github.com/MelkeyOSS/astrostation")
}
function BottomButtons(){
return(
    <WithTooltip text="Astrostation is an open source project and is open to contributions."> 
        <div className="fixed bottom-2 ml-32">  
            <Button  onClick={()=>navigateToGithub()} className="donateButton flex items-center rounded-md h-10 font-medium" variant="bottomButton">
            <AiOutlineGithub className="#"/>  
           </Button>
        </div>
    </WithTooltip>
)}
export default BottomButtons      
