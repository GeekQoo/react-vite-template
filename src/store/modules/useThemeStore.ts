import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface StateProps {
    globalLoading: boolean;
    setGlobalLoading: (value: boolean) => void;
}

let useAuthStore = create<StateProps>()(
    persist(
        (set) => ({
            globalLoading: false,
            setGlobalLoading: (value?: boolean) => {
                set(() => ({ globalLoading: value }));
            }
        }),
        {
            name: "theme",
            // partialize: (state) => Object.fromEntries(Object.entries(state).filter(([key]) => [""].includes(key))),
            storage: createJSONStorage(() => localStorage)
        }
    )
);

export default useAuthStore;
