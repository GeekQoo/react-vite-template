import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="w-100vw h-100vh flex-center">
            <Result
                status="404"
                title="404"
                subTitle="很抱歉，您访问的页面不存在。"
                extra={
                    <Button type="primary" onClick={() => navigate("/")}>
                        返回工作台
                    </Button>
                }
            />
        </div>
    );
};

export default NotFound;
