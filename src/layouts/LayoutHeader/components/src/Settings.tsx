import React, { useState } from "react";
import { ColorPicker, Divider, Drawer, InputNumber, Radio, Select, theme, Typography } from "antd";
import { useThemeStore } from "@/store";
import { currentThemePreset, pageAnimationPreset, themeColorPreset } from "@/settings/theme.ts";
import { DynamicIcon } from "@/components/Dynamic";

const LayoutHeaderSettings: React.FC = () => {
    const { token } = theme.useToken();
    const { Text } = Typography;
    const {
        pageAnimation,
        setPageAnimation,
        themeColor,
        setThemeColor,
        currentTheme,
        setCurrentTheme,
        borderRadius,
        setBorderRadius
    } = useThemeStore();

    // 设置抽屉
    const [drawerShow, setDrawerShow] = useState<boolean>(false);

    const changeDrawerShow = (boolean: boolean) => {
        setDrawerShow(boolean);
    };

    return (
        <div>
            <DynamicIcon
                icon="SettingOutlined"
                className="block text-20px cursor-pointer"
                style={{
                    color: token.colorTextBase
                }}
                onClick={() => changeDrawerShow(true)}
            />
            <Drawer
                title="系统风格设置"
                width={350}
                placement="right"
                onClose={() => changeDrawerShow(false)}
                open={drawerShow}
            >
                <div className="flex-y-center mb">
                    <Text>预置主题</Text>
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
                    <Text>切换动画</Text>
                    <Select
                        className="ml-a w-120px"
                        value={pageAnimation}
                        onSelect={(value) => setPageAnimation(value)}
                        options={pageAnimationPreset}
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
                <Divider>其他配置</Divider>
                <div className="flex-y-center mb">
                    <Text>圆角大小</Text>
                    <InputNumber
                        value={borderRadius}
                        min={0}
                        max={10}
                        className="ml-a w-120px"
                        onChange={(value) => {
                            setBorderRadius(value as number);
                        }}
                    />
                </div>
            </Drawer>
        </div>
    );
};

export default LayoutHeaderSettings;
