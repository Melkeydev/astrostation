import Joyride from "react-joyride";
import { useFirstTimeUserStore } from "@Store";

export const Walkthrough = () => {
  const { toggleIsFirstTimeUser } = useFirstTimeUserStore();
  const steps = [
    {
      target: "body",
      content: "Welcome to Astrostation! 🚀",
      placement: "center",
    },
    {
      target: ".sideNav",
      content: "This is your navigation. Here, you can switch widgets on/off.",
    },
    {
      target: ".settingsButton",
      content:
        "In the settings, you can configure certain Astrostation widgets to your liking.",
    },
    {
      target: ".configureWidgetsButton",
      content:
        "This is your widget configuration screen — add the widgets you want, remove the ones you don't.",
    },
    {
      target: ".chooseBackgroundButton",
      content: "Not feeling this background? Switch it up!",
    },
    {
      target: ".donateButton",
      content:
        "Astrostation is 100% free to use. If you are feeling generous, you can donate Ethereum.",
    },
  ];

  return (
    <Joyride
      // @ts-ignore
      steps={steps}
      debug={true}
      continuous={true}
      showProgress={true}
      showSkipButton={true}
      styles={{
        options: {
          backgroundColor: "#eee",
          primaryColor: "rgb(109 40 217)",
          width: 400,
        },
      }}
      callback={(e) => {
        if (e.action === "reset") toggleIsFirstTimeUser();
      }}
    />
  );
};
