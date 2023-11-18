import "../styles/Forms.css";
import { useEffect, useState } from "react";
import fetchAnime from "../helpers/fetchAnime";
import { useDebounce } from "usehooks-ts";
import { AxiosResponse } from "axios";
import { AnimeData, AnimeFavoriteDB, Datatypes } from "../types";
import { CardAnime } from ".";
import { URLSEARCHANIME } from "../api/url";

const SearchAnime = ({ topic }: { topic: string }) => {
  const [dataSearch, setDataSearch] = useState("");
  const debounceValue = useDebounce(dataSearch, 500);
  const [muestra, setMuestra] = useState([{}] as AnimeFavoriteDB[]);

  useEffect(() => {
    const fetch = async () => {
      if (debounceValue !== "") {
        const resp: AxiosResponse = await fetchAnime(
          URLSEARCHANIME,
          debounceValue
        );

        const { data }: { data: AnimeData[] } = resp;
        const dataReduced: AnimeFavoriteDB[] = data.reduce(
          (prev: AnimeFavoriteDB[], acc: AnimeData): AnimeFavoriteDB[] => {
            const { title, episodes, genres, images, mal_id } = acc;

            if (
              topic === Datatypes.AnimeFavorites &&
              acc.status.includes("Not yet")
            ) {
              return [...prev];
            }

            const accdb = {
              mal_id,
              images,
              title,
              episodes,
              genres,
            };

            return [...prev, accdb];
          },
          []
        );
        setMuestra(dataReduced);
      }
    };

    fetch();
  }, [debounceValue]);

  useEffect(() => {
    if (dataSearch === "") {
      setMuestra([{}] as AnimeFavoriteDB[]);
    }
  }, [dataSearch]);

  return (
    <>
      <form className="searchForm">
        <label htmlFor="search" className="searchForm__label">
          Buscar Anime
        </label>
        <input
          type="text"
          id="search"
          className="searchForm__input"
          value={dataSearch}
          onChange={(e) => {
            setDataSearch(e.target.value);
          }}
        />
      </form>
      {debounceValue !== "" && muestra[0].title !== undefined && (
        <div className="searchShow">
          {muestra.map((el) => (
            <CardAnime key={el.mal_id} {...el} type="search" />
          ))}
        </div>
      )}
      {dataSearch !== "" && muestra[0].title === undefined && (
        <div className="searchShowLoading">
          <div className="spinner__wrapper">
            <div className="spinner"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchAnime;
