import React from "react";
import { Layout, Space } from "antd";
import { SettingOutlined } from "@ant-design/icons";

let { Header } = Layout;

let LayoutHeader: React.FC = () => {
    return (
        <Header className="flex-y-center px">
            <div className="flex-y-center">
                <img
                    src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                    className="block h-30px mr-2"
                />
                <div className="text-20px">React Vite template</div>
            </div>
            <div className="h-100% ml-a">
                <Space className="h-100%">
                    <SettingOutlined className="block text-20px cursor-pointer" />
                </Space>
            </div>
        </Header>
    );
};

export default LayoutHeader;
