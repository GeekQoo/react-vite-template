import React, { useEffect, useState } from "react";
import { Card, Table } from "antd";
import { GET_ROLE_LIST } from "@/api/permission.ts";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";

interface TableDataProps {
    id: string | number;
    name: string;
}

interface TableParamProps {
    pagination?: TablePaginationConfig;
}

let RoleList: React.FC = () => {
    let [tableLoading, setTableLoading] = useState<boolean>(false);
    let [tableData, setTableData] = useState<TableDataProps[]>([]);
    let [tableParams, setTableParams] = useState<TableParamProps>({
        pagination: {
            showQuickJumper: true,
            showSizeChanger: true,
            current: 1,
            pageSize: 10,
            total: 0
        }
    });

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

    let handleTableChange = (pagination: TablePaginationConfig) => {
        setTableParams({ pagination });
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setTableData([]);
        }
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
                    rowKey={(row) => row.id}
                />
            </Card>
        </div>
    );
};

export default RoleList;
