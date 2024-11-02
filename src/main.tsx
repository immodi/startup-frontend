import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App.tsx";
import "./index.css";
import LandingPage from "./components/util/Landing.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        {/* <App /> */}
        <LandingPage />
    </StrictMode>,
);
