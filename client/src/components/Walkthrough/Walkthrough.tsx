import Joyride from "react-joyride";
import { useFirstTimeUserStore } from "@Store";

export const Walkthrough = () => {
    const { toggleIsFirstTimeUser } = useFirstTimeUserStore();
    const steps = [
        {
            target: "body",
            content: "Welcome to Astrostation! 🚀",
            placement: "center"
        },
        {
            target: ".sideNav",
            content: "This is your navigation. Here, you can switch widgets on/off and organize them by dragging.",
        },
        {
            target: ".settingsButton",
            content: "In the settings, you can configure Astrostation to you liking by controlling your active widgets and their functionality.",
        },
        {
            target: ".donateButton",
            content: "Astrostation is 100% free to use. If you are feeling generous, you can donate Etherum."
        }
    ];
  
  return (
        <Joyride
            steps={steps}
            debug={true}
            continuous={true}
            showProgress={true}
            showSkipButton={true}
            styles={{
                options: {
                    backgroundColor: "#eee",
                    primaryColor: "rgb(109 40 217)",
                    width: 400
               }
            }}
            callback={(e)=>{
                if(e.action === "reset")
                    toggleIsFirstTimeUser();
            }}
        />
  );
}
