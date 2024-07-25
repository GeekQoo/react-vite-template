import React, { useEffect, useState } from "react";
import { App, Button, Col, Form, Input, Modal, Row, Select, TreeSelect } from "antd";
import type { SysModalProps } from "#/system";
import type { ArticleCategoryProps, ArticleProps, ArticleTagProps } from "#/modules/article";
import {
    ADD_ARTICLE,
    GET_ARTICLE_BY_ID,
    GET_ARTICLE_CATEGORY_LIST,
    GET_ARTICLE_TAG_ALL,
    UPDATE_ARTICLE
} from "@/api/article.ts";
import RichEditor from "@/components/RichEditor/RichEditor.tsx";

const ArticleEdit: React.FC<SysModalProps<ArticleProps>> = (props) => {
    const { message } = App.useApp();

    // 转成可选类型
    type FormProps = Partial<ArticleProps>;

    // 获取表单实例
    const [formInst] = Form.useForm<FormProps>();

    // 获取详情
    const getDetail = () => {
        if (props.value.configData && props.value.show) {
            GET_ARTICLE_BY_ID<FormProps>({ id: props.value.configData.id }).then((res) => {
                if (res.data.code === 0 && res.data.data) {
                    let formData = res.data.data;
                    formInst.setFieldsValue({
                        title: formData.title,
                        content: formData.content,
                        categoryId: formData.categoryId,
                        tagIds: formData.tagIds
                    });
                }
            });
        }
    };

    // 获取选项
    const [categoryIdOptions, setCategoryIdOptions] = useState<ArticleCategoryProps[]>([]);
    const [tagIdsOptions, setTagIdsOptions] = useState<ArticleTagProps[]>([]);

    const getOptions = () => {
        GET_ARTICLE_CATEGORY_LIST<ArticleCategoryProps[]>({}).then((res) => {
            if (res.data.code === 0) setCategoryIdOptions(res.data.data ?? []);
        });
        GET_ARTICLE_TAG_ALL<ArticleTagProps[]>().then((res) => {
            if (res.data.code === 0) setTagIdsOptions(res.data.data ?? []);
        });
    };

    // 关闭弹窗
    const closeModal = () => {
        props.updateValue({ ...props.value, show: false });
        formInst.resetFields();
    };

    // 提交
    const onSubmit = (values: FormProps) => {
        if (props.value.configData) {
            UPDATE_ARTICLE({
                id: props.value.configData.id,
                ...values
            }).then((res) => {
                if (res.data.code === 0) {
                    message.success("编辑成功");
                    closeModal();
                } else {
                    message.error(res.data.msg ?? "编辑失败");
                }
            });
        } else {
            ADD_ARTICLE({ ...values }).then((res) => {
                if (res.data.code === 0) {
                    message.success("新增成功");
                    closeModal();
                } else {
                    message.error(res.data.msg ?? "新增失败");
                }
            });
        }
    };

    const onSubmitFailed = () => {
        message.error("提交失败，请检查后再试");
    };

    useEffect(() => {
        if (props.value.show) {
            getOptions();
            getDetail();
        }
    }, [props.value]);

    return (
        <Modal
            centered
            title={props.value.configData ? "编辑文章" : "新增文章"}
            open={props.value.show}
            maskClosable={false}
            destroyOnClose
            width="800px"
            onCancel={closeModal}
            forceRender
            footer={[
                <Button key="submit" type="primary" onClick={() => formInst.submit()}>
                    提交
                </Button>,
                <Button key="back" type="primary" danger onClick={() => closeModal()}>
                    取消
                </Button>
            ]}
        >
            <div className="w-100% pt">
                <Form
                    name="modalForm"
                    layout="vertical"
                    form={formInst}
                    scrollToFirstError
                    onFinish={onSubmit}
                    onFinishFailed={onSubmitFailed}
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item<FormProps>
                                label="文章标题"
                                name="title"
                                rules={[{ required: true, message: "请输入文章标题" }]}
                            >
                                <Input allowClear placeholder="请输入文章标题" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<FormProps>
                                label="所属分类"
                                name="categoryId"
                                rules={[{ required: true, message: "请选择所属分类" }]}
                            >
                                <TreeSelect
                                    fieldNames={{ label: "categoryName", value: "id", children: "children" }}
                                    allowClear
                                    placeholder="请选择所属分类"
                                    treeData={categoryIdOptions}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<FormProps>
                                label="文章标签"
                                name="tagIds"
                                rules={[{ required: true, message: "请选择文章标签" }]}
                            >
                                <Select
                                    fieldNames={{
                                        label: "tagName",
                                        value: "id"
                                    }}
                                    mode="multiple"
                                    allowClear
                                    placeholder="请选择文章标签"
                                    options={tagIdsOptions}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item<FormProps>
                                label="文章内容"
                                name="content"
                                rules={[{ required: true, message: "请输入文章内容" }]}
                            >
                                <RichEditor />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        </Modal>
    );
};

export default ArticleEdit;
