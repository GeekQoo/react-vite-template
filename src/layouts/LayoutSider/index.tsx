import React, { useState } from "react";
import { Layout } from "antd";
import { LayoutSiderMenu } from "./components";
import { useThemeStore } from "@/store";

let { Sider } = Layout;

let LayoutSider: React.FC = () => {
    let { currentTheme } = useThemeStore();

    let [collapsed, setCollapsed] = useState(false);

    let toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Sider
            trigger={null}
            collapsed={collapsed}
            collapsible
            className="shadow-lg"
            theme={currentTheme === "darkAlgorithm" ? "dark" : "light"}
        >
            <LayoutSiderMenu collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
        </Sider>
    );
};

export default LayoutSider;
