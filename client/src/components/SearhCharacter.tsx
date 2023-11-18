import "../styles/Forms.css";
import { useEffect, useState } from "react";
import fetchAnime from "../helpers/fetchAnime";
import { useDebounce } from "usehooks-ts";
import { AxiosResponse } from "axios";
import { CharacterData, CharacterDataDB } from "../types";
import { CardCharacter } from ".";
import { URLSEARCHCHARACTER } from "../api/url";

const SearchCharacter = () => {
  const [dataSearch, setDataSearch] = useState("");
  const debounceValue = useDebounce(dataSearch, 500);
  const [muestra, setMuestra] = useState([{}] as CharacterDataDB[]);

  useEffect(() => {
    const fetch = async () => {
      if (debounceValue !== "") {
        const resp: AxiosResponse = await fetchAnime(
          URLSEARCHCHARACTER,
          debounceValue
        );
        const { data }: { data: CharacterData[] } = resp;
        const dataReduced: CharacterDataDB[] = data.reduce(
          (prev: CharacterDataDB[], acc: CharacterData): CharacterDataDB[] => {
            const { mal_id, name, nicknames, about, favorites, images } = acc;
            const accdb = {
              mal_id,
              name,
              nicknames,
              about,
              favorites,
              images,
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
      setMuestra([{}] as CharacterDataDB[]);
    }
  }, [dataSearch]);

  return (
    <>
      <form className="searchForm">
        <label htmlFor="search" className="searchForm__label">
          Buscar Personaje
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
      {debounceValue !== "" && muestra[0].name !== undefined && (
        <div className="searchShow">
          {muestra.map((el) => {
            return <CardCharacter key={el.mal_id} {...el} type="search" />;
          })}
        </div>
      )}
      {dataSearch !== "" && muestra[0].name === undefined && (
        <div className="searchShowLoading">
          <div className="spinner__wrapper">
            <div className="spinner"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchCharacter;
