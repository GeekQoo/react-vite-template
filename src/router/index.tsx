import React, { lazy } from "react";
import BasicLayout from "@/layouts";
import NotFound from "@/pages/NotFound.tsx";
import Login from "@/pages/Auth/Login.tsx";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { article, permission, settings } from "./modules";
import { SysRouteProps } from "#/system";

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

/*
 * 匹配路径
 * @param itemPath 遍历路径
 * @param currentPath 当前路径
 * @returns { isMatch: boolean; params: Record<string, string> }
 */
const matchPath = (itemPath: string, currentPath: string): { isMatch: boolean; params: Record<string, string> } => {
    const itemPathSplit = itemPath.split("/");
    const currentPathSplit = currentPath.split("/");
    const params: Record<string, string> = {};

    // 如果段的数量不匹配，返回不匹配
    if (itemPathSplit.length !== currentPathSplit.length) return { isMatch: false, params };

    // 检查每个段是否匹配
    const match = itemPathSplit.every((item, index) => {
        // 如果段以 ":" 开头，表示这是一个动态段，提取参数
        if (item.startsWith(":")) {
            params[item.slice(1)] = currentPathSplit[index];
            return true;
        }

        // 否则，检查段是否完全匹配
        return item === currentPathSplit[index];
    });

    // 返回匹配结果和提取的参数
    return { isMatch: match, params };
};

/*
 * 查找路由
 * @param routes 路由列表
 * @param path 当前路径
 * @returns { SysRouteProps | null }
 */
const findRoute = (routes: SysRouteProps[], path: string): Nullable<SysRouteProps> => {
    for (const item of routes) {
        // 检查当前路由是否匹配
        const { isMatch, params } = matchPath(item.path, path);

        // 如果匹配，返回当前路由并附加参数和fullPath
        if (isMatch) return { ...item, params, fullPath: path };

        // 如果当前路由有子路由，递归查找子路由
        if (item.children) {
            const citem = findRoute(item.children, path);
            if (citem) return citem;
        }
    }

    // 如果没有找到匹配项，返回 null
    return null;
};

export { routes, router, findRoute };
