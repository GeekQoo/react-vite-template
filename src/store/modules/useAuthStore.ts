import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { UserDataProps } from "#/permission.ts";

interface StateProps {
    token: string;
    setToken: (value?: string) => void;
    userData: UserDataProps;
    setUserData: (value?: UserDataProps) => void;
}

let useAuthStore = create<StateProps>()(
    persist(
        (set) => ({
            token: "",
            userData: {},
            setToken: (value?: string) => {
                set(() => ({ token: value ?? "" }));
            },
            setUserData: (value?: UserDataProps) => {
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
