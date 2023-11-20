import { useEffect, useState } from "react";
import { CardCharacter, SearchCharacter } from ".";
import "../styles/Slate.css";
import { useAuthStore } from "../store/auth";
import axios, { isAxiosError } from "axios";
import { useCharactersFavoritesStore } from "../store/charactersFavorites";
import { URLDBAPI } from "../api/url";

export default function CharactersFavorites() {
  const [isLoading, setIsLoading] = useState(false);
  const { userLogged } = useAuthStore();
  const { charactersFavorites, pushCharactersFavorites } =
    useCharactersFavoritesStore();
  useEffect(() => {
    async function getCharactersFavorites() {
      setIsLoading((v) => !v);
      const resp = await axios.get(`${URLDBAPI}/characters`, {
        params: { id: userLogged._id },
      });

      return resp;
    }

    async function fetchCharactersFavorites() {
      try {
        const { data } = await getCharactersFavorites();
        if (data) {
          pushCharactersFavorites(data.result);
        }
        setIsLoading((v) => !v);
      } catch (error) {
        if (isAxiosError(error)) {
          console.log("Error de manejo de petición");
        }
      }
    }

    fetchCharactersFavorites();
  }, []);

  return (
    <>
      <div className="slate__information__item " data-view="character-fav">
        <SearchCharacter />
        <div
          className="slate__information__item__content"
          data-content="character"
        >
          {isLoading && "Cargando..."}
          {!isLoading &&
            (charactersFavorites === null ||
              charactersFavorites.length === 0) &&
            "No tienes personajes favoritos guardados"}
          {!isLoading &&
            charactersFavorites &&
            charactersFavorites.map((el) => (
              <CardCharacter key={el.mal_id} {...el} type="show" />
            ))}
        </div>
      </div>
    </>
  );
}
