import React from "react";
import { App, Button, Card, Input } from "antd";
import { AUTH_LOGIN } from "@/api/auth.ts";
import { useAuthStore } from "@/store";
import { useNavigate } from "react-router-dom";
import { DynamicIcon } from "@/components/Dynamic";

const Login: React.FC = () => {
    const { message } = App.useApp();
    const { setToken } = useAuthStore();

    const navigate = useNavigate();

    const [formData, setFormData] = React.useState({
        username: "admin",
        password: "admin"
    });

    const onSubmit = () => {
        AUTH_LOGIN({
            username: formData.username,
            password: formData.password
        }).then((res) => {
            if (res.data.code === 0) {
                setToken(res.headers.token);
                message.success({
                    content: "登录成功，正在跳转...",
                    duration: 1,
                    onClose: () => {
                        navigate("/workbench");
                    }
                });
            } else message.error(res.data.msg);
        });
    };

    return (
        <div className="w-100vw h-100vh flex-center" style={{ background: "#dee8ff" }}>
            <Card hoverable className="w-350px">
                <div className="flex-center">
                    <img
                        src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                        className="block h-50px mr-2"
                        alt="logo"
                    />
                    <div className="text-24px">React Vite template</div>
                </div>
                <Input
                    className="mt"
                    placeholder="请输入用户名"
                    prefix={<DynamicIcon icon="UserOutlined" />}
                    value={formData.username}
                    onChange={(e) => {
                        setFormData({
                            ...formData,
                            username: e.target.value
                        });
                    }}
                />
                <Input.Password
                    className="mt"
                    placeholder="请输入密码"
                    prefix={<DynamicIcon icon="LockOutlined" />}
                    value={formData.password}
                    onChange={(e) => {
                        setFormData({
                            ...formData,
                            password: e.target.value
                        });
                    }}
                />
                <Button className="mt" type="primary" block onClick={onSubmit}>
                    登录
                </Button>
            </Card>
        </div>
    );
};

export default Login;
