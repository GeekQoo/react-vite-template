import React, { useEffect } from "react";
import { App, Button, Col, Form, Input, Modal, Row } from "antd";
import type { PropsType } from "./types";
import { ADD_USER, GET_USER_BY_ID, UPDATE_USER } from "@/api/permission.ts";

const UserEdit: React.FC<PropsType> = (props) => {
    let { message } = App.useApp();

    interface FormProps {
        username: string;
        password: string;
        nickname: string;
        email: string;
        phone: string;
    }

    // 获取表单实例
    let [formInst] = Form.useForm();

    // 获取详情
    let getDetail = () => {
        if (props.value.configData) {
            GET_USER_BY_ID<FormProps>({ id: props.value.configData.id }).then((res) => {
                if (res.data.code === 0 && res.data.data) {
                    let formData = res.data.data;
                    formInst.setFieldsValue({
                        username: formData.username,
                        password: formData.password,
                        nickname: formData.nickname,
                        email: formData.email,
                        phone: formData.phone
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
    };

    // 提交
    let onSubmit = (values: FormProps) => {
        console.log("values", values);
        if (props.value.configData) {
            UPDATE_USER({
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
            ADD_USER({ ...values }).then((res) => {
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
            title={props.value.configData ? "编辑用户" : "新增用户"}
            open={props.value.show}
            maskClosable={false}
            destroyOnClose
            width="600px"
            onCancel={closeModal}
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
                                label="用户名"
                                name="username"
                                rules={[{ required: true, message: "请输入用户名" }]}
                            >
                                <Input allowClear placeholder="请输入用户名" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<FormProps>
                                label="登录密码"
                                name="password"
                                rules={[{ required: true, message: "请输入密码" }]}
                            >
                                <Input.Password allowClear placeholder="请输入密码" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<FormProps>
                                label="昵称"
                                name="nickname"
                                rules={[{ required: false, message: "请输入昵称" }]}
                            >
                                <Input allowClear placeholder="请输入昵称" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<FormProps>
                                label="手机号"
                                name="phone"
                                rules={[{ required: false, message: "请输入手机号" }]}
                            >
                                <Input allowClear placeholder="请输入手机号" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<FormProps>
                                label="邮箱"
                                name="email"
                                rules={[{ required: false, message: "请输入邮箱" }]}
                            >
                                <Input allowClear placeholder="请输入邮箱" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        </Modal>
    );
};

export default UserEdit;
