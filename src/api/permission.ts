import { httpRequest } from "@/utils/request";
import { useAuthStore } from "@/store";

let { token } = useAuthStore.getState();

// 获取用户列表
export function GET_USER_LIST<T = unknown>(params: UnKnownObject) {
    let { token } = useAuthStore.getState();
    return httpRequest<T>("/system/user", "get", {
        params,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

// 通过ID查询用户
export function GET_USER_BY_ID<T = unknown>(params: UnKnownObject) {
    let { token } = useAuthStore.getState();
    return httpRequest<T>(`/system/user/${params.id}`, "get", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

// 新增用户
export function ADD_USER<T = unknown>(params: UnKnownObject) {
    let { token } = useAuthStore.getState();
    return httpRequest<T>("/system/user", "post", {
        data: params,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

// 修改用户
export function UPDATE_USER<T = unknown>(params: UnKnownObject) {
    let { token } = useAuthStore.getState();
    return httpRequest<T>(`/system/user/${params.id}`, "patch", {
        data: params,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

// 删除用户
export function DELETE_USER<T = unknown>(params: UnKnownObject) {
    let { token } = useAuthStore.getState();
    return httpRequest<T>(`/system/user/${params.id}`, "delete", {
        data: params,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
