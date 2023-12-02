import React, { lazy } from "react";
import BasicLayout from "@/layouts";
import NotFound from "@/pages/NotFound.tsx";
import Login from "@/pages/Auth/Login.tsx";
import { Navigate } from "react-router-dom";

let Workbench = lazy(() => import("@/pages/Container/Workbench.tsx"));
let RoleList = lazy(() => import("@/pages/Container/Permission/RoleList"));

let routes = [
    {
        path: "/login",
        title: "登录",
        element: <Login />
    },
    {
        path: "/",
        element: <BasicLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/workbench" />
            },
            {
                path: "/workbench",
                title: "工作台",
                element: <Workbench />
            },
            {
                path: "/permission/role-list",
                title: "角色管理",
                element: <RoleList />
            }
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
];

export { routes };
