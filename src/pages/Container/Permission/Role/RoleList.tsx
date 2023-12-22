import React, { useEffect, useState } from "react";
import { App, Button, Card, Space, Table } from "antd";
import { DELETE_ROLE, GET_ROLE_LIST } from "@/api/permission.ts";
import type { ColumnsType } from "antd/es/table";
import type { RowProps } from "./types";
import { useCommonTable } from "@/hooks";
import RoleEdit from "./RoleEdit.tsx";
import { ModalConfigProps } from "#/system";
import * as dayjs from "dayjs";

const RoleList: React.FC = () => {
    let { message, modal } = App.useApp();

    let {
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
    } = useCommonTable<RowProps>("id");

    useEffect(() => {
        getTableData();
    }, [tableParams.pagination?.current, tableParams.pagination?.pageSize]);

    let tableColumns: ColumnsType<RowProps> = [
        { title: "ID", align: "center", dataIndex: "id" },
        { title: "角色名称", align: "center", dataIndex: "roleName" },
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

    let getTableData = () => {
        setTableLoading(true);
        GET_ROLE_LIST<{
            list: RowProps[];
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
    let onDelete = (record?: RowProps) => {
        let ids = record ? [record.id] : tableSelection;
        if (ids.length < 1) return message.error("请先选择要删除的数据");
        modal.confirm({
            title: "提示",
            content: "确认删除吗？",
            okText: "确认",
            cancelText: "取消",
            onOk: async () => {
                let res = await DELETE_ROLE({ id: ids[0] });
                res.data.code === 0 ? message.success("删除成功") : message.error(res.data.msg ?? "删除失败");
                getTableData();
            },
            onCancel: () => {}
        });
    };

    // 新增编辑
    let [editModal, setEditModal] = useState<ModalConfigProps<RowProps>>({
        show: false,
        configData: null
    });

    let openEditModal = (record?: RowProps) => {
        setEditModal({ show: true, configData: record ?? null });
    };

    useEffect(() => {
        getTableData();
    }, [editModal]);

    return (
        <div className="role-list-page">
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
                        onChange: (selectedRowKeys, selectedRows) => {
                            setTableSelection(selectedRowKeys);
                        }
                    }}
                />
            </Card>
            <RoleEdit value={editModal} updateValue={setEditModal} />
        </div>
    );
};

export default RoleList;