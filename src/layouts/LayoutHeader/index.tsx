import React from "react";
import { Layout, Space } from "antd";
import { LayoutHeaderSettings, LayoutHeaderCurrentUser } from "./components";

const { Header } = Layout;

const LayoutHeader: React.FC = () => {
    return (
        <Header className="flex-y-center px">
            <div className="flex-y-center">
                <img
                    src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                    className="block h-30px mr-2"
                    alt="logo"
                />
                <div className="text-20px">React Vite template</div>
            </div>
            <div className="flex-y-center ml-a">
                <Space size="middle" className="h-100%">
                    <LayoutHeaderSettings />
                    <LayoutHeaderCurrentUser />
                </Space>
            </div>
        </Header>
    );
};

export default LayoutHeader;
