import React from "react";
import { Layout } from "antd";

let { Header } = Layout;

let LayoutHeader: React.FC = () => {
    return (
        <Header className="px">
            <div className="text-20px">ReactViteTemplate</div>
        </Header>
    );
};

export default LayoutHeader;
