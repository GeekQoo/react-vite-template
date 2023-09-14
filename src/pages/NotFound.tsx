import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

let NotFound: React.FC = () => {
    let navigate = useNavigate();

    return (
        <div className="w-100vw h-100vh flex-center">
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                    <Button type="primary" onClick={() => navigate("/")}>
                        Back Home
                    </Button>
                }
            />
        </div>
    );
};

export default NotFound;
