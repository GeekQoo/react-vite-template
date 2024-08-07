import { SysTableBase } from "#/system";

/*
 * 幻灯片类型
 */

export interface BannerProps extends SysTableBase {
    id?: number;
    title: string;
    description?: string;
    imageUrl: string;
    linkUrl?: string;
    sort: number;
}

/*
 * 全局设置类型
 */
export interface SettingsGlobalProps extends SysTableBase {
    id?: number;
    name: string;
    key: string;
    value: string;
    sort: number;
}
