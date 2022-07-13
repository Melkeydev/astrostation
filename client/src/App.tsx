import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, memo } from "react";
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

enum backgrounds {
  STARS,
  CITY,
  SNOW,
  FADE,
  GRADIENT,
  AMONGUS,
  NYANCAT,
  JAPAN,
  COTTAGE,
  LOFIGIRL,
  TRAIN,
  DVD,
  UNSPLASH,
}

// This is not the useMemo hook
// We have memoized the component
// React.memo needs to be outside of the component
const BackgroundsMemo = memo(Backgrounds);

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
    console.log("how many times does this fire");
    if (
      typeof localStorage.APP_VERSION === "undefined" ||
      localStorage.APP_VERSION === null
    ) {
      // We want to clear the state of anyone without this to be safe
      setDefault(true, true, true);
      localStorage.setItem("APP_VERSION", version);
    }

    if (localStorage.APP_VERSION != version) {
      setDefault(true, true, true);
    }
  }, []);

  return (
    <>
      {isFirstTimeUser && <Walkthrough />}
      <Router>
        <BackgroundsMemo backgrounds={backgrounds} />
        <div
          className={`fixed inset-0 overflow-auto ${
            breakStarted && "bg-blue-500 bg-opacity-40"
          }`}
        >
          <Toaster />
          <SideNav />
          <Routes>
            <Route path="/" element={<HomePage backgrounds={backgrounds} />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
