import router from "./router/index";
import { useNavigate, useRoutes } from "react-router-dom";
import { Button, Space } from "antd";

export default function App() {
    let navigate = useNavigate();
    return (
        <div>
            <div className="flex-y-center">
                <Space>
                    <Button type="primary" onClick={() => navigate("/")}>
                        Home
                    </Button>
                    <Button type="primary" onClick={() => navigate("/404")}>
                        404
                    </Button>
                </Space>
            </div>
            <div>{useRoutes(router)}</div>
        </div>
    );
}
