import React, { useEffect, useState } from "react";
import { App, Button, Card, Space, Table } from "antd";
import { DELETE_MENU, GET_MENU_LIST } from "@/api/permission.ts";
import { useCommonTable } from "@/hooks";
import dayjs from "dayjs";
import type { ColumnsType } from "antd/es/table";
import type { SysModalConfig } from "#/system";
import type { NavMenuProps } from "#/permission";
import MenuEdit from "./MenuEdit.tsx";
import { DynamicIcon } from "@/components/Dynamic";

const MenuList: React.FC = () => {
    let { message, modal } = App.useApp();

    let { tableLoading, setTableLoading, tableData, setTableData, tableRowKey, tableSelection, setTableSelection } =
        useCommonTable<NavMenuProps>("id");

    let tableColumns: ColumnsType<NavMenuProps> = [
        { title: "ID", align: "center", dataIndex: "id" },
        {
            title: "菜单图标",
            align: "center",
            dataIndex: "icon",
            render: (_, record) => {
                return record.icon ? <DynamicIcon className="text-20px" icon={record.icon} /> : "/";
            }
        },
        { title: "菜单名称", align: "center", dataIndex: "menuName" },
        { title: "菜单路由", align: "center", dataIndex: "router" },
        { title: "菜单排序", align: "center", dataIndex: "orderNum" },
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
        GET_MENU_LIST<NavMenuProps[]>({}).then((res) => {
            if (res.data.code === 0) {
                setTableData(res.data.data ?? []);
            }
            setTableLoading(false);
        });
    };

    // 批量删除
    let onDelete = (record?: NavMenuProps) => {
        let ids = record ? [record.id] : tableSelection;
        if (ids.length < 1) return message.error("请先选择要删除的数据");
        modal.confirm({
            title: "提示",
            content: "确认删除吗？",
            okText: "确认",
            cancelText: "取消",
            onOk: async () => {
                let res = await DELETE_MENU({ id: ids[0] });
                res.data.code === 0 ? message.success("删除成功") : message.error(res.data.msg ?? "删除失败");
                getTableData();
            },
            onCancel: () => {}
        });
    };

    // 新增编辑
    let [editModal, setEditModal] = useState<SysModalConfig<NavMenuProps>>({
        show: false,
        configData: null
    });

    let openEditModal = (record?: NavMenuProps) => {
        setEditModal({ show: true, configData: record ?? null });
    };

    useEffect(() => {
        getTableData();
    }, [editModal]);

    return (
        <div className="menu-list-page">
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
                    pagination={false}
                    rowKey={tableRowKey}
                    rowSelection={{
                        type: "checkbox",
                        onChange: (selectedRowKeys, selectedRows) => {
                            setTableSelection(selectedRowKeys);
                        }
                    }}
                />
            </Card>
            <MenuEdit value={editModal} updateValue={setEditModal} />
        </div>
    );
};

export default MenuList;
