import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Layout, Spin } from "antd";

let { Content } = Layout;

let BasicLayout: React.FC = () => {
    return (
        <Content>
            <div className="wh-100% p-4 overflow-y-auto">
                <Suspense fallback={<Spin size="large" className="wh-100% flex-center" />}>
                    <Outlet />
                </Suspense>
            </div>
        </Content>
    );
};

export default BasicLayout;
