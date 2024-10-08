import React from "react";
import { App, Avatar, Dropdown, MenuProps, theme } from "antd";
import { useAuthStore, useNavigationStore } from "@/store";
import { DynamicIcon } from "@/components/Dynamic";
import { useNavigate } from "react-router-dom";

const LayoutHeaderCurrentUser: React.FC = () => {
    const { token } = theme.useToken();
    const { userData, logout } = useAuthStore();
    const { setNavigations } = useNavigationStore();
    const { message } = App.useApp();
    const navigate = useNavigate();

    const items: MenuProps["items"] = [
        {
            key: "user",
            label: "用户中心",
            icon: <DynamicIcon icon="UserOutlined" />,
            onClick: async () => {}
        },
        {
            key: "logout",
            label: "退出登录",
            icon: <DynamicIcon icon="LoginOutlined" />,
            onClick: async () => {
                await message.success({
                    content: "退出成功，正在为您跳转...",
                    duration: 1
                });
                logout();
                setNavigations([]);
                navigate("/login");
            }
        }
    ];

    return (
        <Dropdown menu={{ items }}>
            <div className="flex-y-center cursor-pointer">
                <Avatar size={30} src={<img src={userData.avatar} alt="avatar" />} />
                <div
                    className="ml-2"
                    style={{
                        color: token.colorTextBase
                    }}
                >
                    {userData.nickname}
                </div>
            </div>
        </Dropdown>
    );
};

export default LayoutHeaderCurrentUser;
