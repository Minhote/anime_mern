import "../styles/Card.css";
import axios, { isAxiosError } from "axios";
import { useAuthStore } from "../store/auth";
import { CharacterDataDB } from "../types";
import { toast } from "sonner";
import { useCharactersFavoritesStore } from "../store/charactersFavorites";
import { URLDBAPI } from "../api/url";

type CardCharactersProps = CharacterDataDB & { type: "show" | "search" };

const CardCharacter: React.FC<CardCharactersProps> = ({
  about,
  images,
  mal_id,
  name,
  nicknames,
  type,
}) => {
  const imageURL = images.jpg.image_url;
  const { userLogged } = useAuthStore();
  const { pushCharactersFavorites, deleteCharactersFavorites } =
    useCharactersFavoritesStore();

  return (
    <div className="cardCharacter">
      <picture className="cardCharacter__img-container">
        <img
          src={imageURL}
          alt={`Image of ${name}`}
          className="cardCharacter__img-container__img"
        />
      </picture>
      <h2 className="cardCharacter__title">{name}</h2>
      <button
        className="cardCharacter__btn"
        onClick={async () => {
          if (type === "search") {
            // Lógica para agregar
            const obj = {
              about,
              images,
              mal_id,
              name,
              nicknames,
              usersId: [{ id: userLogged._id }],
            };

            try {
              const {
                data,
              }: {
                data:
                  | { message: string }
                  | { message: string; result: CharacterDataDB };
              } = await axios.post(`${URLDBAPI}/characters`, {
                obj,
                userId: userLogged._id,
              });

              if (data && "result" in data) {
                toast.success(data.message);
                pushCharactersFavorites(data.result);
              } else {
                toast.error(data.message);
              }
            } catch (error) {
              if (isAxiosError(error)) {
                toast.error(error.response?.data.message);
              }
            }
          } else {
            //Lógica para borrar

            const { data } = await axios.delete(`${URLDBAPI}/characters`, {
              params: { mal_id, userId: userLogged._id },
            });

            toast.success(data.message);
            deleteCharactersFavorites(mal_id);
          }
        }}
      >
        {type === "search" ? "Agregar" : "Remover"}
      </button>
    </div>
  );
};

export default CardCharacter;
