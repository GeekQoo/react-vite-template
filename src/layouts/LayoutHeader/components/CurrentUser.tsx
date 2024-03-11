import React from "react";
import { App, Avatar, Dropdown, MenuProps } from "antd";
import { useAuthStore } from "@/store";
import { DynamicIcon } from "@/components/Dynamic";
import { useNavigate } from "react-router-dom";

let LayoutHeaderCurrentUser: React.FC = () => {
    let { userData, logout } = useAuthStore();
    let { message } = App.useApp();
    let navigate = useNavigate();

    let items: MenuProps["items"] = [
        {
            key: "1",
            label: "退出登录",
            icon: <DynamicIcon icon="LoginOutlined" />,
            onClick: async () => {
                await message.success("退出成功，正在为您跳转...");
                logout();
                navigate("/login");
            }
        }
    ];

    return (
        <Dropdown menu={{ items }}>
            <div className="flex-y-center cursor-pointer">
                <Avatar size={30} src={<img src={userData.avatar} alt="avatar" />} />
                <div className="ml-2">{userData.nickname}</div>
            </div>
        </Dropdown>
    );
};

export default LayoutHeaderCurrentUser;
