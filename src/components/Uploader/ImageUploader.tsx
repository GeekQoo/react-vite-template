import React, { useEffect, useState } from "react";
import type { UploadFile, UploadProps } from "antd";
import { App, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { UPLOAD_FILE_URL } from "@/api/netdisk.ts";
import { DynamicIcon } from "@/components/Dynamic";

interface ImageUploaderProps {
    type: string;
    className?: string;
    aspect?: number;
    value?: string;
    onChange?: (value: string) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = (props) => {
    let [fileList, setFileList] = useState<UploadFile[]>([]);
    let { message } = App.useApp();

    let onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        if (newFileList.length) {
            if (newFileList[0].status === "error") {
                message.error("请检查网络连接或文件大小是否超过限制");
            } else {
                props.onChange?.(newFileList[0].response?.data?.url ?? "");
            }
        } else {
            props.onChange?.("");
        }
    };
    let onPreview = async (file: UploadFile) => {
        message.warning("暂不支持预览，敬请期待");
    };

    useEffect(() => {
        if (props.value) {
            setFileList([{ uid: "-1", name: "avatar", status: "done", url: props.value }]);
        }
    }, [props.value]);

    return (
        <ImgCrop aspect={props.aspect ?? 16 / 9} rotationSlider>
            <Upload
                className="h-110px"
                action={UPLOAD_FILE_URL}
                data={{ type: props.type }}
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
            >
                {fileList.length < 1 && <DynamicIcon icon="UploadOutlined" className="text-25px" />}
            </Upload>
        </ImgCrop>
    );
};
