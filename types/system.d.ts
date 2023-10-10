declare namespace App {
    // 响应类型
    interface ResponseProps<T = unknown> {
        code: number;
        data?: T;
        total?: Nullable<number>;

        [key: string]: unknown;
    }

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
}
