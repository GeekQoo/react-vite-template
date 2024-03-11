import React from "react";
import type { GetProps } from "antd";
import Icon, * as icons from "@ant-design/icons";

type CustomIconComponentProps = GetProps<typeof Icon>;

export let DynamicIcon: React.FC<{ icon: string; className?: string }> = (props) => {
    return (
        <Icon
            component={
                (
                    icons as {
                        [key: string]: CustomIconComponentProps;
                    }
                )[props.icon] as React.FC
            }
            className={props.className}
        />
    );
};
