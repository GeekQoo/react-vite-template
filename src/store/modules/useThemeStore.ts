import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { defaultThemeConfig } from "@/setttings/theme.ts";

interface StateProps {
    globalLoading: boolean;
    currentTheme: string;
    pageAnimation: string;
    themeColor: string;
    setGlobalLoading: (value: boolean) => void;
    setCurrentTheme: (value: string) => void;
    setPageAnimation: (value: string) => void;
    setThemeColor: (value: string) => void;
}

let useAuthStore = create<StateProps>()(
    persist(
        (set) => ({
            globalLoading: false,
            currentTheme: defaultThemeConfig.currentTheme,
            pageAnimation: defaultThemeConfig.pageAnimation,
            themeColor: defaultThemeConfig.themeColor,
            setGlobalLoading: (value?: boolean) => {
                set(() => ({ globalLoading: value }));
            },
            setCurrentTheme(value: string) {
                set(() => ({ currentTheme: value }));
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
                        ["globalLoading", "currentTheme", "pageAnimation", "themeColor"].includes(key)
                    )
                );
            },
            storage: createJSONStorage(() => localStorage)
        }
    )
);

export default useAuthStore;
