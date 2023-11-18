import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { AnimeFavoriteDB, Datatypes } from "../types";

interface AnimeForWatchState {
  animesForWatch: AnimeFavoriteDB[] | null;
  pushAnimeForWatch: (
    anime: AnimeFavoriteDB | AnimeFavoriteDB[] | null
  ) => void;
  deleteAnimeForWatch: (anime?: AnimeFavoriteDB) => void;
}

export const useAnimeForWatchStore = create<AnimeForWatchState>()(
  persist(
    (set, get) => ({
      animesForWatch: null,
      deleteAnimeForWatch: (anime) => {
        if (anime === undefined) {
          set({ animesForWatch: null });
        } else {
          // Obten la lista actual de animes favoritos
          const currentForWatch = get().animesForWatch;

          if (currentForWatch) {
            // Filtra la lista para excluir el anime a eliminar
            const newForWatch = currentForWatch.filter(
              (el) => el.mal_id !== anime.mal_id
            );

            // Actualiza el estado con la nueva lista de favoritos
            if (newForWatch.length === 0) {
              set({ animesForWatch: null });
            } else {
              set({ animesForWatch: newForWatch });
            }
          }
        }
      },
      pushAnimeForWatch: (
        anime: AnimeFavoriteDB | AnimeFavoriteDB[] | null
      ) => {
        if (anime === null) {
          set({ animesForWatch: null });
        } else if (!Array.isArray(anime)) {
          if (get().animesForWatch === null) {
            set({ animesForWatch: [anime] });
          } else {
            set({ animesForWatch: get().animesForWatch?.concat(anime) });
          }
        } else {
          set({ animesForWatch: anime });
        }
      },
    }),
    {
      name: Datatypes.AnimeForWatch,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
