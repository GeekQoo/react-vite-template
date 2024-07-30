import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import Image from "@tiptap/extension-image";
import { Button, Select, Space, theme } from "antd";
import React, { useEffect, useState } from "react";
import { DynamicIcon } from "@/components/Dynamic";
import { ImageInsert } from "./ImageInsert.tsx";
import type { SysModalConfig } from "#/system";

const { useToken } = theme;

interface RichEditorProps {
    value?: string;
    onChange?: (value: string) => void;
}

const RichEditor: React.FC<RichEditorProps> = (props) => {
    const { token } = useToken();

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: { HTMLAttributes: { style: `line-height:1.5;` } },
                paragraph: { HTMLAttributes: { style: `line-height:1.5;` } },
                codeBlock: { HTMLAttributes: { style: `background:#222;color:#fff;padding:10px;border-radius:5px;` } }
            }),
            Underline,
            TextStyle,
            Image.configure({
                inline: true,
                allowBase64: true,
                HTMLAttributes: {
                    style: "max-width:100%;width:auto;height:auto;display:block;margin:0 auto;"
                }
            })
        ],
        content: props.value,
        editorProps: { attributes: { class: "min-h-[200px] focus:outline-none py-2 px-4" } }
    });

    useEffect(() => {
        if (editor) {
            if (props.value) editor.commands.setContent(props.value);

            const updateHandler = () => props.onChange?.(editor.getHTML());

            editor.on("update", updateHandler);

            return () => {
                editor.off("update", updateHandler);
            };
        }
    }, [editor, props.value, props.onChange]);

    const [imageModal, setImageModal] = useState<SysModalConfig<{ url: string }>>({
        show: false,
        configData: { url: "" }
    });

    const openImageModal = () => setImageModal({ show: true, configData: { url: "" } });

    useEffect(() => {
        if (imageModal.configData?.url)
            editor
                ?.chain()
                .setImage({
                    src: imageModal.configData?.url
                })
                .run();
    }, [imageModal]);

    return (
        <div
            className="overflow-hidden"
            style={{ borderRadius: token.borderRadius, border: `1px solid ${token.colorBorder}` }}
        >
            <div className="p-4" style={{ borderBottom: `1px solid ${token.colorBorder}` }}>
                <Space wrap>
                    <Select
                        className="w-100px!"
                        value={editor?.isActive("heading") ? editor.getAttributes("heading").level : 0}
                        options={[0, 1, 2, 3, 4, 5, 6].map((i) => ({
                            label: i > 0 ? `${i}号标题` : "默认文本",
                            value: i
                        }))}
                        onChange={(value) => {
                            if (value === 0) {
                                editor?.chain().focus().setParagraph().run();
                            } else {
                                editor
                                    ?.chain()
                                    .focus()
                                    .toggleHeading({ level: value as 1 | 2 | 3 | 4 | 5 | 6 })
                                    .run();
                            }
                        }}
                    />
                    <Button
                        type={editor?.isActive("bold") ? "primary" : "default"}
                        onClick={() => editor?.chain().focus().toggleBold().run()}
                    >
                        <DynamicIcon icon="BoldOutlined" />
                        <span>字体加粗</span>
                    </Button>
                    <Button
                        type={editor?.isActive("italic") ? "primary" : "default"}
                        onClick={() => editor?.chain().focus().toggleItalic().run()}
                    >
                        <DynamicIcon icon="ItalicOutlined" />
                        <span>字体倾斜</span>
                    </Button>
                    <Button
                        type={editor?.isActive("underline") ? "primary" : "default"}
                        onClick={() => editor?.chain().focus().toggleUnderline().run()}
                    >
                        <DynamicIcon icon="UnderlineOutlined" />
                        <span>下划线</span>
                    </Button>
                    <Button
                        type={editor?.isActive("strike") ? "primary" : "default"}
                        onClick={() => editor?.chain().focus().toggleStrike().run()}
                    >
                        <DynamicIcon icon="StrikethroughOutlined" />
                        <span>删除线</span>
                    </Button>
                    <Button
                        type={editor?.isActive("codeBlock") ? "primary" : "default"}
                        onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
                    >
                        <DynamicIcon icon="CodeOutlined" />
                        <span>代码块</span>
                    </Button>
                    <Button type="default" onClick={() => openImageModal()}>
                        <DynamicIcon icon="PictureOutlined" />
                        <span>插入图片</span>
                    </Button>
                </Space>
            </div>
            <EditorContent editor={editor} />
            <ImageInsert value={imageModal} updateValue={setImageModal} />
        </div>
    );
};

export default RichEditor;
