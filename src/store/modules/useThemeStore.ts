import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { defaultThemeConfig } from "@/settings/theme.ts";

interface StateProps {
    globalLoading: boolean; // 全局loading
    currentTheme: string; // 当前主题
    pageAnimation: string; // 页面切换动画
    themeColor: string; // 主题颜色
    borderRadius: number; // 圆角
    setGlobalLoading: (value: boolean) => void;
    setCurrentTheme: (value: string) => void;
    setPageAnimation: (value: string) => void;
    setThemeColor: (value: string) => void;
    setBorderRadius: (value: number) => void;
}

let useAuthStore = create<StateProps>()(
    persist(
        (set) => ({
            globalLoading: false,
            currentTheme: defaultThemeConfig.currentTheme,
            pageAnimation: defaultThemeConfig.pageAnimation,
            themeColor: defaultThemeConfig.themeColor,
            borderRadius: defaultThemeConfig.borderRadius,
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
            },
            setBorderRadius: (value?: number) => {
                set(() => ({ borderRadius: value }));
            }
        }),
        {
            name: "theme",
            partialize: (state) => {
                return Object.fromEntries(
                    Object.entries(state).filter(([key]) =>
                        ["globalLoading", "currentTheme", "pageAnimation", "themeColor", "borderRadius"].includes(key)
                    )
                );
            },
            storage: createJSONStorage(() => localStorage)
        }
    )
);

export default useAuthStore;
