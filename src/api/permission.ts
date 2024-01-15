import { httpRequest } from "@/utils/request";
import { useAuthStore } from "@/store";

let { token } = useAuthStore.getState();

/*
 * 用户管理
 * USER
 */

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

/*
 * 角色管理
 * ROLE
 */

// 获取角色列表
export function GET_ROLE_LIST<T = unknown>(params: UnKnownObject) {
    let { token } = useAuthStore.getState();
    return httpRequest<T>("/system/role", "get", {
        params,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

// 获取所有角色
export function GET_ROLE_ALL<T = unknown>(params: UnKnownObject) {
    let { token } = useAuthStore.getState();
    return httpRequest<T>("/system/role/all", "get", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

// 通过ID查询角色
export function GET_ROLE_BY_ID<T = unknown>(params: UnKnownObject) {
    let { token } = useAuthStore.getState();
    return httpRequest<T>(`/system/role/${params.id}`, "get", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

// 新增角色
export function ADD_ROLE<T = unknown>(params: UnKnownObject) {
    let { token } = useAuthStore.getState();
    return httpRequest<T>("/system/role", "post", {
        data: params,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

// 修改角色
export function UPDATE_ROLE<T = unknown>(params: UnKnownObject) {
    let { token } = useAuthStore.getState();
    return httpRequest<T>(`/system/role/${params.id}`, "patch", {
        data: params,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

// 删除角色
export function DELETE_ROLE<T = unknown>(params: UnKnownObject) {
    let { token } = useAuthStore.getState();
    return httpRequest<T>(`/system/role/${params.id}`, "delete", {
        data: params,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

// 查询角色菜单
export function GET_ROLE_MENU<T = unknown>(params: UnKnownObject) {
    let { token } = useAuthStore.getState();
    return httpRequest<T>(`/system/role/${params.id}/menus`, "get", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

/*
 * 菜单管理
 * MENU
 */

// 获取菜单列表
export function GET_MENU_LIST<T = unknown>(params: UnKnownObject) {
    let { token } = useAuthStore.getState();
    return httpRequest<T>("/system/menu", "get", {
        params,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

// 通过ID查询菜单
export function GET_MENU_BY_ID<T = unknown>(params: UnKnownObject) {
    let { token } = useAuthStore.getState();
    return httpRequest<T>(`/system/menu/${params.id}`, "get", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

// 新增菜单
export function ADD_MENU<T = unknown>(params: UnKnownObject) {
    let { token } = useAuthStore.getState();
    return httpRequest<T>("/system/menu", "post", {
        data: params,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

// 修改菜单
export function UPDATE_MENU<T = unknown>(params: UnKnownObject) {
    let { token } = useAuthStore.getState();
    return httpRequest<T>(`/system/menu/${params.id}`, "patch", {
        data: params,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

// 删除菜单
export function DELETE_MENU<T = unknown>(params: UnKnownObject) {
    let { token } = useAuthStore.getState();
    return httpRequest<T>(`/system/menu/${params.id}`, "delete", {
        data: params,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
