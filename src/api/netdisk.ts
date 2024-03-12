import { useAuthStore } from "@/store";
import { httpRequest } from "@/utils/request";

// 单文件上传
export const UPLOAD_FILE_URL = "/api/netdisk/upload";

export function UPLOAD_FILE<T = unknown>(params: UnKnownObject) {
    let { token } = useAuthStore.getState();
    return httpRequest<T>("/netdisk/upload", "post", {
        data: params,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
