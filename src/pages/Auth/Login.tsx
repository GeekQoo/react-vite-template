import React from "react";
import { Button, Card, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

let Login: React.FC = () => {
    let [formData, setFormData] = React.useState({
        username: "",
        password: ""
    });

    let onSubmit = () => {
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
