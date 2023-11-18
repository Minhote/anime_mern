import "./styles/App.css";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoutes } from "./router";
import { ListView, WelcomeView, LogInView, SignUpView } from "./layouts";

function App() {
  useEffect(() => {
    const defaultTheme = window.localStorage.getItem("theme") ?? "light";
    const html = document.querySelector("html") as HTMLHtmlElement;
    html.setAttribute("data-theme", defaultTheme);
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomeView />} />
          <Route path="/login" element={<LogInView />} />
          <Route path="/signup" element={<SignUpView />} />
          <Route
            path="/diario"
            element={
              <ProtectedRoutes>
                <ListView />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
