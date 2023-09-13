import { lazy } from "react";
import App from "../App.tsx";

let Home = lazy(() => import("../pages/Home"));
let RoleList = lazy(() => import("../pages/Permission/RoleList"));

let routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                title: "首页",
                element: <Home />
            },
            {
                path: "/permission/role/list",
                title: "角色管理",
                element: <RoleList />
            }
        ]
    }
];

export { routes };
