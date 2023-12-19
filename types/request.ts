/*
 * @description: 请求相关的类型定义
 */

declare namespace Request {
    // 响应类型
    interface ResponseProps<T = unknown> {
        code: number;
        data?: T;
        msg?: string;
        total?: Nullable<number>;

        [key: string]: unknown;
    }
}
