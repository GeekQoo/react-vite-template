import React, { useEffect } from "react";
import { App, Button, Card, Col, Form, Input, InputNumber, Row, Space } from "antd";
import { ADD_BANNER, GET_BANNER_BY_ID, UPDATE_BANNER } from "@/api/settings";
import type { BannerProps } from "#/modules/settings";
import { ImageUploader } from "@/components/Uploader";
import { useNavigate, useParams } from "react-router-dom";

const BannerEdit: React.FC = () => {
    const { message } = App.useApp();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    // 转成可选类型
    type FormProps = Partial<BannerProps>;

    // 获取表单实例
    const [formInst] = Form.useForm<FormProps>();

    // 获取详情
    const getDetail = () => {
        GET_BANNER_BY_ID<FormProps>({ id }).then((res) => {
            if (res.data.code === 0 && res.data.data) {
                const formData = res.data.data;
                formInst.setFieldsValue({
                    title: formData.title,
                    description: formData.description,
                    imageUrl: formData.imageUrl,
                    linkUrl: formData.linkUrl,
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
            UPDATE_BANNER({
                id,
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
            ADD_BANNER({ ...values }).then((res) => {
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
        <div className="banner-page">
            <Card
                title={
                    <div className="flex-y-center">
                        <div>{id ? "编辑" : "新增"}幻灯片</div>
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
            </Card>
        </div>
    );
};

export default BannerEdit;
