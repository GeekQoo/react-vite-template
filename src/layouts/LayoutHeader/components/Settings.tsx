import React, { useState } from "react";
import { SettingOutlined } from "@ant-design/icons";
import { ColorPicker, Drawer, Select } from "antd";
import { useThemeStore } from "@/store";
import { pageAnimationPreset, themeColorPreset } from "@/setttings/theme.ts";

let LayoutHeaderSettings: React.FC = () => {
    let { pageAnimation, setPageAnimation, themeColor, setThemeColor } = useThemeStore();

    // 设置抽屉
    let [drawerShow, setDrawerShow] = useState<boolean>(false);

    let changeDrawerShow = (boolean: boolean) => {
        setDrawerShow(boolean);
    };

    return (
        <div>
            <SettingOutlined className="block text-20px cursor-pointer" onClick={() => changeDrawerShow(true)} />
            <Drawer
                title="设置面板"
                width={350}
                placement="right"
                onClose={() => changeDrawerShow(false)}
                open={drawerShow}
            >
                <div className="flex-y-center mb">
                    <span>切换动画</span>
                    <Select
                        className="ml flex-auto"
                        value={pageAnimation}
                        onSelect={(value) => setPageAnimation(value)}
                        options={pageAnimationPreset}
                    />
                </div>
                <div className="flex-y-center mb">
                    <span>主题颜色</span>
                    <ColorPicker
                        className="ml flex-auto"
                        value={themeColor}
                        onChange={(color) => setThemeColor(color.toHexString())}
                        presets={[
                            {
                                label: "预设颜色",
                                colors: themeColorPreset
                            }
                        ]}
                        showText={(color) => <span>当前主题色：{color.toHexString()}</span>}
                    />
                </div>
            </Drawer>
        </div>
    );
};

export default LayoutHeaderSettings;
