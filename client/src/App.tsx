import {
  BrowserRouter as Router,
  Routes,
  Route,
  //Link,
  //useParams,
} from "react-router-dom";
import { useEffect } from "react";
import { Backgrounds } from "./components/Backgrounds/utils";
import { HomePage } from "./pages/Homepage";
import { SideNav } from "./components/Nav/SideNav";
import { useDarkToggleStore } from "./store";
import { DragDropContext } from "react-beautiful-dnd";

enum backgrounds {
  CITY,
  STARS,
  SPACE,
}

// This needs to handle my sidebar, and my background changes
function App() {
  const isDark = useDarkToggleStore((state) => state.isDark);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    document.addEventListener("contextmenu", (event) => {
      event.preventDefault();
    });
  }, []);

  const element = <HomePage backgrounds={backgrounds} />;

  return (
    <Router>
      <Backgrounds backgrounds={backgrounds} />
      <div className="fixed inset-0 overflow-auto">
        <SideNav />
        <Routes>
          <Route path="/" element={element} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
