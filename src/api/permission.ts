import { httpRequest } from "@/utils/request";
import { useAuthStore } from "@/store";

let { token } = useAuthStore.getState();

// 获取角色列表
export function GET_ROLE_LIST<T = unknown>(params: object) {
    return httpRequest<T>("/api/permission/role", "get", {
        params,
        headers: {
            token: token
        }
    });
}
