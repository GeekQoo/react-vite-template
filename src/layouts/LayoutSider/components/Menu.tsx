import React from "react";
import type { MenuProps } from "antd";
import { Menu, theme } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store";
import { NavMenuProps } from "#/permission";
import { DynamicIcon } from "@/components/Dynamic";

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

    let getItems = (menus: NavMenuProps[]): MenuItem[] => {
        return (menus ?? [])
            .filter((i) => i.type !== 3)
            .map((i) => {
                let children = i.children && i.children.length > 0 ? getItems(i.children) : undefined;
                return {
                    label: i.menuName,
                    key: i.router,
                    icon: i.icon ? <DynamicIcon icon={i.icon} /> : null,
                    ...(children && children.length > 0 ? { children } : {})
                };
            });
    };

    let onMenuClick: MenuProps["onClick"] = ({ key }) => {
        navigate(key);
    };

    let renderOpenKeys = () => {
        let arr = pathname.split("/").slice(0, -1);
        return arr.map((_, index) => "/" + arr.slice(1, index + 1).join("/"));
    };

    // 判断当前路径是否在菜单中，用于默认选中菜单
    let isPathInMenu = (path: string, menus: NavMenuProps[]): boolean => {
        for (let menu of menus) {
            if (menu.router === path) return true;
            if (menu.children && isPathInMenu(path, menu.children)) return true;
        }
        return false;
    };

    let getSelectedKeys = () => {
        let arr = pathname.split("/").slice(1);
        let paths = arr.map((_, index) => "/" + arr.slice(0, index + 1).join("/"));
        return paths.filter((path) => isPathInMenu(path, userData?.menus ?? []));
    };

    return (
        <div className="h-100%">
            <Menu
                style={{ height: "calc(100% - 50px)" }}
                mode="inline"
                items={getItems(userData?.menus ?? [])}
                onClick={onMenuClick}
                defaultSelectedKeys={getSelectedKeys()}
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
                    <DynamicIcon icon="MenuUnfoldOutlined" className="text-20px" />
                ) : (
                    <DynamicIcon icon="MenuFoldOutlined" className="text-20px" />
                )}
            </div>
        </div>
    );
};

export default LayoutSiderMenu;
