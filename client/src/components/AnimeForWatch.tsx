import "../styles/Slate.css";
import { useEffect, useState } from "react";
import { CardAnime, SearchAnime } from ".";
import { AnimeFavoriteDB, Datatypes } from "../types";
import { useAuthStore } from "../store/auth";
import axios, { isAxiosError } from "axios";
import { useAnimeForWatchStore } from "../store/animesForWatch";

export default function AnimeForWatch() {
  const [isLoading, setIsLoading] = useState(false);
  const { animesForWatch, pushAnimeForWatch } = useAnimeForWatchStore();
  const { userLogged } = useAuthStore();

  useEffect(() => {
    async function getAnimeForWatch(id: string) {
      setIsLoading((v) => !v);
      const resp = await axios.get("http://localhost:3000/animes/to-watch", {
        params: { id },
      });

      return resp;
    }

    async function fetchAnimeForWatch() {
      try {
        const {
          data,
        }: { data: { message: string; result: AnimeFavoriteDB[] | null } } =
          await getAnimeForWatch(userLogged._id);
        pushAnimeForWatch(data.result);
        setIsLoading((v) => !v);
      } catch (error) {
        if (isAxiosError(error)) {
          console.log(`Error de peticion: ${error}`);
        } else {
          console.log(`Error ajeno a la petición: ${error}`);
        }
      }
    }

    fetchAnimeForWatch();
  }, []);

  return (
    <>
      <div className="slate__information__item " data-view="anime-for-watch">
        <SearchAnime topic={Datatypes.AnimeForWatch} />
        <div className="slate__information__item__content">
          {isLoading && "Cargando..."}
          {!isLoading &&
            animesForWatch !== null &&
            animesForWatch.map((anime) => (
              <CardAnime key={anime.mal_id} type="show" {...anime} />
            ))}
          {!isLoading &&
            animesForWatch === null &&
            "No tienes animes por ver agregados"}
        </div>
      </div>
    </>
  );
}
