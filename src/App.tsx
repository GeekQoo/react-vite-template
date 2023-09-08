import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Spin } from "antd";

let App: React.FC = () => {
    return (
        <div>
            <div className="header">头部</div>
            <div>
                <Suspense fallback={<Spin size="large" className="w-100% h-70% flex-center" />}>
                    <Outlet />
                </Suspense>
            </div>
            <div className="footer">底部</div>
        </div>
    );
};

export default App;
