import React, { useEffect } from "react";
import { App, Button, Col, Form, Input, InputNumber, Modal, Radio, Row } from "antd";
import type { SysModalProps } from "#/system";
import { ADD_GLOBAL_SETTINGS, GET_GLOBAL_SETTINGS_BY_ID, UPDATE_GLOBAL_SETTINGS } from "@/api/settings.ts";
import type { SettingsGlobalProps } from "#/modules/settings";
import { RichEditor } from "@/components/RichEditor";

const GlobalSettingsEdit: React.FC<SysModalProps<SettingsGlobalProps>> = (props) => {
    const { message } = App.useApp();

    // 转成可选类型
    type FormProps = Partial<SettingsGlobalProps>;

    // 获取表单实例
    const [formInst] = Form.useForm<FormProps>();

    // 获取详情
    const getDetail = () => {
        if (props.value.configData && props.value.show) {
            GET_GLOBAL_SETTINGS_BY_ID<FormProps>({ id: props.value.configData.id }).then((res) => {
                if (res.data.code === 0 && res.data.data) {
                    let formData = res.data.data;
                    formInst.setFieldsValue({
                        name: formData.name,
                        key: formData.key,
                        type: formData.type,
                        value: formData.value,
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
            UPDATE_GLOBAL_SETTINGS({
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
            ADD_GLOBAL_SETTINGS({ ...values }).then((res) => {
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
            title={props.value.configData ? "编辑设置项" : "新增设置项"}
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
            <div className="w-100%">
                <Form
                    name="modalForm"
                    labelAlign="right"
                    labelWrap
                    form={formInst}
                    scrollToFirstError
                    onFinish={onSubmit}
                    initialValues={{ sort: 0, type: 0 }}
                    onFinishFailed={onSubmitFailed}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item<FormProps>
                                label="设置项名"
                                name="name"
                                rules={[{ required: true, message: "请输入设置项名" }]}
                            >
                                <Input allowClear placeholder="请输入设置项名" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<FormProps>
                                label="设置项键"
                                name="key"
                                rules={[{ required: true, message: "请输入设置项键" }]}
                            >
                                <Input allowClear placeholder="请输入设置项键" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<FormProps>
                                name="sort"
                                label="设置排序"
                                rules={[{ required: true, message: "请输入排序" }]}
                            >
                                <InputNumber className="w-100%" min={0} placeholder="请输入排序" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<FormProps>
                                name="type"
                                label="设置类型"
                                rules={[{ required: true, message: "请选择设置类型" }]}
                            >
                                <Radio.Group
                                    options={[
                                        { label: "普通文本", value: 0 },
                                        { label: "富文本", value: 1 },
                                        { label: "图片", value: 2, disabled: true }
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        {Form.useWatch("type", formInst) === 0 && (
                            <Col span={12}>
                                <Form.Item<FormProps>
                                    label="设置项值"
                                    name="value"
                                    rules={[{ required: true, message: "请输入设置项值" }]}
                                >
                                    <Input allowClear placeholder="请输入设置项值" />
                                </Form.Item>
                            </Col>
                        )}
                        {Form.useWatch("type", formInst) === 1 && (
                            <Col span={24}>
                                <Form.Item<FormProps>
                                    label="设置项值"
                                    name="value"
                                    rules={[{ required: true, message: "请输入设置项值" }]}
                                >
                                    <RichEditor />
                                </Form.Item>
                            </Col>
                        )}
                    </Row>
                </Form>
            </div>
        </Modal>
    );
};

export default GlobalSettingsEdit;
