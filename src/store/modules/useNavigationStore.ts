import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { SysRouteProps } from "#/system";

interface StateProps {
    navigations: SysRouteProps[];
    setNavigations: (value: SysRouteProps[]) => void;
}

const useNavigationStore = create<StateProps>()(
    persist(
        (set) => ({
            navigations: [],
            setNavigations: (value: SysRouteProps[]) => {
                set(() => ({ navigations: value }));
            }
        }),
        {
            name: "navigation",
            partialize: (state) => {
                return Object.fromEntries(Object.entries(state).filter(([key]) => ["navigations"].includes(key)));
            },
            storage: createJSONStorage(() => localStorage)
        }
    )
);

export default useNavigationStore;
