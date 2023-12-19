/*
 * @description: 系统相关的类型定义
 */

declare namespace System {
    interface MenuProps {
        label: string;
        key: string | number;
        icon: string;
        children?: MenuProps[];
    }

    // 用户信息
    interface UserDataProps {
        username?: string;
        avatar?: string;
        menu?: MenuProps[];

        [key: string]: unknown;
    }

    // Modal操作类型
    interface ModalConfigProps<T = UnKnownObject> {
        show: boolean;
        configData: Nullable<T>;
    }
}
