import "../styles/Header.css";
import themeFN from "../helpers/themefn";
import toCapitalCase from "../helpers/toCapitalCase";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="header">
      <h1
        className="header__title"
        onClick={() => {
          navigate("/");
        }}
      >
        Diario de Anime
      </h1>
      <button
        className="header__toggle"
        onClick={() => {
          const defaultTheme = themeFN();
          const btn = document.querySelector(
            ".header__toggle"
          ) as HTMLButtonElement;
          if (defaultTheme === "light") {
            btn.textContent = "Dark";
          } else {
            btn.textContent = "Light";
          }
        }}
      >
        {window.localStorage.getItem("theme")
          ? toCapitalCase(window.localStorage.getItem("theme") as string)
          : "Light"}
      </button>
    </header>
  );
}
