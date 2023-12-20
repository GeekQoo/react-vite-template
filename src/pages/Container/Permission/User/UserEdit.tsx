import React from "react";
import { Modal } from "antd";
import type { PropsType } from "./types";

const UserEdit: React.FC<PropsType> = (props) => {
    return (
        <Modal
            centered
            title={props.value.configData ? "编辑用户" : "新增用户"}
            open={props.value.show}
            maskClosable={false}
            destroyOnClose
            width="600px"
            onCancel={() => {
                props.updateValue({
                    ...props.value,
                    show: false
                });
            }}
        ></Modal>
    );
};

export default UserEdit;
