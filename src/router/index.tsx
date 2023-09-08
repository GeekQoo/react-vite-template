import { lazy } from "react";
import App from "../App.tsx";

let Home = lazy(() => import("../pages/Home.tsx"));

let routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                title: "首页",
                element: <Home />
            }
        ]
    }
];

export { routes };
