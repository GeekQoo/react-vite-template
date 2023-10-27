import { lazy } from "react";
import MyApp from "../App.tsx";
import NotFound from "../pages/NotFound.tsx";

let Home = lazy(() => import("../pages/Home"));
let RoleList = lazy(() => import("../pages/Permission/RoleList"));

let routes = [
    {
        path: "/",
        element: <MyApp />,
        children: [
            {
                index: true,
                title: "首页",
                element: <Home />
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
