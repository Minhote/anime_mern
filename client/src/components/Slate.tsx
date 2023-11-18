import React from "react";
import "../styles/Slate.css";
import { AnimeFavorites, AnimeForWatch, CharactersFavorites } from ".";
import { Datatypes } from "../types";

function handleClick(e: React.MouseEvent<HTMLLIElement>) {
  const ul = document.querySelector(".slate__list") as HTMLUListElement;
  const listItems = ul.querySelectorAll(".slate__list__item");
  listItems.forEach((element) => {
    if (element.getAttribute("data-view") != e.currentTarget.dataset.view) {
      element.classList.remove("active");
    } else {
      element.classList.add("active");
    }
  });

  const div = document.querySelector(".slate__information") as HTMLDivElement;
  const divsItems = div.querySelectorAll(".slate__information__item");
  divsItems.forEach((element) => {
    if (element.getAttribute("data-view") != e.currentTarget.dataset.view) {
      element.classList.remove("active");
    } else {
      element.classList.add("active");
    }
  });
}

export default function Slate() {
  return (
    <div className="slate">
      <ul className="slate__list">
        <li
          className="slate__list__item active"
          data-view={Datatypes.AnimeFavorites}
          onClick={handleClick}
        >
          Animes Favoritos
        </li>
        <li
          className="slate__list__item"
          data-view={Datatypes.AnimeForWatch}
          onClick={handleClick}
        >
          Animes por Ver
        </li>
        <li
          className="slate__list__item"
          data-view={Datatypes.CharactersFavorites}
          onClick={handleClick}
        >
          Personajes Favoritos
        </li>
      </ul>
      <div className="slate__information">
        <AnimeFavorites />
        <AnimeForWatch />
        <CharactersFavorites />
      </div>
    </div>
  );
}
