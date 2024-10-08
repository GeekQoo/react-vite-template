import React, { useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { Menu, theme } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store";
import type { NavMenuProps } from "#/permission";
import { DynamicIcon } from "@/components/Dynamic";

interface ComponentProps {
    collapsed: boolean; // 侧边栏折叠状态
    toggleCollapsed: () => void; // 切换侧边栏折叠状态
}

const LayoutSiderMenu: React.FC<ComponentProps> = (props) => {
    type MenuItem = Required<MenuProps>["items"][number];

    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { userData } = useAuthStore();
    const { token } = theme.useToken();

    const getItems = (menus: NavMenuProps[]): MenuItem[] => {
        return (menus ?? [])
            .filter((i) => i.type !== 3)
            .map((i) => {
                const children = i.children && i.children.length > 0 ? getItems(i.children) : undefined;
                return {
                    label: i.menuName,
                    key: i.router,
                    icon: i.icon ? <DynamicIcon icon={i.icon} /> : null,
                    ...(children && children.length > 0 ? { children } : {})
                };
            });
    };

    const onMenuClick: MenuProps["onClick"] = ({ key }) => {
        navigate(key);
    };

    // 判断当前路径是否在菜单中，用于默认选中菜单
    const isPathInMenu = (path: string, menus: NavMenuProps[]): boolean => {
        for (const menu of menus) {
            if (menu.router === path) return true;
            if (menu.children && isPathInMenu(path, menu.children)) return true;
        }
        return false;
    };

    // 选中和展开的相关逻辑
    const getSelectedKeys = () => {
        const arr = pathname.split("/").slice(1);
        const paths = arr.map((_, index) => "/" + arr.slice(0, index + 1).join("/"));
        return paths.filter((path) => isPathInMenu(path, userData?.menus ?? []));
    };

    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const [openKeys, setOpenKeys] = useState<string[]>([]);

    const onOpenChange = (keys: string[]) => {
        setOpenKeys(keys);
    };

    const renderOpenKeys = () => {
        const arr = pathname.split("/").slice(1);
        const paths = arr.map((_, index) => "/" + arr.slice(0, index + 1).join("/"));
        const entrancePath = "/workbench";
        return pathname === entrancePath ? ["/"] : paths.filter((key) => key !== "/");
    };

    useEffect(() => {
        setSelectedKeys(getSelectedKeys());
        if (!props.collapsed) {
            setOpenKeys((prevOpenKeys) => [...new Set([...prevOpenKeys, ...renderOpenKeys()])]);
        }
    }, [pathname, props.collapsed]);

    return (
        <div className="h-100%">
            <Menu
                style={{ height: "calc(100% - 50px)" }}
                mode="inline"
                items={getItems(userData?.menus ?? [])}
                onClick={onMenuClick}
                selectedKeys={selectedKeys}
                openKeys={openKeys}
                onOpenChange={onOpenChange}
            />
            <div
                className="w-100% h-50px flex-center cursor-pointer"
                style={{ borderTop: `1px solid ${token.colorBorder}` }}
                onClick={() => props.toggleCollapsed()}
            >
                <DynamicIcon icon={props.collapsed ? "MenuUnfoldOutlined" : "MenuFoldOutlined"} className="text-20px" />
            </div>
        </div>
    );
};

export default LayoutSiderMenu;
