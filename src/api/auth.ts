import { httpRequest } from "@/utils/request";
import { useAuthStore } from "@/store";

let { token } = useAuthStore.getState();

// 账号密码登录
export function AUTH_LOGIN<T = unknown>(params: object) {
    return httpRequest<T>("/api/login", "post", {
        data: params
    });
}

// 获取登录用户信息
export function GET_USERINFO<T = unknown>(params: object) {
    return httpRequest<T>("/api/getUserinfo", "get", {
        params,
        headers: {
            token: token
        }
    });
}
