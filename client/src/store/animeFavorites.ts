import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { AnimeFavoriteDB, Datatypes } from "../types";

interface AnimeFavoritesState {
  animesFavorites: AnimeFavoriteDB[] | null;
  pushAnimeFavorite: (anime: AnimeFavoriteDB | AnimeFavoriteDB[]) => void;
  deleteAnimeFavorite: (anime?: AnimeFavoriteDB) => void;
}

export const useAnimeFavoritesStore = create<AnimeFavoritesState>()(
  persist(
    (set, get) => ({
      animesFavorites: null,
      deleteAnimeFavorite: (anime) => {
        if (anime === undefined) {
          set({ animesFavorites: null });
        } else {
          // Obten la lista actual de animes favoritos
          const currentFavorites = get().animesFavorites;

          if (currentFavorites) {
            // Filtra la lista para excluir el anime a eliminar
            const newFavorites = currentFavorites.filter(
              (el) => el.mal_id !== anime.mal_id
            );

            // Actualiza el estado con la nueva lista de favoritos
            if (newFavorites.length === 0) {
              set({ animesFavorites: null });
            } else {
              set({ animesFavorites: newFavorites });
            }
          }
        }
      },
      pushAnimeFavorite: (anime) => {
        if (Array.isArray(anime)) {
          set({ animesFavorites: anime });
        } else if (!Array.isArray(anime)) {
          set({ animesFavorites: get().animesFavorites?.concat(anime) });
        }
      },
    }),
    {
      name: Datatypes.AnimeFavorites,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
