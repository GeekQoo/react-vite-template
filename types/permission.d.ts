import { SysTableBase } from "#/system";

/*
 * 角色类型
 */
export interface RoleProps extends SysTableBase {
    roleName: string;
    remark: string;
}

/*
 * 菜单类型
 * 用NavMenuProps避免和antd的MenuProps冲突
 * @params type 1: 目录 2: 菜单 3: 按钮
 */
export interface NavMenuProps extends SysTableBase {
    parentId: number;
    menuName: string;
    type: 1 | 2 | 3;
    icon: string;
    router: string;
    children?: NavMenuProps[];
}

/*
 * 用户类型
 */
export interface UserProps extends SysTableBase {
    username: string;
    password: string;
    avatar: string;
    nickname: string;
    email: string;
    phone: string;
}

/*
 * 当前用户类型
 */
export interface UserDataProps extends UserProps {
    menus: NavMenuProps[];
    roleNames: string[];
}
