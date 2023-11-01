import React from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store";
import { HomeOutlined, TeamOutlined } from "@ant-design/icons";

let LayoutSiderMenu: React.FC = () => {
    type MenuItem = Required<MenuProps>["items"][number];

    let navigate = useNavigate();
    let { pathname } = useLocation();
    let { userData } = useAuthStore();

    let icons: Record<string, React.ReactNode> = {
        HomeOutlined: <HomeOutlined />,
        TeamOutlined: <TeamOutlined />
    };

    let getItem = (
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
        type?: "group"
    ): MenuItem => {
        return { key, icon, children, label, type };
    };

    let items = (): MenuItem[] => {
        return (userData?.menu ?? []).map((i) => getItem(i.label, i.key, icons[i.icon], i.children));
    };

    let onMenuClick: MenuProps["onClick"] = ({ key }) => {
        navigate(key);
    };

    let renderOpenKeys = () => {
        let arr = pathname.split("/").slice(0, -1);
        return arr.map((_, index) => "/" + arr.slice(1, index + 1).join("/"));
    };

    return (
        <Menu
            className="h-100%"
            mode="inline"
            items={items()}
            onClick={onMenuClick}
            defaultSelectedKeys={[pathname]}
            defaultOpenKeys={renderOpenKeys()}
        />
    );
};

export default LayoutSiderMenu;
