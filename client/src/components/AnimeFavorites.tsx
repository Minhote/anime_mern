import "../styles/Slate.css";
import { useEffect, useState } from "react";
import { CardAnime, SearchAnime } from ".";
import { AnimeFavoriteDB, Datatypes } from "../types";
import axios, { isAxiosError } from "axios";
import { useAuthStore } from "../store/auth";
import { useAnimeFavoritesStore } from "../store/animeFavorites";

export default function AnimeFavorites() {
  const [isLoading, setIsLoading] = useState(false);
  const { userLogged } = useAuthStore();
  const { animesFavorites, pushAnimeFavorite } = useAnimeFavoritesStore();
  // Toda la funcionalidad del front y back esta en orden, estaria de mejorar el tema de la rerenderizacion innecesaria, si es posible solucionar eso y el projecto quedaría de 10

  useEffect(() => {
    async function getAnimeFavorites() {
      setIsLoading((v) => !v);
      const resp = await axios.get("http://localhost:3000/animes/favorites", {
        params: { id: userLogged._id },
      });

      return resp;
    }

    async function fetchAnimeFavorites() {
      try {
        const { data } = await getAnimeFavorites();
        if (data.result) {
          pushAnimeFavorite(data.result);
        }
        setIsLoading((v) => !v);
      } catch (error) {
        if (isAxiosError(error)) console.log(error);
      }
    }

    fetchAnimeFavorites();
  }, []);

  console.log(animesFavorites, "Render");

  return (
    <>
      <div className="slate__information__item active" data-view="anime-fav">
        <SearchAnime topic={Datatypes.AnimeFavorites} />
        <div className="slate__information__item__content">
          {isLoading && "Cargando...."}
          {!isLoading &&
            animesFavorites !== null &&
            animesFavorites.map((el: AnimeFavoriteDB) => (
              <CardAnime key={el.mal_id} {...el} type="show" />
            ))}
          {!isLoading &&
            animesFavorites === null &&
            "No tienes animes favoritos agregados"}
        </div>
      </div>
    </>
  );
}
