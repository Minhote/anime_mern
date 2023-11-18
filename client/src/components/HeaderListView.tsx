import "../styles/Header.css";
import themeFN from "../helpers/themefn";
import toCapitalCase from "../helpers/toCapitalCase";
import { useLocation } from "react-router-dom";
import Cookie from "js-cookie";
import { useAuthStore } from "../store/auth";
import { User } from "../types";
import { useAnimeFavoritesStore } from "../store/animeFavorites";
import { useAnimeForWatchStore } from "../store/animesForWatch";
import { useCharactersFavoritesStore } from "../store/charactersFavorites";

export default function HeaderListView() {
  const { setAuthOut } = useAuthStore();
  const { deleteAnimeForWatch } = useAnimeForWatchStore();
  const { deleteAnimeFavorite } = useAnimeFavoritesStore();
  const { deleteCharactersFavorites } = useCharactersFavoritesStore();
  const {
    state: { name, _id },
  }: { state: User } = useLocation();

  return (
    <header className="header authenticated">
      <h1 className="header__title">Bienvenido {name}</h1>
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
      <button
        className="header__sign_out"
        onClick={() => {
          Cookie.remove(`userToken_${_id}`);
          setAuthOut();
          deleteAnimeForWatch();
          deleteAnimeFavorite();
          deleteCharactersFavorites();
        }}
      >
        Sign Out
      </button>
    </header>
  );
}
