import React, { useEffect } from "react";
import { App, Button, Col, Form, Input, InputNumber, Modal, Row } from "antd";
import type { SysModalProps } from "#/system";
import { ADD_BANNER, GET_BANNER_BY_ID, UPDATE_BANNER } from "@/api/settings";
import { BannerProps } from "#/modules/settings";
import { ImageUploader } from "@/components/Uploader";

const BannerEdit: React.FC<SysModalProps<BannerProps>> = (props) => {
    const { message } = App.useApp();

    // 转成可选类型
    type FormProps = Partial<BannerProps>;

    // 获取表单实例
    const [formInst] = Form.useForm<FormProps>();

    // 获取详情
    const getDetail = () => {
        if (props.value.configData && props.value.show) {
            GET_BANNER_BY_ID<FormProps>({ id: props.value.configData.id }).then((res) => {
                if (res.data.code === 0 && res.data.data) {
                    let formData = res.data.data;
                    formInst.setFieldsValue({
                        title: formData.title,
                        description: formData.description,
                        imageUrl: formData.imageUrl,
                        linkUrl: formData.linkUrl,
                        sort: formData.sort
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
            UPDATE_BANNER({
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
            ADD_BANNER({ ...values }).then((res) => {
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
            title={props.value.configData ? "编辑幻灯片" : "新增幻灯片"}
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
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 17 }}
                    scrollToFirstError
                    initialValues={{ sort: 0 }}
                    onFinish={onSubmit}
                    onFinishFailed={onSubmitFailed}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item<FormProps>
                                label="幻灯片标题"
                                name="title"
                                rules={[{ required: true, message: "请输入幻灯片标题" }]}
                            >
                                <Input allowClear placeholder="请输入幻灯片标题" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<FormProps>
                                label="幻灯片描述"
                                name="description"
                                rules={[{ required: true, message: "请输入幻灯片描述" }]}
                            >
                                <Input allowClear placeholder="请输入幻灯片描述" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<FormProps>
                                label="跳转地址"
                                name="linkUrl"
                                rules={[{ required: true, message: "请输入跳转地址" }]}
                            >
                                <Input allowClear placeholder="请输入跳转地址" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="sort"
                                label="幻灯片排序"
                                rules={[{ required: false, message: "请输入幻灯片排序" }]}
                            >
                                <InputNumber className="w-100%" min={0} placeholder="请输入幻灯片排序" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<FormProps>
                                label="图片地址"
                                name="imageUrl"
                                rules={[{ required: true, message: "请上传图片" }]}
                            >
                                <ImageUploader type="thumbnail" aspect={1920 / 600} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        </Modal>
    );
};

export default BannerEdit;
