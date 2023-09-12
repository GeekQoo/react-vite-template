import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { ConfigProvider, Layout, Spin } from "antd";
import LayoutHeader from "./LayoutHeader.tsx";
import LayoutSider from "./LayoutSider.tsx";

let { Content } = Layout;

let BasicLayout: React.FC = () => {
    return (
        <div>
            <ConfigProvider
                theme={{
                    token: {},
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
                <Layout className="h-100vh">
                    <LayoutHeader />
                    <Layout>
                        <LayoutSider />
                        <Content>
                            <div className="wh-100% p-4 overflow-y-auto">
                                <Suspense fallback={<Spin size="large" className="wh-100% flex-center" />}>
                                    <Outlet />
                                </Suspense>
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </ConfigProvider>
        </div>
    );
};

export default BasicLayout;
