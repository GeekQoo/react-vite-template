import { lazy } from "react";
import App from "../App.tsx";

let Home = lazy(() => import("../pages/Home.tsx"));

let routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            }
        ]
    }
];

export { routes };
