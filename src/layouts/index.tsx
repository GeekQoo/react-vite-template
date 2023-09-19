import React from "react";
import { ConfigProvider, Layout } from "antd";
import LayoutHeader from "./LayoutHeader.tsx";
import LayoutSider from "./LayoutSider.tsx";
import LayoutContent from "./LayoutContent.tsx";

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
                        <LayoutContent />
                    </Layout>
                </Layout>
            </ConfigProvider>
        </div>
    );
};

export default BasicLayout;
