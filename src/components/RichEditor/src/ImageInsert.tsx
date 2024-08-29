import React, { useState } from "react";
import { App, Button, Input, Modal, Space, Upload, type UploadFile, type UploadProps } from "antd";
import type { SysModalProps } from "#/system";
import { UPLOAD_FILE_URL } from "@/api/netdisk.ts";

export const ImageInsert: React.FC<SysModalProps<{ url: string }>> = (props) => {
    const { message } = App.useApp();

    const [url, setUrl] = useState<string>("");

    // 关闭弹窗
    const closeModal = () => {
        props.updateValue({ ...props.value, show: false });
        setUrl("");
    };

    // 提交
    const onSubmit = () => {
        if (!url) return message.error("请输入图片地址或上传图片");
        props.updateValue({ show: false, configData: { url: url } });
        setUrl("");
    };

    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const onChangeFile: UploadProps["onChange"] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        if (newFileList.length) {
            if (newFileList[0].status === "error") {
                message.error("请检查网络连接或文件大小是否超过限制");
            } else {
                setUrl(newFileList[0].response?.data?.url ?? "");
            }
        } else {
            setUrl("");
        }
    };

    return (
        <Modal
            centered
            title="插入图片"
            open={props.value.show}
            maskClosable={false}
            destroyOnClose
            width="600px"
            onCancel={closeModal}
            forceRender
            footer={[
                <Button key="submit" type="primary" onClick={() => onSubmit()}>
                    插入
                </Button>,
                <Button key="back" type="primary" danger onClick={() => closeModal()}>
                    取消
                </Button>
            ]}
        >
            <div className="w-100% pt">
                <Space.Compact className="w-100%">
                    <Input
                        className="mb"
                        allowClear
                        placeholder="请输入图片地址或上传图片"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <Upload
                        action={UPLOAD_FILE_URL}
                        data={{ type: "richText" }}
                        fileList={fileList}
                        onChange={onChangeFile}
                        maxCount={1}
                        itemRender={() => false}
                    >
                        <Button type="primary">上传</Button>
                    </Upload>
                </Space.Compact>
            </div>
        </Modal>
    );
};
