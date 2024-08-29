import React, { useEffect } from "react";
import { App, Button, Card, Col, Form, Input, InputNumber, Radio, Row, Space } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { ADD_GLOBAL_SETTINGS, GET_GLOBAL_SETTINGS_BY_ID, UPDATE_GLOBAL_SETTINGS } from "@/api/settings.ts";
import type { SettingsGlobalProps } from "#/modules/settings";
import { RichEditor } from "@/components/RichEditor";

const GlobalSettingsEdit: React.FC = () => {
    const { message } = App.useApp();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    // 转成可选类型
    type FormProps = Partial<SettingsGlobalProps>;

    // 获取表单实例
    const [formInst] = Form.useForm<FormProps>();

    // 获取详情
    const getDetail = () => {
        GET_GLOBAL_SETTINGS_BY_ID<FormProps>({ id }).then((res) => {
            if (res.data.code === 0 && res.data.data) {
                const formData = res.data.data;
                formInst.setFieldsValue({
                    name: formData.name,
                    key: formData.key,
                    type: formData.type,
                    value: formData.value,
                    sort: formData.sort
                });
            }
        });
    };

    const onBack = () => {
        navigate(-1);
    };

    // 提交
    const onSubmit = (values: FormProps) => {
        if (id) {
            UPDATE_GLOBAL_SETTINGS({
                id: Number(id),
                ...values
            }).then((res) => {
                if (res.data.code === 0) {
                    message.success("编辑成功");
                    onBack();
                } else {
                    message.error(res.data.msg ?? "编辑失败");
                }
            });
        } else {
            ADD_GLOBAL_SETTINGS({ ...values }).then((res) => {
                if (res.data.code === 0) {
                    message.success("新增成功");
                    onBack();
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
        if (id) getDetail();
    }, [id]);

    return (
        <div className="global-settings-page">
            <Card
                title={
                    <div className="flex-y-center">
                        <div>{id ? "编辑" : "新增"}全局设置</div>
                        <Space className="ml-a">
                            <Button type="primary" onClick={() => formInst.submit()}>
                                提交
                            </Button>
                            <Button onClick={() => onBack()}>返回</Button>
                        </Space>
                    </div>
                }
            >
                <Form
                    className="max-w-1200px mx-auto"
                    name="editForm"
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
            </Card>
        </div>
    );
};

export default GlobalSettingsEdit;
