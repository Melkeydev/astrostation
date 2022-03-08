import {
  BrowserRouter as Router,
  Routes,
  Route,
  //Link,
  //useParams,
} from "react-router-dom";
import { Backgrounds } from "./components/Backgrounds/utils";
import { HomePage } from "./pages/Homepage";
import { SideNav } from "./components/Nav/SideNav";

enum backgrounds {
  CITY,
  STARS,
  SPACE,
}

// This needs to handle my sidebar, and my background changes
function App() {
  return (
    <Router>
      <Backgrounds backgrounds={backgrounds} />
      <div className="fixed inset-0 overflow-auto">
        <SideNav />
        <Routes>
          <Route path="/" element={<HomePage backgrounds={backgrounds} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
