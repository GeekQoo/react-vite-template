import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { defaultThemeConfig } from "@/setttings/theme.ts";

interface StateProps {
    globalLoading: boolean;
    pageAnimation: string;
    setGlobalLoading: (value: boolean) => void;
    setPageAnimation: (value: string) => void;
}

let useAuthStore = create<StateProps>()(
    persist(
        (set) => ({
            globalLoading: false,
            pageAnimation: defaultThemeConfig.pageAnimation,
            setGlobalLoading: (value?: boolean) => {
                set(() => ({ globalLoading: value }));
            },
            setPageAnimation: (value?: string) => {
                set(() => ({ pageAnimation: value }));
            }
        }),
        {
            name: "theme",
            partialize: (state) => {
                return Object.fromEntries(
                    Object.entries(state).filter(([key]) => ["globalLoading", "pageAnimation"].includes(key))
                );
            },
            storage: createJSONStorage(() => localStorage)
        }
    )
);

export default useAuthStore;
