import React from "react";
import { App, Button, Card, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { AUTH_LOGIN } from "@/api/auth.ts";
import { useAuthStore } from "@/store";
import { useNavigate } from "react-router-dom";

let Login: React.FC = () => {
    let { message } = App.useApp();
    let { token, setToken } = useAuthStore();

    let navigate = useNavigate();

    let [formData, setFormData] = React.useState({
        username: "admin",
        password: "admin"
    });

    let onSubmit = () => {
        AUTH_LOGIN({
            username: formData.username,
            password: formData.password
        }).then(async (res) => {
            if (res.data.code === 0) {
                message.success({
                    content: "登录成功，正在跳转...",
                    duration: 2,
                    onClose: () => {
                        setToken(res.headers.token);
                        navigate("/");
                    }
                });
            } else message.error(res.data.msg);
        });
        console.log(formData);
    };

    return (
        <div className="w-100vw h-100vh flex-center" style={{ background: "#dee8ff" }}>
            <Card hoverable className="w-350px">
                <div className="flex-center">
                    <img
                        src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                        className="block h-50px mr-2"
                    />
                    <div className="text-24px">React Vite template</div>
                </div>
                <Input
                    className="mt"
                    placeholder="请输入用户名"
                    prefix={<UserOutlined />}
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
                    prefix={<LockOutlined />}
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
