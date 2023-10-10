import React from "react";
import { Layout } from "antd";
import { LayoutSiderMenu } from "./components";

let { Sider } = Layout;

let LayoutSider: React.FC = () => {
    return (
        <Sider className="shadow-lg">
            <LayoutSiderMenu />
        </Sider>
    );
};

export default LayoutSider;
