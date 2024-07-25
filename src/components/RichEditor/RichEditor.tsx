import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button, Select, Space, theme } from "antd";
import React, { useEffect } from "react";
import { DynamicIcon } from "@/components/Dynamic";

const { useToken } = theme;

interface RichEditorProps {
    value?: string;
    onChange?: (value: string) => void;
}

const RichEditor: React.FC<RichEditorProps> = (props) => {
    const { token } = useToken();

    const editor = useEditor({
        extensions: [StarterKit],
        content: props.value,
        editorProps: {
            attributes: { class: "min-h-[200px] focus:outline-none py-2 px-4" }
        }
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

    return (
        <div
            className="overflow-hidden"
            style={{ borderRadius: token.borderRadius, border: `1px solid ${token.colorBorder}` }}
        >
            <div className="p-4" style={{ borderBottom: `1px solid ${token.colorBorder}` }}>
                <Space wrap>
                    <Select
                        className="w-70px text-center"
                        value={editor?.isActive("heading") ? editor.getAttributes("heading").level : 0}
                        options={[0, 1, 2, 3, 4, 5, 6].map((i) => ({ label: i > 0 ? `H${i}` : "文本", value: i }))}
                        onChange={(value) => {
                            if (value === 0) {
                                editor?.commands.clearNodes();
                            } else {
                                editor?.commands.toggleHeading({ level: value as 1 | 2 | 3 | 4 | 5 | 6 });
                            }
                        }}
                    />
                    <Button
                        type={editor?.isActive("bold") ? "primary" : "default"}
                        onClick={() => editor?.commands.toggleBold()}
                    >
                        <DynamicIcon icon="BoldOutlined" />
                    </Button>
                </Space>
            </div>
            <EditorContent editor={editor} />
        </div>
    );
};

export default RichEditor;
