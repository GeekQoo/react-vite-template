import React, { lazy } from "react";
import BasicLayout from "@/layouts";
import NotFound from "@/pages/NotFound.tsx";
import Login from "@/pages/Auth/Login.tsx";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { article, permission, settings } from "./modules";

/*
 * 工作台
 */
const Workbench = lazy(() => import("@/pages/Container/Workbench.tsx"));

const routes = [
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
            ...permission,
            ...settings,
            ...article
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
];

const router = createBrowserRouter(routes);

export { routes, router };
