import { create } from "zustand";
import { CharacterDataDB, Datatypes } from "../types";
import { createJSONStorage, persist } from "zustand/middleware";

// Pendiente establecer estado global para personajes favoritos y configurar las rutas y manejar los estados de la vista del componete de charactar favorites y el onclick de la carta , Vamos que es casi lo mismo practicamente ya esta hecho todo solo guiandote del código ya escrito

interface CharactersFavoritesState {
  charactersFavorites: CharacterDataDB[] | null;
  pushCharactersFavorites: (
    character: CharacterDataDB | CharacterDataDB[] | null
  ) => void;
  deleteCharactersFavorites: (id?: number) => void;
}

export const useCharactersFavoritesStore = create<CharactersFavoritesState>()(
  persist(
    (set, get) => ({
      charactersFavorites: null,
      pushCharactersFavorites: (character) => {
        if (character === null) {
          set({ charactersFavorites: null });
        } else if (Array.isArray(character)) {
          set({ charactersFavorites: character });
        } else if (!Array.isArray(character)) {
          set({
            charactersFavorites: get().charactersFavorites?.concat(character),
          });
        }
      },
      deleteCharactersFavorites: (id) => {
        if (id === undefined) {
          set({ charactersFavorites: null });
        } else {
          // Obten la lista actual de personajes favoritos
          const currentCharacters = get().charactersFavorites;

          if (currentCharacters) {
            // Filtra la lista para excluir el personaje a eliminar
            const newCharacters = currentCharacters.filter(
              (el) => el.mal_id !== id
            );

            // Actualiza el estado con la nueva lista de personajes
            set({ charactersFavorites: newCharacters });
          }
        }
      },
    }),
    {
      name: Datatypes.CharactersFavorites,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
