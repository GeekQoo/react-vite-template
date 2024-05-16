import { useAuthStore } from "@/store";
import { httpRequest } from "@/utils/request";

/*
 * 文章管理
 * ARTICLE
 */

// 获取文章分类列表
export function GET_ARTICLE_CATEGORY_LIST<T = unknown>(params: UnKnownObject) {
    let { token } = useAuthStore.getState();
    return httpRequest<T>("/article/category", "get", {
        params,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

// 通过ID查询文章分类
export function GET_ARTICLE_CATEGORY_BY_ID<T = unknown>(params: UnKnownObject) {
    let { token } = useAuthStore.getState();
    return httpRequest<T>(`/article/category/${params.id}`, "get", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

// 删除文章分类
export function DELETE_ARTICLE_CATEGORY<T = unknown>(params: UnKnownObject) {
    let { token } = useAuthStore.getState();
    return httpRequest<T>(`/article/category/${params.id}`, "delete", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

// 新增文章分类
export function ADD_ARTICLE_CATEGORY<T = unknown>(params: UnKnownObject) {
    let { token } = useAuthStore.getState();
    return httpRequest<T>("/article/category", "post", {
        data: params,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

// 更新文章分类
export function UPDATE_ARTICLE_CATEGORY<T = unknown>(params: UnKnownObject) {
    let { token } = useAuthStore.getState();
    return httpRequest<T>(`/article/category/${params.id}`, "patch", {
        data: params,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
