import React, { useEffect } from "react";
import { App, Button, Col, Form, Input, Modal, Row } from "antd";
import { ADD_ROLE, GET_ROLE_BY_ID, UPDATE_ROLE } from "@/api/permission.ts";
import type { SysModalProps } from "#/system";
import type { RoleProps } from "#/permission";

const RoleEdit: React.FC<SysModalProps<RoleProps>> = (props) => {
    let { message } = App.useApp();

    interface FormProps {
        roleName: string;
        remark: string;
    }

    // 获取表单实例
    let [formInst] = Form.useForm<FormProps>();

    // 获取详情
    let getDetail = () => {
        if (props.value.configData && props.value.show) {
            GET_ROLE_BY_ID<FormProps>({ id: props.value.configData.id }).then((res) => {
                if (res.data.code === 0 && res.data.data) {
                    let formData = res.data.data;
                    formInst.setFieldsValue({
                        roleName: formData.roleName,
                        remark: formData.remark
                    });
                }
            });
        }
    };

    useEffect(() => {
        getDetail();
    }, [props.value]);

    // 关闭弹窗
    let closeModal = () => {
        props.updateValue({ ...props.value, show: false });
        formInst.resetFields();
    };

    // 提交
    let onSubmit = (values: FormProps) => {
        if (props.value.configData) {
            UPDATE_ROLE({
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
            ADD_ROLE({ ...values }).then((res) => {
                if (res.data.code === 0) {
                    message.success("新增成功");
                    closeModal();
                } else {
                    message.error(res.data.msg ?? "新增失败");
                }
            });
        }
    };

    let onSubmitFailed = () => {
        message.error("提交失败，请检查后再试");
    };

    return (
        <Modal
            centered
            title={props.value.configData ? "编辑角色" : "新增角色"}
            open={props.value.show}
            maskClosable={false}
            destroyOnClose
            width="600px"
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
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    scrollToFirstError
                    onFinish={onSubmit}
                    onFinishFailed={onSubmitFailed}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item<FormProps>
                                label="角色名称"
                                name="roleName"
                                rules={[{ required: true, message: "请输入角色名称" }]}
                            >
                                <Input allowClear placeholder="请输入角色名称" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<FormProps>
                                label="备注"
                                name="remark"
                                rules={[{ required: true, message: "请输入备注" }]}
                            >
                                <Input allowClear placeholder="请输入备注" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        </Modal>
    );
};

export default RoleEdit;
