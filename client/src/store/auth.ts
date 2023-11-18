import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "../types";

interface userObject {
  name: string;
  password: string;
  _id: string;
  email: string;
}

interface authState {
  authenticated: boolean;
  setAuthIn: (user: User) => void;
  setAuthOut: () => void;
  userLogged: userObject;
}

export const useAuthStore = create<authState>()(
  persist(
    (set, get) => ({
      authenticated: false,
      setAuthIn: (user: User) =>
        set({ authenticated: !get().authenticated, userLogged: user }),
      setAuthOut: () =>
        set({
          authenticated: !get().authenticated,
          userLogged: {} as userObject,
        }),
      userLogged: {} as userObject,
    }),
    { name: "auth", storage: createJSONStorage(() => sessionStorage) }
  )
);
