import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { UserDataProps } from "#/permission";
import { useNavigate } from "react-router-dom";

interface StateProps {
    token: string;
    setToken: (value?: string) => void;
    userData: Partial<UserDataProps>;
    setUserData: (value?: UserDataProps) => void;
    logout: () => void;
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
            },
            logout: () => {
                set(() => ({ token: "", userData: {} }));
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
