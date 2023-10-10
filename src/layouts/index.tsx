import React from "react";
import { ConfigProvider, Layout } from "antd";
import LayoutHeader from "./LayoutHeader";
import LayoutSider from "./LayoutSider";
import LayoutContent from "./LayoutContent";

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
