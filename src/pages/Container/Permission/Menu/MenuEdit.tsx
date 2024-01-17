import React, { useEffect, useState } from "react";
import { App, Button, Col, Form, Input, Modal, Row, Select, TreeSelect } from "antd";
import { ADD_MENU, GET_MENU_BY_ID, GET_MENU_LIST, UPDATE_MENU } from "@/api/permission.ts";
import type { SysModalProps } from "#/system";
import type { MenuProps } from "#/permission";

const MenuEdit: React.FC<SysModalProps<MenuProps>> = (props) => {
    let { message } = App.useApp();

    // 转成可选类型
    type FormProps = Partial<MenuProps>;

    // 获取表单实例
    let [formInst] = Form.useForm<FormProps>();

    // 获取详情
    let getDetail = () => {
        if (props.value.configData && props.value.show) {
            GET_MENU_BY_ID<FormProps>({ id: props.value.configData.id }).then((res) => {
                if (res.data.code === 0 && res.data.data) {
                    let formData = res.data.data;
                    formInst.setFieldsValue({
                        menuName: formData.menuName,
                        parentId: formData.parentId,
                        type: formData.type,
                        router: formData.router
                    });
                }
            });
        }
    };

    // 获取选项
    let [menuOptions, setMenuOptions] = useState<MenuProps[]>([]);

    let getOptions = () => {
        GET_MENU_LIST<MenuProps[]>({}).then((res) => {
            if (res.data.code === 0) {
                setMenuOptions(res.data.data ?? []);
            }
        });
    };

    // 关闭弹窗
    let closeModal = () => {
        props.updateValue({ ...props.value, show: false });
        formInst.resetFields();
    };

    // 提交
    let onSubmit = (values: FormProps) => {
        if (props.value.configData) {
            UPDATE_MENU({
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
            ADD_MENU({ ...values }).then((res) => {
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

    useEffect(() => {
        if (props.value.show) {
            getOptions();
            getDetail();
        }
    }, [props.value]);

    return (
        <Modal
            centered
            title={props.value.configData ? "编辑菜单" : "新增菜单"}
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
                                label="菜单名称"
                                name="menuName"
                                rules={[{ required: true, message: "请输入菜单名称" }]}
                            >
                                <Input allowClear placeholder="请输入菜单名称" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<FormProps>
                                label="父级菜单"
                                name="parentId"
                                rules={[{ required: true, message: "请选择父级菜单" }]}
                            >
                                <TreeSelect
                                    fieldNames={{ label: "menuName", value: "id", children: "children" }}
                                    allowClear
                                    placeholder="请选择父级菜单，不选则为顶级菜单"
                                    treeData={menuOptions}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<FormProps>
                                label="菜单类型"
                                name="type"
                                rules={[{ required: true, message: "请选择菜单类型" }]}
                            >
                                <Select
                                    allowClear
                                    placeholder="请选择菜单类型"
                                    options={[
                                        { label: "目录", value: 1 },
                                        { label: "菜单", value: 2 },
                                        { label: "按钮", value: 3 }
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<FormProps>
                                label="菜单路由"
                                name="router"
                                rules={[{ required: true, message: "请输入菜单路由" }]}
                            >
                                <Input allowClear placeholder="请输入菜单路由" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        </Modal>
    );
};

export default MenuEdit;
