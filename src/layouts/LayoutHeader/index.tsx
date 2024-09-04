import React from "react";
import { Divider, Layout, Space, theme } from "antd";
import { LayoutHeaderSettings, LayoutHeaderCurrentUser } from "./components";
import { LayoutNavigation } from "@/layouts/components";

const { Header } = Layout;

const LayoutHeader: React.FC = () => {
    const { token } = theme.useToken();

    return (
        <Header
            className="px shadow-md h-auto"
            style={{
                background: token.colorBgContainer
            }}
        >
            <div className="flex-y-center">
                <div className="flex-y-center">
                    <img
                        src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                        className="block h-30px mr-2"
                        alt="logo"
                    />
                    <div
                        className="text-20px"
                        style={{
                            color: token.colorTextBase
                        }}
                    >
                        React Vite template
                    </div>
                </div>
                <div className="flex-y-center ml-a">
                    <Space size="middle" className="h-100%">
                        <LayoutHeaderSettings />
                        <LayoutHeaderCurrentUser />
                    </Space>
                </div>
            </div>
            <Divider className="m-0" />
            <LayoutNavigation />
        </Header>
    );
};

export default LayoutHeader;
