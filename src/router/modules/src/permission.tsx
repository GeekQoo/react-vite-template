import React, { lazy } from "react";

const UserList = lazy(() => import("@/pages/Container/Permission/User/UserList.tsx"));
const UserEdit = lazy(() => import("@/pages/Container/Permission/User/UserEdit.tsx"));
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
                path: "/permission/user/add",
                title: "新增用户",
                element: <UserEdit />
            },
            {
                path: "/permission/user/:id",
                title: "编辑用户",
                element: <UserEdit />
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
