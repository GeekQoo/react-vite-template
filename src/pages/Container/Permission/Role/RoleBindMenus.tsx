import React, { useEffect, useState } from "react";
import type { TreeDataNode, TreeProps } from "antd";
import { App, Button, Modal, Tree } from "antd";
import type { SysModalProps } from "#/system";
import type { RoleProps } from "#/permission";
import { GET_MENU_LIST, GET_ROLE_MENU, UPDATE_ROLE } from "@/api/permission.ts";

const RoleBindMenus: React.FC<SysModalProps<RoleProps>> = (props) => {
    const { message } = App.useApp();

    /*
     *  获取菜单树
     */
    const [menuTree, setMenuTree] = useState<TreeDataNode[]>([]);

    const getMenuList = () => {
        GET_MENU_LIST<TreeDataNode[]>({}).then((res) => {
            if (res.data.code === 0) {
                setMenuTree(res.data.data ?? []);
            }
        });
    };

    /*
     *  选中菜单
     */
    const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);

    const getCheckedKeys = () => {
        if (props.value.configData?.id) {
            GET_ROLE_MENU<React.Key[]>({ id: props.value.configData.id }).then((res) => {
                if (res.data.code === 0) {
                    setCheckedKeys(res.data.data ?? []);
                }
            });
        }
    };

    const onCheck: TreeProps["onCheck"] = (checkedKeysValue) => {
        if (Array.isArray(checkedKeysValue)) {
            setCheckedKeys(checkedKeysValue);
        } else {
            setCheckedKeys(checkedKeysValue.checked);
        }
    };

    // 关闭弹窗
    const closeModal = () => {
        props.updateValue({ ...props.value, show: false });
    };

    // 提交
    const onSubmit = () => {
        if (props.value.configData) {
            UPDATE_ROLE({
                id: props.value.configData.id,
                menus: checkedKeys
            }).then((res) => {
                if (res.data.code === 0) {
                    message.success("绑定成功");
                    closeModal();
                } else {
                    message.error(res.data.msg ?? "绑定成功");
                }
            });
        }
    };

    useEffect(() => {
        if (props.value.show) {
            getMenuList();
            getCheckedKeys();
        }
    }, [props.value]);

    return (
        <Modal
            centered
            title="绑定菜单"
            open={props.value.show}
            maskClosable={false}
            destroyOnClose
            width="600px"
            onCancel={closeModal}
            forceRender
            footer={[
                <Button key="submit" type="primary" onClick={() => onSubmit()}>
                    提交
                </Button>,
                <Button key="back" type="primary" danger onClick={() => closeModal()}>
                    取消
                </Button>
            ]}
        >
            <div className="w-100% pt">
                <Tree
                    checkable
                    checkStrictly
                    fieldNames={{ title: "menuName", key: "id", children: "children" }}
                    treeData={menuTree}
                    onCheck={onCheck}
                    checkedKeys={checkedKeys}
                />
            </div>
        </Modal>
    );
};

export default RoleBindMenus;
