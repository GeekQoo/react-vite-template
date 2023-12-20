/*
 * @description: 系统相关的类型定义
 */

// Modal操作类型
export interface ModalConfigProps<T = UnKnownObject> {
    show: boolean;
    configData: Nullable<T>;
}

// 用户信息类型
interface UserMenuProps {
    label: string;
    key: string | number;
    icon: string;
    children?: UserMenuProps[];
}

export interface UserDataProps {
    username?: string;
    avatar?: string;
    menu?: UserMenuProps[];

    [key: string]: unknown;
}
