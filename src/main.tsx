import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.scss";
import "uno.css";
import MyApp from "@/App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    // <React.StrictMode>
    <MyApp />
    // </React.StrictMode>
);
