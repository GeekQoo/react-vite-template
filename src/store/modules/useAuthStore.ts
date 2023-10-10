import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface StateProps {
    token: string;
    setToken: (value?: string) => void;
    userData: System.UserDataProps;
    setUserData: (value?: System.UserDataProps) => void;
}

let useAuthStore = create<StateProps>()(
    persist(
        (set) => ({
            token: "",
            userData: {},
            setToken: (value?: string) => {
                set(() => ({ token: value ?? "" }));
            },
            setUserData: (value?: System.UserDataProps) => {
                set(() => ({ userData: value }));
            }
        }),
        {
            name: "auth",
            partialize: (state) => {
                return Object.fromEntries(Object.entries(state).filter(([key]) => ["token"].includes(key)));
            },
            storage: createJSONStorage(() => localStorage)
        }
    )
);

export default useAuthStore;
