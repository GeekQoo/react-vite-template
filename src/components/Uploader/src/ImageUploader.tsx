import React, { useEffect, useState } from "react";
import type { UploadFile, UploadProps } from "antd";
import { App, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { UPLOAD_FILE_URL } from "@/api/netdisk.ts";
import { DynamicIcon } from "@/components/Dynamic";
import type { SysValueUpdate } from "#/system";

interface ImageUploaderProps extends SysValueUpdate {
    type: string;
    className?: string;
    quality?: number;
    aspect?: number;
}

export const ImageUploader: React.FC<ImageUploaderProps> = (props) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const { message } = App.useApp();

    const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
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

    const onPreview = async (file: UploadFile) => {
        console.log(file);
        message.warning("暂不支持预览，敬请期待");
    };

    useEffect(() => {
        if (props.value) {
            setFileList([{ uid: "-1", name: "image", status: "done", url: props.value }]);
        }
    }, [props.value]);

    return (
        <ImgCrop quality={props.quality ?? 1} aspect={props.aspect ?? 16 / 9} rotationSlider>
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
