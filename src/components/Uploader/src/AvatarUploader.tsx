import React, { useEffect, useState } from "react";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { App, Image, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { UPLOAD_FILE_URL } from "@/api/netdisk.ts";
import { DynamicIcon } from "@/components/Dynamic";
import type { SysValueUpdate } from "#/system";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

interface AvatarUploaderProps extends SysValueUpdate {
    quality?: number;
}

export const AvatarUploader: React.FC<AvatarUploaderProps> = (props) => {
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

    // 预览功能
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");

    const getBase64 = (file: FileType): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });

    const onPreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    useEffect(() => {
        if (props.value) {
            setFileList([{ uid: "-1", name: "avatar", status: "done", url: props.value }]);
        }
    }, [props.value]);

    return (
        <>
            <ImgCrop quality={props.quality ?? 1} rotationSlider>
                <Upload
                    className="h-110px"
                    action={UPLOAD_FILE_URL}
                    data={{ type: "avatar" }}
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={onPreview}
                >
                    {fileList.length < 1 && <DynamicIcon icon="UploadOutlined" className="text-25px" />}
                </Upload>
            </ImgCrop>
            {previewImage && (
                <Image
                    wrapperStyle={{ display: "none" }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage("")
                    }}
                    src={previewImage}
                />
            )}
        </>
    );
};
