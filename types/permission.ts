/*
 * 角色类型
 * 接口返回的数据类型
 */

export interface RoleProps {
    id: string | number;
    roleName: string;
    remark: string;
    createdAt: string;
    updatedAt: string;
}

/*
 * 菜单类型
 * 接口返回的数据类型
 */
export interface MenuProps {
    id: number; // 菜单ID
    parentId: number; // 父级菜单ID
    menuName: string; // 菜单名称
    type: 1 | 2 | 3; // 1: 目录 2: 菜单 3: 按钮
    router: string; // 菜单路由
    createdAt: string; // 创建时间
    updatedAt: string; // 更新时间
}

/*
 * 用户类型
 * UserMenuProps为系统菜单类型，而非接口返回的数据类型
 */

export interface UserProps {
    id: string | number;
    username: string;
    password: string;
    nickname: string;
    email: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
}

interface UserMenuProps {
    label: string;
    key: string | number;
    icon?: string;
    children?: UserMenuProps[];
}

export interface UserDataProps {
    username?: string;
    avatar?: string;
    menu?: UserMenuProps[];

    [key: string]: unknown;
}
