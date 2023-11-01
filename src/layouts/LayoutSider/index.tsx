import React from "react";
import { Layout } from "antd";
import { LayoutSiderMenu } from "./components";
import { useThemeStore } from "@/store";

let { Sider } = Layout;

let LayoutSider: React.FC = () => {
    let { currentTheme } = useThemeStore();

    return (
        <Sider className="shadow-lg" theme={currentTheme === "darkAlgorithm" ? "dark" : "light"}>
            <LayoutSiderMenu />
        </Sider>
    );
};

export default LayoutSider;
