import React, { useEffect } from "react";
import { App, Button, Card, Space, Table, Typography } from "antd";
import { useCommonTable } from "@/hooks";
import dayjs from "dayjs";
import type { ColumnsType } from "antd/es/table";
import { DELETE_GLOBAL_SETTINGS, GET_GLOBAL_SETTINGS_LIST } from "@/api/settings.ts";
import type { SettingsGlobalProps } from "#/modules/settings";
import { useNavigate } from "react-router-dom";

const GlobalSettingsList: React.FC = () => {
    const { message, modal } = App.useApp();
    const navigate = useNavigate();

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
    } = useCommonTable<SettingsGlobalProps>("id");

    const tableColumns: ColumnsType<SettingsGlobalProps> = [
        { title: "ID", align: "center", dataIndex: "id" },
        { title: "设置项名", align: "center", dataIndex: "name" },
        { title: "设置项键", align: "center", dataIndex: "key" },
        {
            title: "设置类型",
            align: "center",
            dataIndex: "type",
            render: (row) => {
                if (row === 0) {
                    return <Typography.Text>普通文本</Typography.Text>;
                } else if (row === 1) {
                    return <Typography.Text type="warning">富文本</Typography.Text>;
                } else if (row === 2) {
                    return <Typography.Text type="success">图片</Typography.Text>;
                } else {
                    return <Typography.Text type="danger">未知</Typography.Text>;
                }
            }
        },
        {
            title: "创建时间",
            align: "center",
            dataIndex: "createdAt",
            width: 180,
            render: (_, record) => dayjs(record.createdAt).format("YYYY-MM-DD HH:mm:ss")
        },
        {
            title: "更新时间",
            align: "center",
            dataIndex: "updatedAt",
            width: 180,
            render: (_, record) => dayjs(record.updatedAt).format("YYYY-MM-DD HH:mm:ss")
        },
        {
            title: "操作",
            key: "action",
            align: "center",
            width: 180,
            render: (_, record) => (
                <Space>
                    <Button type="primary" ghost onClick={() => toEdit(record)}>
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
        GET_GLOBAL_SETTINGS_LIST<{
            list: SettingsGlobalProps[];
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
    const onDelete = (record?: SettingsGlobalProps) => {
        let ids = record ? [record.id] : tableSelection;
        if (ids.length < 1) return message.error("请先选择要删除的数据");
        modal.confirm({
            title: "提示",
            content: "确认删除吗？",
            okText: "确认",
            cancelText: "取消",
            onOk: async () => {
                let res = await DELETE_GLOBAL_SETTINGS({ id: ids[0] });
                res.data.code === 0 ? message.success("删除成功") : message.error(res.data.msg ?? "删除失败");
                getTableData();
            },
            onCancel: () => {}
        });
    };

    // 新增编辑
    const toEdit = (record?: SettingsGlobalProps) => {
        record ? navigate(`/settings/global/${record?.id}`) : navigate("/settings/global/add");
    };

    useEffect(() => {
        getTableData();
    }, [tableParams.pagination?.current, tableParams.pagination?.pageSize]);

    return (
        <div className="global-settings-page">
            <Card>
                <Space className="mb">
                    <Button type="primary" onClick={() => toEdit()}>
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
        </div>
    );
};

export default GlobalSettingsList;
