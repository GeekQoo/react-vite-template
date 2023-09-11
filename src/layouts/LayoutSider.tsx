import React from "react";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import { MailOutlined } from "@ant-design/icons";

let { Sider } = Layout;

let LayoutSider: React.FC = () => {
    type MenuItem = Required<MenuProps>["items"][number];

    let getItem = (
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
        type?: "group"
    ): MenuItem => {
        return {
            key,
            icon,
            children,
            label,
            type
        } as MenuItem;
    };

    let items: MenuItem[] = [
        getItem("权限配置", "Permission", <MailOutlined />, [
            getItem("菜单管理", "PermissionMenuList"),
            getItem("角色管理", "PermissionRoleList"),
            getItem("用户管理", "PermissionUserList")
        ])
    ];

    return (
        <Sider>
            <Menu mode="inline" items={items} />
        </Sider>
    );
};

export default LayoutSider;
