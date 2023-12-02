import React, { useEffect } from "react";
import { App, ConfigProvider, Layout, Result, Spin, theme } from "antd";
import LayoutHeader from "./LayoutHeader";
import LayoutSider from "./LayoutSider";
import LayoutContent from "./LayoutContent";
import zhCN from "antd/locale/zh_CN";
import { useAuthStore, useThemeStore } from "@/store";
import { GET_USERINFO } from "@/api/auth.ts";

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
    let { themeColor, currentTheme, borderRadius, globalLoading, setGlobalLoading } = useThemeStore();
    let { setUserData } = useAuthStore();

    let getUserData = () => {
        setGlobalLoading(true);
        GET_USERINFO<System.UserDataProps>({}).then((res) => {
            setUserData(res.data.data ?? {});
            setGlobalLoading(false);
        });
    };

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <div>
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
                    {globalLoading && (
                        <div className="fixed wh-100% top-0 left-0 bg-[#fff] z-9999">
                            <div className="wh-100% flex-center">
                                <Result icon={<Spin size="large" />} title="加载中" subTitle="先去喝杯茶吧" />
                            </div>
                        </div>
                    )}
                    <MyLayout />
                </App>
            </ConfigProvider>
        </div>
    );
};

export default BasicLayout;
