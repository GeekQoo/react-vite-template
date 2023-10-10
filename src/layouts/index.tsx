import React from "react";
import { App, ConfigProvider, Layout } from "antd";
import LayoutHeader from "./LayoutHeader";
import LayoutSider from "./LayoutSider";
import LayoutContent from "./LayoutContent";

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
                <App>
                    <MyLayout />
                </App>
            </ConfigProvider>
        </div>
    );
};

export default BasicLayout;
