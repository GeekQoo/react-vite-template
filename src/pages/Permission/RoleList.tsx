import React, { useEffect } from "react";
import { App, Button, Card, Space, Table } from "antd";
import { GET_ROLE_LIST } from "@/api/permission.ts";
import type { ColumnsType } from "antd/es/table";
import { useCommonTable } from "@/hooks";

interface TableDataProps {
    id: string | number;
    name: string;
}

let RoleList: React.FC = () => {
    let { message } = App.useApp();

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
        { title: "角色名称", align: "center", dataIndex: "name" }
    ];

    let getTableData = () => {
        setTableLoading(true);
        GET_ROLE_LIST<TableDataProps[]>({
            page: tableParams.pagination?.current,
            size: tableParams.pagination?.pageSize
        }).then((res) => {
            setTableData(res.data.data ?? []);
            setTableParams({
                ...tableParams,
                pagination: {
                    ...tableParams.pagination,
                    total: res.data.total ?? 0
                }
            });
            setTableLoading(false);
        });
    };

    // 批量删除
    let onDelete = () => {
        if (tableSelection.length === 0) {
            message.error("请先选择要删除的数据");
        } else {
            message.error(`您要删除的ID为：${tableSelection.join(",")}`);
        }
    };

    // 新增
    let onAdd = () => {
        message.warning("正在开发中");
    };

    return (
        <div className="role-list-page">
            <Card>
                <Space className="mb">
                    <Button type="primary" onClick={onAdd}>
                        新增
                    </Button>
                    <Button type="primary" danger onClick={onDelete}>
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

export default RoleList;
