import React, { lazy } from "react";
import BasicLayout from "@/layouts";
import NotFound from "@/pages/NotFound.tsx";
import Login from "@/pages/Auth/Login.tsx";
import { createBrowserRouter, Navigate } from "react-router-dom";

let Workbench = lazy(() => import("@/pages/Container/Workbench.tsx"));
let UserList = lazy(() => import("@/pages/Container/Permission/UserList.tsx"));

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
                path: "/permission/user-list",
                title: "用户管理",
                element: <UserList />
            }
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
];

let router = createBrowserRouter(routes);

export { routes, router };
