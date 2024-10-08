import { httpRequest } from "@/utils/request";
import { useAuthStore } from "@/store";

// 账号密码登录
export function AUTH_LOGIN<T = unknown>(params: UnKnownObject) {
    return httpRequest<T>("/auth/login", "post", {
        data: params
    });
}

// 获取登录用户信息
export function GET_USERINFO<T = unknown>(params: UnKnownObject) {
    const { token } = useAuthStore.getState();
    return httpRequest<T>("/auth/currentUser", "get", {
        params,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
