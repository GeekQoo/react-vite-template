import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { defaultThemeConfig } from "@/setttings/theme.ts";

interface StateProps {
    globalLoading: boolean;
    pageAnimation: string;
    themeColor: string;
    setGlobalLoading: (value: boolean) => void;
    setPageAnimation: (value: string) => void;
    setThemeColor: (value: string) => void;
}

let useAuthStore = create<StateProps>()(
    persist(
        (set) => ({
            globalLoading: false,
            pageAnimation: defaultThemeConfig.pageAnimation,
            themeColor: defaultThemeConfig.themeColor,
            setGlobalLoading: (value?: boolean) => {
                set(() => ({ globalLoading: value }));
            },
            setPageAnimation: (value?: string) => {
                set(() => ({ pageAnimation: value }));
            },
            setThemeColor: (value?: string) => {
                set(() => ({ themeColor: value }));
            }
        }),
        {
            name: "theme",
            partialize: (state) => {
                return Object.fromEntries(
                    Object.entries(state).filter(([key]) =>
                        ["globalLoading", "pageAnimation", "themeColor"].includes(key)
                    )
                );
            },
            storage: createJSONStorage(() => localStorage)
        }
    )
);

export default useAuthStore;
