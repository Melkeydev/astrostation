import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { Backgrounds } from "@Components/Backgrounds/utils";
import { HomePage } from "@Pages/Homepage";
import { SideNav } from "@Components/Nav/SideNav";
import { useDarkToggleStore, useFirstTimeUserStore, useLoggedIn } from "@Store";
import { Toaster } from "react-hot-toast";
import { version } from "@Root/package.json";
import { Walkthrough } from "@Components/Walkthrough/Walkthrough";
import { checkToken } from "@Actions/user";
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
  const [hasCheckedLoginState, setHasCheckedLoginState] = useState(false);
  const { setIsLoggedIn } = useLoggedIn();

  const initialTokenCheck = async () => {
    try {
      if (await checkToken()) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (e) {
      setIsLoggedIn(false);
    }
    setHasCheckedLoginState(true);
  };

  useEffect(() => {
    initialTokenCheck();
  }, []);

  const isDark = useDarkToggleStore((state) => state.isDark);
  const { isFirstTimeUser } = useFirstTimeUserStore();

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
    <>
      {isFirstTimeUser && <Walkthrough />}
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
    </>
  );
}

export default App;
