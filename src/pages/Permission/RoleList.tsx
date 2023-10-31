import React, { useEffect } from "react";
import { Card, Table } from "antd";
import { GET_ROLE_LIST } from "@/api/permission.ts";
import type { ColumnsType } from "antd/es/table";
import { useCommonTable } from "@/hooks";

interface TableDataProps {
    id: string | number;
    name: string;
}

let RoleList: React.FC = () => {
    let {
        tableLoading,
        setTableLoading,
        tableData,
        setTableData,
        tableParams,
        setTableParams,
        tableRowKey,
        handleTableChange
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

    return (
        <div className="role-list-page">
            <Card>
                <Table
                    bordered
                    dataSource={tableData}
                    loading={tableLoading}
                    columns={tableColumns}
                    pagination={tableParams.pagination}
                    onChange={handleTableChange}
                    rowKey={tableRowKey}
                />
            </Card>
        </div>
    );
};

export default RoleList;
