import React, { useEffect, useState } from "react";
import { Card, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { GET_ROLE_LIST } from "@/api/perimission.ts";

interface RowProps {
    id: string | number;
    name: string;
}

let RoleList: React.FC = () => {
    useEffect(() => {
        getTableData();
    }, []);

    let [tableData, setTableData] = useState<RowProps[]>([]);

    let getTableData = () => {
        GET_ROLE_LIST<RowProps[]>({}).then((res) => {
            setTableData(res.data.data ?? []);
        });
    };

    let tableColumns: ColumnsType<RowProps> = [
        { title: "ID", align: "center", dataIndex: "id" },
        { title: "角色名称", align: "center", dataIndex: "name" }
    ];

    return (
        <div className="role-list-page">
            <Card>
                <Table bordered dataSource={tableData} columns={tableColumns} />
            </Card>
        </div>
    );
};

export default RoleList;
