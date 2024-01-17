/*
 * 角色类型
 * 接口返回的数据类型
 */

export interface RoleProps {
    id: number;
    roleName: string;
    remark: string;
    createdAt: string;
    updatedAt: string;
}

/*
 * 菜单类型
 */
export interface MenuProps {
    id: number; // 菜单ID
    parentId: number; // 父级菜单ID
    menuName: string; // 菜单名称
    type: 1 | 2 | 3; // 1: 目录 2: 菜单 3: 按钮
    icon: string; // 菜单图标
    router: string; // 菜单路由
    createdAt: string;
    updatedAt: string;
    children?: MenuProps[]; // 子菜单
}

/*
 * 用户类型
 */

export interface UserProps {
    id: number;
    username: string;
    password: string;
    avatar: string;
    nickname: string;
    email: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
}

/*
 * 当前用户类型
 */
export interface UserDataProps extends UserProps {
    menus?: MenuProps[];
}
