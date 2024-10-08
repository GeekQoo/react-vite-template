import React, { useEffect, useState } from "react";
import { App, Button, Card, Col, Form, Input, Row, Select, Space } from "antd";
import { ADD_USER, GET_ROLE_ALL, GET_USER_BY_ID, UPDATE_USER } from "@/api/permission.ts";
import type { RoleProps } from "#/permission";
import { AvatarUploader } from "@/components/Uploader";
import { useNavigate, useParams } from "react-router-dom";

const UserEdit: React.FC = () => {
    const { message } = App.useApp();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

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
    const [formInst] = Form.useForm<FormProps>();

    // 获取详情
    const getDetail = () => {
        GET_USER_BY_ID<FormProps>({ id }).then((res) => {
            if (res.data.code === 0 && res.data.data) {
                const formData = res.data.data;
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
    };

    // 获取选项
    const [roleOptions, setRoleOptions] = useState<RoleProps[]>([]);

    const getOption = () => {
        GET_ROLE_ALL<RoleProps[]>().then((res) => {
            setRoleOptions(res.data.data ?? []);
        });
    };

    useEffect(() => {
        getOption();
    }, []);

    useEffect(() => {
        if (id) getDetail();
    }, [id]);

    const onBack = () => {
        navigate(-1);
    };

    // 提交
    const onSubmit = (values: FormProps) => {
        if (id) {
            UPDATE_USER({
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
            ADD_USER({ ...values }).then((res) => {
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

    return (
        <div className="user-page">
            <Card
                title={
                    <div className="flex-y-center">
                        <div>{id ? "编辑" : "新增"}用户</div>
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
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 17 }}
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
                                rules={[{ required: !id, message: "请输入密码" }]}
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
                        <Col span={12}>
                            <Form.Item<FormProps>
                                label="头像"
                                name="avatar"
                                rules={[{ required: true, message: "请上传头像" }]}
                            >
                                <AvatarUploader />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </div>
    );
};

export default UserEdit;
