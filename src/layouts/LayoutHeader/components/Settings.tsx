import React, { useState } from "react";
import { SettingOutlined } from "@ant-design/icons";
import { Drawer, Select } from "antd";
import { useThemeStore } from "@/store";
import { pageAnimationPreset } from "@/setttings/theme.ts";

let LayoutHeaderSettings: React.FC = () => {
    let { pageAnimation, setPageAnimation } = useThemeStore();

    // 设置抽屉
    let [drawerShow, setDrawerShow] = useState<boolean>(false);

    let changeDrawerShow = (boolean: boolean) => {
        setDrawerShow(boolean);
    };

    return (
        <div>
            <SettingOutlined className="block text-20px cursor-pointer" onClick={() => changeDrawerShow(true)} />
            <Drawer
                title="系统设置"
                width={350}
                placement="right"
                onClose={() => changeDrawerShow(false)}
                open={drawerShow}
            >
                <Select
                    className="w-100%"
                    value={pageAnimation}
                    onSelect={(value) => setPageAnimation(value)}
                    options={pageAnimationPreset}
                />
            </Drawer>
        </div>
    );
};

export default LayoutHeaderSettings;
