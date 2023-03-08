import { useEffect } from "react";
import { Backgrounds } from "@Components/Backgrounds/utils";
import { HomePage } from "@Pages/Homepage";
import { SideNav } from "@Components/Nav/SideNav";
import {
  useDarkToggleStore,
  useFirstTimeUserStore,
  useBreakStarted,
} from "@Store";
import { Toaster } from "react-hot-toast";
import { version } from "@Root/package.json";
import { Walkthrough } from "@Components/Walkthrough/Walkthrough";
import useSetDefault from "@App/utils/hooks/useSetDefault";
import clsx from "clsx";

enum backgrounds {
  CITY,
  FADE,
  GRADIENT,
  JAPAN,
  COTTAGE,
  LOFIGIRL,
  TRAIN,
  DVD,
  UNSPLASH,
}

function App() {
  const isDark = useDarkToggleStore((state) => state.isDark);
  const { isFirstTimeUser } = useFirstTimeUserStore();
  const { breakStarted } = useBreakStarted();
  const setDefault = useSetDefault();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    if (!localStorage.APP_VERSION || localStorage.APP_VERSION != version) {
      setDefault();
      localStorage.setItem("APP_VERSION", version);
    }
  }, []);

  return (
    <>
      {isFirstTimeUser && <Walkthrough />}
      <Backgrounds backgrounds={backgrounds} />
      <div
        className={clsx(
          "fixed inset-0 overflow-auto",
          breakStarted && "bg-blue-500 bg-opacity-40"
        )}
      >
        <Toaster />
        <SideNav />
        <HomePage backgrounds={backgrounds} />
      </div>
    </>
  );
}

export default App;
