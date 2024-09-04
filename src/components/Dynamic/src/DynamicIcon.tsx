import React from "react";
import type { GetProps } from "antd";
import Icon, * as icons from "@ant-design/icons";

type CustomIconComponentProps = GetProps<typeof Icon>;

interface DynamicIconProps {
    icon: string;
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
}

export const DynamicIcon: React.FC<DynamicIconProps> = (props) => {
    return (
        <Icon
            component={
                (
                    icons as {
                        [key: string]: CustomIconComponentProps;
                    }
                )[props.icon] as React.FC
            }
            style={props.style}
            className={props.className}
            onClick={props.onClick}
        />
    );
};
