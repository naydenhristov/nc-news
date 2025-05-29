import { BrowserRouter } from "react-router";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./components/App.jsx";
import { UserProvider } from "./contexts/User.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>
);
