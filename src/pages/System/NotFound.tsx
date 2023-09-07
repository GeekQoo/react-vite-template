import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

export default function About() {
    let navigate = useNavigate();
    return (
        <Result
            status="404"
            title="404"
            subTitle="非常抱歉，该页面不存在"
            extra={
                <Button type="primary" onClick={() => navigate("/")}>
                    返回首页
                </Button>
            }
        />
    );
}
