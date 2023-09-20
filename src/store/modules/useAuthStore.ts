import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface StateProps {
    token: string;
    setToken: (value?: string) => void;
    userData: App.UserDataProps;
    setUserData: (value?: App.UserDataProps) => void;
}

let useAuthStore = create<StateProps>()(
    persist(
        (set) => ({
            token: "",
            setToken: (value?: string) => {
                set(() => ({ token: value ?? "" }));
            },
            userData: {},
            setUserData: (value?: App.UserDataProps) => {
                set(() => ({ userData: value }));
            }
        }),
        {
            name: "auth",
            partialize: (state) => Object.fromEntries(Object.entries(state).filter(([key]) => ["token"].includes(key))),
            storage: createJSONStorage(() => localStorage)
        }
    )
);

export default useAuthStore;
