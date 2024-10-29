import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import 'rc-notification/assets/index.css'
import "./index.css";
import "./lib/config/cssVariables.css";

const rootNode = document.getElementById("root");

if (!rootNode) {
  throw new Error("Root node not found");
}

createRoot(rootNode).render(
  <StrictMode>
    <App />
  </StrictMode>
);
