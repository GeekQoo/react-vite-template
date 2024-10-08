import React, { useEffect, useState } from "react";
import { App, Button, Card, Space, Table } from "antd";
import { useCommonTable } from "@/hooks";
import ArticleTagEdit from "./ArticleTagEdit.tsx";
import dayjs from "dayjs";
import type { ColumnsType } from "antd/es/table";
import type { SysModalConfig } from "#/system";
import type { ArticleTagProps } from "#/modules/article";
import { DELETE_ARTICLE_TAG, GET_ARTICLE_TAG_LIST } from "@/api/article.ts";

const ArticleTagList: React.FC = () => {
    const { message, modal } = App.useApp();

    const {
        tableLoading,
        setTableLoading,
        tableData,
        setTableData,
        tableParams,
        setTableParams,
        tableRowKey,
        handleTableChange,
        tableSelection,
        setTableSelection
    } = useCommonTable<ArticleTagProps>("id");

    const tableColumns: ColumnsType<ArticleTagProps> = [
        { title: "ID", align: "center", dataIndex: "id" },
        { title: "标签名称", align: "center", dataIndex: "tagName" },
        {
            title: "创建时间",
            align: "center",
            dataIndex: "createdAt",
            render: (_, record) => dayjs(record.createdAt).format("YYYY-MM-DD HH:mm:ss")
        },
        {
            title: "更新时间",
            align: "center",
            dataIndex: "updatedAt",
            render: (_, record) => dayjs(record.updatedAt).format("YYYY-MM-DD HH:mm:ss")
        },
        {
            title: "操作",
            key: "action",
            align: "center",
            width: 180,
            render: (_, record) => (
                <Space>
                    <Button type="primary" ghost onClick={() => openEditModal(record)}>
                        编辑
                    </Button>

                    <Button type="primary" danger ghost onClick={() => onDelete(record)}>
                        删除
                    </Button>
                </Space>
            )
        }
    ];

    const getTableData = () => {
        setTableLoading(true);
        GET_ARTICLE_TAG_LIST<{
            list: ArticleTagProps[];
            pagination: {
                total: number;
            };
        }>({
            page: tableParams.pagination?.current,
            size: tableParams.pagination?.pageSize
        }).then((res) => {
            if (res.data.code === 0) {
                setTableData(res.data.data?.list ?? []);
            }
            setTableParams({
                ...tableParams,
                pagination: {
                    ...tableParams.pagination,
                    total: res.data.data?.pagination.total ?? 0
                }
            });
            setTableLoading(false);
        });
    };

    // 批量删除
    const onDelete = (record?: ArticleTagProps) => {
        const ids = record ? [record.id] : tableSelection;
        if (ids.length < 1) return message.error("请先选择要删除的数据");
        modal.confirm({
            title: "提示",
            content: "确认删除吗？",
            okText: "确认",
            cancelText: "取消",
            onOk: async () => {
                const res = await DELETE_ARTICLE_TAG({ id: ids[0] });
                res.data.code === 0 ? message.success("删除成功") : message.error(res.data.msg ?? "删除失败");
                getTableData();
            },
            onCancel: () => {}
        });
    };

    // 新增编辑
    const [editModal, setEditModal] = useState<SysModalConfig<ArticleTagProps>>({
        show: false,
        configData: null
    });

    const openEditModal = (record?: ArticleTagProps) => {
        setEditModal({ show: true, configData: record ?? null });
    };

    useEffect(() => {
        getTableData();
    }, [tableParams.pagination?.current, tableParams.pagination?.pageSize, editModal]);

    return (
        <div className="article-tag-page">
            <Card>
                <Space className="mb">
                    <Button type="primary" onClick={() => openEditModal()}>
                        新增
                    </Button>
                </Space>
                <Table
                    bordered
                    dataSource={tableData}
                    loading={tableLoading}
                    columns={tableColumns}
                    pagination={tableParams.pagination}
                    onChange={handleTableChange}
                    rowKey={tableRowKey}
                    rowSelection={{
                        type: "checkbox",
                        onChange: (selectedRowKeys) => {
                            setTableSelection(selectedRowKeys);
                        }
                    }}
                />
            </Card>
            <ArticleTagEdit value={editModal} updateValue={setEditModal} />
        </div>
    );
};

export default ArticleTagList;
