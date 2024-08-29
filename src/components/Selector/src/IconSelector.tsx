import React, { useMemo, useState } from "react";
import { Button, Col, Input, Popover, Row, Segmented } from "antd";
import * as AntdIcons from "@ant-design/icons";
import { DynamicIcon } from "@/components/Dynamic";
import { ProCard } from "@ant-design/pro-components";
import { SysValueUpdate } from "#/system";

interface IconSelectorProps extends SysValueUpdate {}

export const IconSelector: React.FC<IconSelectorProps> = (props) => {
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [iconTheme, setIconTheme] = useState<"Outlined" | "Filled" | "TwoTone">("Outlined");

    /*
     * 获取所有图标
     * key.endsWith是JavaScript中的一个字符串方法，用于检查一个字符串是否以指定的子字符串结束。如果是，则返回true，否则返回false。
     */
    const icons = useMemo(
        () => ({
            outlined: Object.keys(AntdIcons).filter((key) => key.endsWith("Outlined")),
            filled: Object.keys(AntdIcons).filter((key) => key.endsWith("Filled")),
            twoTone: Object.keys(AntdIcons).filter((key) => key.endsWith("TwoTone"))
        }),
        [iconTheme]
    );

    return (
        <Popover
            title="选择图标"
            arrow={true}
            trigger="click"
            open={popoverOpen}
            content={
                <div className="w-600px">
                    <Segmented
                        options={[
                            { label: "线框风格", value: "Outlined" },
                            { label: "实底风格", value: "Filled" },
                            { label: "双色风格", value: "TwoTone" }
                        ]}
                        block
                        onChange={(value) => {
                            setIconTheme(value as "Outlined" | "Filled" | "TwoTone");
                        }}
                    />
                    <div className="mt-4 pr-2 h-300px overflow-x-hidden overflow-y-auto">
                        {iconTheme === "Outlined" && (
                            <Row gutter={[16, 16]}>
                                {icons.outlined.map((icon, index) => (
                                    <Col key={icon} className="gutter-row" span={6}>
                                        <ProCard
                                            layout="center"
                                            bordered
                                            hoverable
                                            boxShadow={props.value === icon}
                                            onClick={() => {
                                                props.onChange?.(icon);
                                                setPopoverOpen(false);
                                            }}
                                        >
                                            <DynamicIcon key={icon} icon={icon} className="text-24px" />
                                        </ProCard>
                                    </Col>
                                ))}
                            </Row>
                        )}
                        {iconTheme === "Filled" && (
                            <Row gutter={[16, 16]}>
                                {icons.filled.map((icon, index) => (
                                    <Col key={icon} className="gutter-row" span={6}>
                                        <ProCard
                                            layout="center"
                                            bordered
                                            hoverable
                                            boxShadow={props.value === icon}
                                            onClick={() => {
                                                props.onChange?.(icon);
                                                setPopoverOpen(false);
                                            }}
                                        >
                                            <DynamicIcon key={icon} icon={icon} className="text-24px" />
                                        </ProCard>
                                    </Col>
                                ))}
                            </Row>
                        )}
                        {iconTheme === "TwoTone" && (
                            <Row gutter={[16, 16]}>
                                {icons.twoTone.map((icon, index) => (
                                    <Col key={icon} className="gutter-row" span={6}>
                                        <ProCard
                                            layout="center"
                                            bordered
                                            hoverable
                                            boxShadow={props.value === icon}
                                            onClick={() => {
                                                props.onChange?.(icon);
                                                setPopoverOpen(false);
                                            }}
                                        >
                                            <DynamicIcon key={icon} icon={icon} className="text-24px" />
                                        </ProCard>
                                    </Col>
                                ))}
                            </Row>
                        )}
                    </div>
                </div>
            }
        >
            <Input
                type="text"
                value={props.value}
                placeholder="点击选择图标"
                readOnly
                size="small"
                onClick={() => setPopoverOpen(!popoverOpen)}
                onChange={(e) => props.onChange?.(e.target.value)}
                suffix={
                    <Button
                        className="p-0!"
                        type="link"
                        onClick={(e) => {
                            e.stopPropagation();
                            props.onChange?.("");
                            setPopoverOpen(false);
                        }}
                    >
                        清除
                    </Button>
                }
                addonAfter={
                    <DynamicIcon icon={props.value ?? "MoreOutlined"} onClick={() => setPopoverOpen(!popoverOpen)} />
                }
            />
        </Popover>
    );
};
