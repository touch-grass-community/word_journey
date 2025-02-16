import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

//* import CSS
import "./assets/css/index.css";

//* import application component
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
