import React from "react";

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
 * Table操作类型
 */
export interface SysTableBase {
    id: number;
    createdAt: string;
    updatedAt: string;
}

/*
 * value更新类型
 */
export interface SysValueUpdate {
    value?: string;
    onChange?: (value: string) => void;
}

/*
 * route类型
 */
export interface SysRouteProps {
    path: string;
    fullPath?: string;
    title?: string;
    children?: SysRouteProps[];
    element?: React.ReactNode;
    params?: Record<string, string>;
}
