import React, { useEffect } from "react";
import BasicLayout from "@/layouts";
import { Result, Spin } from "antd";
import { useAuthStore, useThemeStore } from "@/store";
import { GET_USERINFO } from "@/api/auth.ts";

let MyApp: React.FC = () => {
    let { setUserData } = useAuthStore();
    let { globalLoading, setGlobalLoading } = useThemeStore();

    let getUserData = () => {
        setGlobalLoading(true);
        GET_USERINFO<System.UserDataProps>({}).then((res) => {
            setUserData(res.data.data ?? {});
            setGlobalLoading(false);
        });
    };

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <>
            {globalLoading && (
                <div className="fixed wh-100% top-0 left-0 bg-[#fff] z-9999">
                    <div className="wh-100% flex-center">
                        <Result icon={<Spin size="large" />} title="加载中" subTitle="先去喝杯茶吧" />
                    </div>
                </div>
            )}
            <BasicLayout />
        </>
    );
};

export default MyApp;
