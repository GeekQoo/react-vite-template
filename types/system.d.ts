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
