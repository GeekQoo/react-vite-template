import React from "react";
import { App, ConfigProvider, Layout, theme } from "antd";
import LayoutHeader from "./LayoutHeader";
import LayoutSider from "./LayoutSider";
import LayoutContent from "./LayoutContent";
import zhCN from "antd/locale/zh_CN";
import { useThemeStore } from "@/store";

let MyLayout: React.FC = () => {
    return (
        <Layout className="h-100vh">
            <LayoutHeader />
            <Layout>
                <LayoutSider />
                <LayoutContent />
            </Layout>
        </Layout>
    );
};

let BasicLayout: React.FC = () => {
    let { themeColor, currentTheme } = useThemeStore();

    return (
        <div>
            <ConfigProvider
                locale={zhCN}
                theme={{
                    algorithm: theme[currentTheme as "defaultAlgorithm" | "darkAlgorithm" | "compactAlgorithm"],
                    token: {
                        colorPrimary: themeColor
                    },
                    components: {
                        Layout: {
                            headerColor: "#fff",
                            siderBg: "#fff"
                        },
                        Menu: {
                            activeBarBorderWidth: 0
                        }
                    }
                }}
            >
                <App>
                    <MyLayout />
                </App>
            </ConfigProvider>
        </div>
    );
};

export default BasicLayout;
