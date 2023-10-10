import React from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { HomeOutlined, MailOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

let LayoutSiderMenu: React.FC = () => {
    type MenuItem = Required<MenuProps>["items"][number];

    let navigate = useNavigate();
    let { pathname } = useLocation();

    let getItem = (
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
        type?: "group"
    ): MenuItem => {
        return { key, icon, children, label, type };
    };

    let items: MenuItem[] = [
        getItem("首页", "/", <HomeOutlined />),
        getItem("权限配置", "/permission", <MailOutlined />, [getItem("角色管理", "/permission/role/list")])
    ];

    let onMenuClick: MenuProps["onClick"] = ({ key }) => {
        navigate(key);
    };

    let renderOpenKeys = () => {
        let arr = pathname.split("/").slice(0, -1);
        return arr.map((_, index) => "/" + arr.slice(1, index + 1).join("/"));
    };

    return (
        <Menu
            mode="inline"
            items={items}
            onClick={onMenuClick}
            defaultSelectedKeys={[pathname]}
            defaultOpenKeys={renderOpenKeys()}
        />
    );
};

export default LayoutSiderMenu;
