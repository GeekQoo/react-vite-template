import { useState } from "react";
import type { TablePaginationConfig } from "antd/es/table";

interface TableParamProps {
    pagination?: TablePaginationConfig;
}

export function useCommonTable<T = UnKnownObject>(rowKeyName?: keyof T) {
    // 表格加载状态
    const [tableLoading, setTableLoading] = useState<boolean>(false);

    // 表格数据
    const [tableData, setTableData] = useState<T[]>([]);

    // 表格参数
    const [tableParams, setTableParams] = useState<TableParamProps>({
        pagination: {
            showQuickJumper: true,
            showSizeChanger: true,
            current: 1,
            pageSize: 10,
            total: 0
        }
    });

    // 表格rowKey
    const tableRowKey = rowKeyName ?? "id";

    // 表格变化事件，包括分页、排序、筛选，目前只处理分页
    const handleTableChange = (pagination: TablePaginationConfig) => {
        setTableParams({ pagination });
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setTableData([]);
        }
    };

    // 表格选中项
    const [tableSelection, setTableSelection] = useState<React.Key[]>([]);

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
