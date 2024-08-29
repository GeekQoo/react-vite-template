import React, { lazy } from "react";

const BannerList = lazy(() => import("@/pages/Container/Settings/Banner/BannerList.tsx"));
const BannerEdit = lazy(() => import("@/pages/Container/Settings/Banner/BannerEdit.tsx"));
const GlobalSettingsList = lazy(() => import("@/pages/Container/Settings/GlobalSettings/GlobalSettingsList.tsx"));
const GlobalSettingsEdit = lazy(() => import("@/pages/Container/Settings/GlobalSettings/GlobalSettingsEdit.tsx"));

export default [
    {
        path: "/settings",
        title: "系统设置",
        children: [
            {
                path: "/settings/banner",
                title: "幻灯片列表",
                element: <BannerList />
            },
            {
                path: "/settings/banner/add",
                title: "新增幻灯片",
                element: <BannerEdit />
            },
            {
                path: "/settings/banner/:id",
                title: "编辑幻灯片",
                element: <BannerEdit />
            },
            {
                path: "/settings/global",
                title: "全局设置列表",
                element: <GlobalSettingsList />
            },
            {
                path: "/settings/global/add",
                title: "新增全局设置",
                element: <GlobalSettingsEdit />
            },
            {
                path: "/settings/global/:id",
                title: "编辑全局设置",
                element: <GlobalSettingsEdit />
            }
        ]
    }
];
