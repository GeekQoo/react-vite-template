import React, { lazy } from "react";

const UserList = lazy(() => import("@/pages/Container/Permission/User/UserList.tsx"));
const RoleList = lazy(() => import("@/pages/Container/Permission/Role/RoleList.tsx"));
const MenuList = lazy(() => import("@/pages/Container/Permission/Menu/MenuList.tsx"));

export default [
    {
        path: "/permission",
        title: "权限管理",
        children: [
            {
                path: "/permission/user-list",
                title: "用户管理",
                element: <UserList />
            },
            {
                path: "/permission/role-list",
                title: "角色管理",
                element: <RoleList />
            },
            {
                path: "/permission/menu-list",
                title: "菜单管理",
                element: <MenuList />
            }
        ]
    }
];
