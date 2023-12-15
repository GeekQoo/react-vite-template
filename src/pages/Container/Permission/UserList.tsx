import React, { useEffect } from "react";
import { App, Button, Card, Space, Table } from "antd";
import { GET_USER_LIST } from "@/api/permission.ts";
import type { ColumnsType } from "antd/es/table";
import { useCommonTable } from "@/hooks";

interface TableDataProps {
    id: string | number;
    username: string;

    [key: string]: any;
}

let UserList: React.FC = () => {
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
    } = useCommonTable<TableDataProps>("id");

    useEffect(() => {
        getTableData();
    }, [tableParams.pagination?.current, tableParams.pagination?.pageSize]);

    let tableColumns: ColumnsType<TableDataProps> = [
        { title: "ID", align: "center", dataIndex: "id" },
        { title: "用户名", align: "center", dataIndex: "username" },
        {
            title: "操作",
            key: "action",
            align: "center",
            width: 180,
            render: (_, record) => (
                <Space>
                    <Button type="primary" ghost onClick={() => onEdit(record)}>
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
        GET_USER_LIST<{
            list: TableDataProps[];
            pagination: {
                total: number;
            };
        }>({
            page: tableParams.pagination?.current,
            size: tableParams.pagination?.pageSize
        }).then((res) => {
            if (res.data.code === 0) {
                console.log(res.data);
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
    let onDelete = (record?: TableDataProps) => {
        let ids = record ? [record.id] : tableSelection;
        if (ids.length < 1) return message.error("请先选择要删除的数据");
        modal.confirm({
            title: "提示",
            content: "确认删除吗？",
            okText: "确认",
            cancelText: "取消",
            onOk() {
                message.success(`删除成功，您删除的ID为：${ids.join(",")}`);
            },
            onCancel() {
                message.info("您取消了删除");
            }
        });
    };

    // 新增
    let onAdd = () => {
        message.warning("正在开发中");
    };

    // 编辑
    let onEdit = (record: TableDataProps) => {
        message.warning(`您要编辑的ID为：${record.id}`);
    };

    return (
        <div className="user-list-page">
            <Card>
                <Space className="mb">
                    <Button type="primary" onClick={onAdd}>
                        新增
                    </Button>
                    <Button type="primary" danger onClick={() => onDelete()}>
                        批量删除
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
        </div>
    );
};

export default UserList;
