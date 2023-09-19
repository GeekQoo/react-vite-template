declare namespace App {
    // 响应类型
    interface ResponseProps<T = unknown> {
        code: number;
        data?: T;
        total?: Nullable<number>;

        [key: string]: unknown;
    }

    // 用户信息
    interface UserDataProps {
        username?: string;
        avatar?: string;

        [key: string]: unknown;
    }
}
