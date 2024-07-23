// import { create } from "zustand";
// interface TokenState {
//   token: string | null;
//   userType: any;
//   name: any;
//   setToken: (token: string, userType: any, name: any) => void;
//   clearToken: () => void;
// }

// const useTokenStore = create<TokenState>((set) => ({
//   token: localStorage.getItem("token") || null,
//   name: localStorage.getItem("name") || null,
//   userType: localStorage.getItem("userType") || null,
//   setToken: (token: string, userType: any, name: any) => {
//     localStorage.setItem("token", token);
//     localStorage.setItem("userType", userType);
//     localStorage.setItem("name", name);
//     set({ token, userType, name });
//   },
//   clearToken: () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userType");
//     set({ token: null, userType: null });
//   },
// }));

// export default useTokenStore;

import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserType = "admin" | "customer" | null;

interface TokenState {
  token: string | null;
  userType: UserType;
  name: any;
  setToken: (token: string, userType: UserType, name: any) => void;
  clearToken: () => void;
}

const useTokenStore = create<TokenState>()(
  persist(
    (set) => ({
      token: null,
      userType: null,
      name: null,
      setToken: (token: string, userType: UserType, name: any) =>
        set({ token, userType, name }),
      clearToken: () => set({ token: null }),
    }),
    {
      name: "token-storage", // name of the item in localStorage
      getStorage: () => localStorage, // use localStorage
    }
  )
);

export default useTokenStore;
