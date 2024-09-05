import React, { useEffect } from "react";
import { App, Button, Card, Form, Space, Table } from "antd";
import { DELETE_USER, GET_ROLE_ALL, GET_USER_LIST } from "@/api/permission.ts";
import { useCommonTable } from "@/hooks";
import dayjs from "dayjs";
import type { ColumnsType } from "antd/es/table";
import type { RoleProps, UserProps } from "#/permission";
import { useNavigate } from "react-router-dom";
import { ProFormSelect, ProFormText, QueryFilter } from "@ant-design/pro-components";

const UserList: React.FC = () => {
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
    } = useCommonTable<UserProps>("id");

    const tableColumns: ColumnsType<UserProps> = [
        { title: "ID", align: "center", dataIndex: "id" },
        { title: "用户名", align: "center", dataIndex: "username" },
        {
            title: "昵称",
            align: "center",
            dataIndex: "nickname",
            render: (_, record) => record.nickname ?? "暂无"
        },
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
        GET_USER_LIST<{
            list: UserProps[];
            pagination: {
                total: number;
            };
        }>({
            page: tableParams.pagination?.current,
            size: tableParams.pagination?.pageSize,
            ...queryFilterInst.getFieldsValue()
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
    const onDelete = (record?: UserProps) => {
        const ids = record ? [record.id] : tableSelection;
        if (ids.length < 1) return message.error("请先选择要删除的数据");
        modal.confirm({
            title: "提示",
            content: "确认删除吗？",
            okText: "确认",
            cancelText: "取消",
            onOk: async () => {
                const res = await DELETE_USER({ id: ids[0] });
                res.data.code === 0 ? message.success("删除成功") : message.error(res.data.msg ?? "删除失败");
                getTableData();
            },
            onCancel: () => {}
        });
    };

    // 新增编辑
    const toEdit = (record?: UserProps) => {
        record ? navigate(`/permission/user/${record?.id}`) : navigate("/permission/user/add");
    };

    useEffect(() => {
        getTableData();
    }, [tableParams.pagination?.current, tableParams.pagination?.pageSize]);

    // 搜索表单
    const [queryFilterInst] = Form.useForm<Partial<UserProps>>();

    return (
        <div className="user-page">
            <Card classNames={{ body: "p-0!" }}>
                <QueryFilter
                    form={queryFilterInst}
                    onFinish={() => {
                        getTableData();
                    }}
                >
                    <ProFormText label="用户名" name="username" />
                    <ProFormSelect
                        label="所属角色"
                        name="roles"
                        mode="multiple"
                        placeholder="请选择角色"
                        fieldProps={{
                            fieldNames: { label: "roleName", value: "id" }
                        }}
                        request={async () => {
                            const res = await GET_ROLE_ALL<RoleProps[]>();
                            return res.data.data ?? [];
                        }}
                    />
                </QueryFilter>
            </Card>
            <Card className="mt">
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

export default UserList;
