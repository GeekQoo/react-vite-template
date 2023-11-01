import React, { useState } from "react";
import { SettingOutlined } from "@ant-design/icons";
import { ColorPicker, Divider, Drawer, Radio, Select, Typography } from "antd";
import { useThemeStore } from "@/store";
import { currentThemePreset, pageAnimationPreset, themeColorPreset } from "@/setttings/theme.ts";

let LayoutHeaderSettings: React.FC = () => {
    let { Text } = Typography;
    let { pageAnimation, setPageAnimation, themeColor, setThemeColor, currentTheme, setCurrentTheme } = useThemeStore();

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
                <Divider>风格设置</Divider>
                <div className="flex-y-center mb">
                    <Text>夜间模式</Text>
                    <Radio.Group
                        className="ml-a"
                        options={currentThemePreset}
                        value={currentTheme}
                        optionType="button"
                        buttonStyle="solid"
                        onChange={(e) => {
                            setCurrentTheme(e.target.value);
                        }}
                    />
                </div>
                <div className="flex-y-center mb">
                    <Text>主题颜色</Text>
                    <ColorPicker
                        className="ml-a"
                        value={themeColor}
                        onChange={(color) => setThemeColor(color.toHexString())}
                        presets={[{ label: "预设颜色", colors: themeColorPreset }]}
                        showText={(color) => <span>{color.toHexString()}</span>}
                    />
                </div>
                <div className="flex-y-center mb">
                    <Text>切换动画</Text>
                    <Select
                        className="ml-a min-w-100px"
                        value={pageAnimation}
                        onSelect={(value) => setPageAnimation(value)}
                        options={pageAnimationPreset}
                    />
                </div>
            </Drawer>
        </div>
    );
};

export default LayoutHeaderSettings;
