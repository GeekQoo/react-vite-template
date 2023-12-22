import React from "react";
import type { MenuProps } from "antd";
import { Menu, theme } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store";
import { HomeOutlined, MenuFoldOutlined, MenuUnfoldOutlined, TeamOutlined } from "@ant-design/icons";

let { useToken } = theme;

interface ComponentProps {
    collapsed: boolean; // 侧边栏折叠状态
    toggleCollapsed: () => void; // 切换侧边栏折叠状态
}

let LayoutSiderMenu: React.FC<ComponentProps> = (props) => {
    type MenuItem = Required<MenuProps>["items"][number];

    let navigate = useNavigate();
    let { pathname } = useLocation();
    let { userData } = useAuthStore();
    let { token } = useToken();

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
        return (userData?.menu ?? []).map((i) => {
            return getItem(i.label, i.key, i.icon ? icons[i.icon] : null, i.children);
        });
    };

    let onMenuClick: MenuProps["onClick"] = ({ key }) => {
        navigate(key);
    };

    let renderOpenKeys = () => {
        let arr = pathname.split("/").slice(0, -1);
        return arr.map((_, index) => "/" + arr.slice(1, index + 1).join("/"));
    };

    return (
        <div className="h-100%">
            <Menu
                style={{ height: "calc(100% - 50px)" }}
                mode="inline"
                items={items()}
                onClick={onMenuClick}
                defaultSelectedKeys={[pathname]}
                defaultOpenKeys={renderOpenKeys()}
            />
            <div
                className="w-100% h-50px flex-center cursor-pointer"
                style={{ borderTop: `1px solid ${token.colorBorder}` }}
                onClick={() => {
                    props.toggleCollapsed();
                }}
            >
                {props.collapsed ? (
                    <MenuUnfoldOutlined className="text-20px" />
                ) : (
                    <MenuFoldOutlined className="text-20px" />
                )}
            </div>
        </div>
    );
};

export default LayoutSiderMenu;
