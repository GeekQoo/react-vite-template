import Home from "../pages/Home";
import NotFound from "../pages/System/NotFound.tsx";

export default [
    {
        path: "/",
        element: <Home />
    },
    {
        path: "*",
        element: <NotFound />
    }
];
