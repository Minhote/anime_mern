import "../styles/Card.css";
import axios, { isAxiosError } from "axios";
import { useAuthStore } from "../store/auth";
import { AnimeFavoriteDB } from "../types";
import { useAnimeFavoritesStore } from "../store/animeFavorites";
import { toast } from "sonner";
import { useAnimeForWatchStore } from "../store/animesForWatch";

type CardAnimeProps = AnimeFavoriteDB & { type: "search" | "show" };

const CardAnime: React.FC<CardAnimeProps> = ({
  mal_id,
  episodes,
  genres,
  images,
  title,
  type,
}) => {
  const { userLogged } = useAuthStore();
  const { pushAnimeFavorite, deleteAnimeFavorite } = useAnimeFavoritesStore();
  const { pushAnimeForWatch, deleteAnimeForWatch } = useAnimeForWatchStore();
  const imageURL = images.jpg.image_url;
  const genresNames = genres.map((el) => {
    const { mal_id, name } = el;
    return {
      mal_id,
      name,
    };
  });

  return (
    <div className="cardAnime">
      <picture className="cardAnime__img-container">
        <img src={imageURL} className="cardAnime__img-container__img" />
      </picture>
      <h2 className="cardAnime__title">{title}</h2>
      <p className="cardAnime__episodes">Episodes: {episodes}</p>
      <ul className="cardAnime__genre-list">
        {genresNames.map((el) => (
          <li className="cardAnime__genre-list__item" key={el.mal_id}>
            {el.name}
          </li>
        ))}
      </ul>
      <button
        className="cardAnime__btn"
        onClick={async () => {
          let div = document.querySelector(".slate__information__item.active");
          if (div) {
            let attr = div.getAttribute("data-view");
            if (attr?.includes("fav")) {
              // Lógica para ánimes favoritos
              let obj = {
                mal_id,
                title,
                usersId: [{ id: userLogged._id, favorite: "true" }],
                episodes,
                genres,
                images,
              };

              if (type === "search") {
                // Lógica para agregar
                try {
                  const {
                    data,
                  }: {
                    data:
                      | { message: string }
                      | { message: string; result: object };
                  } = await axios.post(
                    "http://localhost:3000/animes/favorites",
                    obj
                  );

                  // Luego de agregar favorito, actualiza el estado global
                  if ("result" in data) {
                    const res = await axios.get(
                      "http://localhost:3000/animes/favorites",
                      {
                        params: { id: userLogged._id },
                      }
                    );
                    pushAnimeFavorite(res.data.result);
                    toast.success(data.message);
                  } else {
                    toast.error(data.message);
                  }
                } catch (error) {
                  console.error("Error al agregar favorito:", error);
                }
              } else if (type === "show") {
                // Lógica para borrar
                try {
                  const {
                    data,
                  }: {
                    data:
                      | { message: string }
                      | { message: string; result: object };
                  } = await axios.delete(
                    `http://localhost:3000/animes/favorites`,
                    {
                      params: { mal_id, userid: userLogged._id },
                    }
                  );

                  deleteAnimeFavorite(obj);

                  if ("result" in data) {
                    toast.success(data.message);
                  } else {
                    toast.error(data.message);
                  }
                } catch (error) {
                  console.error("Error al eliminar favorito:", error);
                }
              }
            } else {
              // Lógica para ánimes por ver
              const obj = {
                mal_id,
                title,
                usersId: [{ id: userLogged._id, favorite: "false" }],
                episodes,
                genres,
                images,
              };

              if (type === "search") {
                const userObj = {
                  userId: userLogged._id,
                };
                try {
                  const {
                    data,
                  }: {
                    data:
                      | { message: string }
                      | { message: string; result: AnimeFavoriteDB };
                  } = await axios.post(
                    "http://localhost:3000/animes/to-watch",
                    { obj, userObj }
                  );

                  if ("result" in data) {
                    toast.success(data.message);
                    pushAnimeForWatch(data.result);
                  } else {
                    toast.error(data.message);
                  }
                } catch (error) {
                  if (isAxiosError(error)) console.log(error);
                }
              } else if (type === "show") {
                try {
                  const { data } = await axios.delete(
                    "http://localhost:3000/animes/to-watch",
                    {
                      params: {
                        id: mal_id,
                        userId: userLogged._id,
                      },
                    }
                  );

                  if (data) {
                    toast.success(data.message);
                    deleteAnimeForWatch(obj);
                  }
                } catch (error) {
                  if (isAxiosError(error)) console.log(error);
                }
              }
            }
          }
        }}
      >
        {type === "search" ? "Agregar" : "Remover"}
      </button>
    </div>
  );
};

export default CardAnime;
