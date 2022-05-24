import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { Backgrounds } from "@Components/Backgrounds/utils";
import { HomePage } from "@Pages/Homepage";
import { SideNav } from "@Components/Nav/SideNav";
import { useDarkToggleStore } from "@Store";
import { Toaster } from "react-hot-toast";
import { version } from "../package.json";

import useSetDefault from "@App/utils/hooks/useSetDefault";

enum backgrounds {
  STARS,
  CITY,
  DOTS,
  SNOW,
  FADE,
  GRADIENT,
}

function App() {
  const isDark = useDarkToggleStore((state) => state.isDark);
  const setDefault = useSetDefault();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
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
    <Router>
      <Backgrounds backgrounds={backgrounds} />
      <div className="fixed inset-0 overflow-auto">
        <Toaster />
        <SideNav />
        <Routes>
          <Route path="/" element={<HomePage backgrounds={backgrounds} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
