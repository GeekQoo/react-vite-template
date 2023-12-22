/*
 * Modal操作类型
 */

export interface SysModalConfig<T = UnKnownObject> {
    show: boolean;
    configData: Nullable<T>;
}

export interface SysModalProps<T> {
    value: SysModalConfig<T>;
    updateValue: (value: SysModalConfig<T>) => void;
}

/*
 * 用户信息类型
 */

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
