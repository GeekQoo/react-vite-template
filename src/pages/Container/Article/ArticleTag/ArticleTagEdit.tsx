import React, { useEffect } from "react";
import { App, Button, Col, Form, Input, Modal, Row } from "antd";
import type { SysModalProps } from "#/system";
import type { ArticleTagProps } from "#/modules/article";
import { ADD_ARTICLE_TAG, GET_ARTICLE_TAG_BY_ID, UPDATE_ARTICLE_TAG } from "@/api/article.ts";

const ArticleTagEdit: React.FC<SysModalProps<ArticleTagProps>> = (props) => {
    const { message } = App.useApp();

    // 转成可选类型
    type FormProps = Partial<ArticleTagProps>;

    // 获取表单实例
    const [formInst] = Form.useForm<FormProps>();

    // 获取详情
    const getDetail = () => {
        if (props.value.configData && props.value.show) {
            GET_ARTICLE_TAG_BY_ID<FormProps>({ id: props.value.configData.id }).then((res) => {
                if (res.data.code === 0 && res.data.data) {
                    const formData = res.data.data;
                    formInst.setFieldsValue({
                        tagName: formData.tagName
                    });
                }
            });
        }
    };

    // 关闭弹窗
    const closeModal = () => {
        props.updateValue({ ...props.value, show: false });
        formInst.resetFields();
    };

    // 提交
    const onSubmit = (values: FormProps) => {
        if (props.value.configData) {
            UPDATE_ARTICLE_TAG({
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
            ADD_ARTICLE_TAG({ ...values }).then((res) => {
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
            getDetail();
        }
    }, [props.value]);

    return (
        <Modal
            centered
            title={props.value.configData ? "编辑标签" : "新增标签"}
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
                                label="标签名称"
                                name="tagName"
                                rules={[{ required: true, message: "请输入标签名称" }]}
                            >
                                <Input allowClear placeholder="请输入标签名称" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        </Modal>
    );
};

export default ArticleTagEdit;
