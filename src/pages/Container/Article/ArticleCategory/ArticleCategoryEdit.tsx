import React, { useEffect, useState } from "react";
import { App, Button, Col, Form, Input, Modal, Row, TreeSelect } from "antd";
import type { SysModalProps } from "#/system";
import type { ArticleCategoryProps } from "#/article";
import {
    ADD_ARTICLE_CATEGORY,
    GET_ARTICLE_CATEGORY_BY_ID,
    GET_ARTICLE_CATEGORY_LIST,
    UPDATE_ARTICLE_CATEGORY
} from "@/api/article.ts";

const ArticleCategoryEdit: React.FC<SysModalProps<ArticleCategoryProps>> = (props) => {
    const { message } = App.useApp();

    // 转成可选类型
    type FormProps = Partial<ArticleCategoryProps>;

    // 获取表单实例
    const [formInst] = Form.useForm<FormProps>();

    // 获取详情
    const getDetail = () => {
        if (props.value.configData && props.value.show) {
            GET_ARTICLE_CATEGORY_BY_ID<FormProps>({ id: props.value.configData.id }).then((res) => {
                if (res.data.code === 0 && res.data.data) {
                    let formData = res.data.data;
                    formInst.setFieldsValue({
                        categoryName: formData.categoryName,
                        parentId: formData.parentId
                    });
                }
            });
        }
    };

    // 获取选项
    const [articleCategoryOptions, setArticleCategoryOptions] = useState<ArticleCategoryProps[]>([]);

    const getOptions = () => {
        GET_ARTICLE_CATEGORY_LIST<ArticleCategoryProps[]>({}).then((res) => {
            if (res.data.code === 0) {
                setArticleCategoryOptions(res.data.data ?? []);
            }
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
            UPDATE_ARTICLE_CATEGORY({
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
            ADD_ARTICLE_CATEGORY({ ...values }).then((res) => {
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
            title={props.value.configData ? "编辑分类" : "新增分类"}
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
                    labelAlign="right"
                    labelWrap
                    form={formInst}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    scrollToFirstError
                    onFinish={onSubmit}
                    onFinishFailed={onSubmitFailed}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item<FormProps>
                                label="分类名称"
                                name="categoryName"
                                rules={[{ required: true, message: "请输入分类名称" }]}
                            >
                                <Input allowClear placeholder="请输入分类名称" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<FormProps>
                                label="父级分类"
                                name="parentId"
                                rules={[{ required: false, message: "请选择父级分类" }]}
                            >
                                <TreeSelect
                                    fieldNames={{ label: "categoryName", value: "id", children: "children" }}
                                    allowClear
                                    placeholder="请选择父级分类，不选则为顶级分类"
                                    treeData={articleCategoryOptions}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        </Modal>
    );
};

export default ArticleCategoryEdit;
