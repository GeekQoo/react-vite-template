import { useAuthStore } from "@/store";
import { httpRequest } from "@/utils/request";

/*
 * 幻灯片管理
 */

// 获取幻灯片列表
export function GET_BANNER_LIST<T = unknown>(params: UnKnownObject) {
    let { token } = useAuthStore.getState();
    return httpRequest<T>("/settings/banner", "get", {
        params,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

// 获取全部幻灯片
export function GET_BANNER_ALL<T = unknown>() {
    let { token } = useAuthStore.getState();
    return httpRequest<T>("/settings/banner/all", "get", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

// 通过ID查询幻灯片
export function GET_BANNER_BY_ID<T = unknown>(params: UnKnownObject) {
    let { token } = useAuthStore.getState();
    return httpRequest<T>(`/settings/banner/${params.id}`, "get", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

// 删除幻灯片
export function DELETE_BANNER<T = unknown>(params: UnKnownObject) {
    let { token } = useAuthStore.getState();
    return httpRequest<T>(`/settings/banner/${params.id}`, "delete", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

// 新增幻灯片
export function ADD_BANNER<T = unknown>(params: UnKnownObject) {
    let { token } = useAuthStore.getState();
    return httpRequest<T>("/settings/banner", "post", {
        data: params,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

// 更新幻灯片
export function UPDATE_BANNER<T = unknown>(params: UnKnownObject) {
    let { token } = useAuthStore.getState();
    return httpRequest<T>(`/settings/banner/${params.id}`, "patch", {
        data: params,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
