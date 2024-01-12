import { useState } from "react";
import type { TablePaginationConfig } from "antd/es/table";

interface TableParamProps {
    pagination?: TablePaginationConfig;
}

export function useCommonTable<T = UnKnownObject>(rowKeyName?: keyof T) {
    // 表格加载状态
    let [tableLoading, setTableLoading] = useState<boolean>(false);

    // 表格数据
    let [tableData, setTableData] = useState<T[]>([]);

    // 表格参数
    let [tableParams, setTableParams] = useState<TableParamProps>({
        pagination: {
            showQuickJumper: true,
            showSizeChanger: true,
            current: 1,
            pageSize: 10,
            total: 0
        }
    });

    // 表格rowKey
    let tableRowKey = (row: T) => (rowKeyName ? row[rowKeyName] : "");

    // 表格变化事件，包括分页、排序、筛选，目前只处理分页
    let handleTableChange = (pagination: TablePaginationConfig) => {
        setTableParams({ pagination });
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setTableData([]);
        }
    };

    // 表格选中项
    let [tableSelection, setTableSelection] = useState<React.Key[]>([]);

    return {
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
    };
}
