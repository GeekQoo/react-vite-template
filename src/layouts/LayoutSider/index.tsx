import React, { useState } from "react";
import { Layout } from "antd";
import { LayoutSiderMenu } from "./components";
import { useThemeStore } from "@/store";

const { Sider } = Layout;

const LayoutSider: React.FC = () => {
    const { currentTheme } = useThemeStore();

    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {
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
