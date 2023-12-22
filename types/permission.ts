/*
 * 角色类型
 */

export interface RoleProps {
    id: string | number;
    roleName: string;
    remark: string;
    createdAt: string;
    updatedAt: string;
}

/*
 * 用户类型
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
