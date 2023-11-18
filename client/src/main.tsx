import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <React.StrictMode>
      <Toaster position="top-right" richColors />
      <App />
    </React.StrictMode>
  </>
);
