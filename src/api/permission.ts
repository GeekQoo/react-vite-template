import { httpRequest } from "@/utils/request";
import { useAuthStore } from "@/store";

let { token } = useAuthStore.getState();

// 获取用户列表
export function GET_USER_LIST<T = unknown>(params: object) {
    let { token } = useAuthStore.getState();
    return httpRequest<T>("/system/user", "get", {
        params,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
