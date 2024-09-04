import React, { useEffect, useState } from "react";
import { App, Button, Card, Col, Form, Input, Row, Select, Space, TreeSelect } from "antd";
import type { ArticleCategoryProps, ArticleProps, ArticleTagProps } from "#/modules/article";
import {
    ADD_ARTICLE,
    GET_ARTICLE_BY_ID,
    GET_ARTICLE_CATEGORY_LIST,
    GET_ARTICLE_TAG_ALL,
    UPDATE_ARTICLE
} from "@/api/article.ts";
import { RichEditor } from "@/components/RichEditor";
import { ImageUploader } from "@/components/Uploader";
import { useNavigate, useParams } from "react-router-dom";

const ArticleEdit: React.FC = () => {
    const { message } = App.useApp();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    // 转成可选类型
    type FormProps = Partial<ArticleProps>;

    // 获取表单实例
    const [formInst] = Form.useForm<FormProps>();

    // 获取详情
    const getDetail = () => {
        GET_ARTICLE_BY_ID<FormProps>({ id }).then((res) => {
            if (res.data.code === 0 && res.data.data) {
                const formData = res.data.data;
                formInst.setFieldsValue({
                    title: formData.title,
                    content: formData.content,
                    summary: formData.summary,
                    thumbnail: formData.thumbnail,
                    categoryId: formData.categoryId,
                    tagIds: formData.tagIds
                });
            }
        });
    };

    // 获取选项
    const [categoryIdOptions, setCategoryIdOptions] = useState<ArticleCategoryProps[]>([]);
    const [tagIdsOptions, setTagIdsOptions] = useState<ArticleTagProps[]>([]);

    const getOptions = () => {
        GET_ARTICLE_CATEGORY_LIST<ArticleCategoryProps[]>({}).then((res) => {
            if (res.data.code === 0) setCategoryIdOptions(res.data.data ?? []);
        });
        GET_ARTICLE_TAG_ALL<ArticleTagProps[]>().then((res) => {
            if (res.data.code === 0) setTagIdsOptions(res.data.data ?? []);
        });
    };

    useEffect(() => {
        getOptions();
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
            UPDATE_ARTICLE({
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
            ADD_ARTICLE({ ...values }).then((res) => {
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
        <div className="article-page">
            <Card
                title={
                    <div className="flex-y-center">
                        <div>{id ? "编辑" : "新增"}文章</div>
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
                    layout="vertical"
                    form={formInst}
                    scrollToFirstError
                    onFinish={onSubmit}
                    onFinishFailed={onSubmitFailed}
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item<FormProps>
                                label="文章标题"
                                name="title"
                                rules={[{ required: true, message: "请输入文章标题" }]}
                            >
                                <Input allowClear placeholder="请输入文章标题" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<FormProps>
                                label="所属分类"
                                name="categoryId"
                                rules={[{ required: true, message: "请选择所属分类" }]}
                            >
                                <TreeSelect
                                    fieldNames={{ label: "categoryName", value: "id", children: "children" }}
                                    allowClear
                                    placeholder="请选择所属分类"
                                    treeData={categoryIdOptions}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<FormProps>
                                label="文章标签"
                                name="tagIds"
                                rules={[{ required: true, message: "请选择文章标签" }]}
                            >
                                <Select
                                    fieldNames={{
                                        label: "tagName",
                                        value: "id"
                                    }}
                                    mode="multiple"
                                    allowClear
                                    placeholder="请选择文章标签"
                                    options={tagIdsOptions}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item<FormProps>
                                label="特色图"
                                name="thumbnail"
                                rules={[{ required: false, message: "请上传特色图" }]}
                            >
                                <ImageUploader type="thumbnail" aspect={16 / 9} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item<FormProps>
                                label="文章概述"
                                name="summary"
                                rules={[{ required: false, message: "请输入文章概述" }]}
                            >
                                <Input.TextArea
                                    autoSize
                                    maxLength={200}
                                    showCount
                                    allowClear
                                    placeholder="请输入文章概述，不填则自动截取"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item<FormProps>
                                label="文章内容"
                                name="content"
                                rules={[{ required: true, message: "请输入文章内容" }]}
                            >
                                <RichEditor />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </div>
    );
};

export default ArticleEdit;
