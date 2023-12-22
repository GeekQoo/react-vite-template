import React, { useEffect } from "react";
import { Layout, Result, Spin } from "antd";
import LayoutHeader from "./LayoutHeader";
import LayoutSider from "./LayoutSider";
import LayoutContent from "./LayoutContent";
import { useAuthStore, useThemeStore } from "@/store";
import { GET_USERINFO } from "@/api/auth.ts";
import { UserDataProps } from "#/system";

let MyLayout: React.FC = () => {
    return (
        <Layout className="h-100vh">
            <LayoutHeader />
            <Layout>
                <LayoutSider />
                <LayoutContent />
            </Layout>
        </Layout>
    );
};

let BasicLayout: React.FC = () => {
    let { globalLoading, setGlobalLoading } = useThemeStore();
    let { setUserData } = useAuthStore();

    let getUserData = () => {
        setGlobalLoading(true);
        /*
         * 菜单暂时写死
         */
        let mockMenu = [
            { label: "控制台", key: "/workbench", icon: "HomeOutlined" },
            {
                label: "权限配置",
                key: "/permission",
                icon: "TeamOutlined",
                children: [
                    { label: "用户管理", key: "/permission/user-list" },
                    { label: "角色管理", key: "/permission/role-list" }
                ]
            }
        ];
        GET_USERINFO<UserDataProps>({}).then((res) => {
            setUserData({
                ...res.data.data,
                menu: mockMenu
            });
            setGlobalLoading(false);
        });
    };

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <div>
            {globalLoading ? (
                <div className="fixed wh-100% top-0 left-0 bg-[#fff] z-9999">
                    <div className="wh-100% flex-center">
                        <Result icon={<Spin size="large" />} title="加载中" subTitle="先去喝杯茶吧" />
                    </div>
                </div>
            ) : (
                <MyLayout />
            )}
        </div>
    );
};

export default BasicLayout;
