import React, { useEffect, useState } from "react";
import { App, Button, Col, Form, Input, Modal, Row, Select, Upload } from "antd";
import { ADD_USER, GET_ROLE_ALL, GET_USER_BY_ID, UPDATE_USER } from "@/api/permission.ts";
import type { SysModalProps } from "#/system";
import type { RoleProps, UserProps } from "#/permission";
import { AvatarUploader } from "@/components/Uploader";

const UserEdit: React.FC<SysModalProps<UserProps>> = (props) => {
    let { message } = App.useApp();

    interface FormProps {
        username: string;
        password: string;
        roles: number[];
        nickname: string;
        email: string;
        phone: string;
        avatar: string;
    }

    // 获取表单实例
    let [formInst] = Form.useForm<FormProps>();

    // 获取详情
    let getDetail = () => {
        if (props.value.configData && props.value.show) {
            GET_USER_BY_ID<FormProps>({ id: props.value.configData.id }).then((res) => {
                if (res.data.code === 0 && res.data.data) {
                    let formData = res.data.data;
                    formInst.setFieldsValue({
                        username: formData.username,
                        password: formData.password,
                        roles: formData.roles,
                        nickname: formData.nickname,
                        email: formData.email,
                        phone: formData.phone,
                        avatar: formData.avatar
                    });
                }
            });
        }
    };

    // 获取选项
    let [roleOptions, setRoleOptions] = useState<RoleProps[]>([]);

    let getOption = () => {
        GET_ROLE_ALL<RoleProps[]>({}).then((res) => {
            setRoleOptions(res.data.data ?? []);
        });
    };

    useEffect(() => {
        if (props.value.show) {
            getOption();
            getDetail();
        }
    }, [props.value]);

    // 关闭弹窗
    let closeModal = () => {
        props.updateValue({ ...props.value, show: false });
        formInst.resetFields();
    };

    // 提交
    let onSubmit = (values: FormProps) => {
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
                                rules={[{ required: !props.value.configData, message: "请输入密码" }]}
                            >
                                <Input.Password allowClear placeholder="请输入密码" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<FormProps>
                                label="所属角色"
                                name="roles"
                                rules={[{ required: true, message: "请选择所属角色" }]}
                            >
                                <Select
                                    fieldNames={{
                                        label: "roleName",
                                        value: "id"
                                    }}
                                    mode="multiple"
                                    allowClear
                                    placeholder="请选择角色"
                                    options={roleOptions}
                                />
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
                        <Col span={24}>
                            <Form.Item<FormProps>
                                label="头像"
                                labelCol={{ span: 3 }}
                                wrapperCol={{ span: 21 }}
                                name="avatar"
                                rules={[{ required: true, message: "请上传头像" }]}
                            >
                                <AvatarUploader />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        </Modal>
    );
};

export default UserEdit;
