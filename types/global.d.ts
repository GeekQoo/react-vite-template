/*
 * 常见复用类型
 */

declare interface UnKnownObject {
    id?: string | number;

    [key: string]: unknown;
}

declare type Nullable<T> = T | null;
