import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import zhCN from "antd/locale/zh_CN";
import { App, ConfigProvider, theme } from "antd";
import { useThemeStore } from "@/store";
import { routes } from "@/router";

let MyApp: React.FC = () => {
    let { themeColor, currentTheme, borderRadius } = useThemeStore();

    return (
        <ConfigProvider
            locale={zhCN}
            theme={{
                algorithm: theme[currentTheme as "defaultAlgorithm" | "darkAlgorithm" | "compactAlgorithm"],
                token: {
                    colorPrimary: themeColor,
                    borderRadius: borderRadius
                },
                components: {
                    Layout: {
                        headerColor: "#fff"
                    },
                    Menu: {
                        activeBarBorderWidth: 0
                    }
                }
            }}
        >
            <App>
                <RouterProvider router={createBrowserRouter(routes)} />
            </App>
        </ConfigProvider>
    );
};

export default MyApp;
