import { MockMethod } from "vite-plugin-mock";

export default [
    {
        url: "/mock/api/permission/role",
        method: "get",
        timeout: 500,
        response: (body: { page: number; size: number }) => {
            let { page, size } = body;
            return {
                code: 1,
                "data|100": [
                    {
                        id: "@natural(0,1000000)",
                        "name|1": ["超级管理员", "管理员", "普通用户", "游客"]
                    }
                ],
                message: "ok",
                type: "success",
                total: 100,
                pageSize: size,
                currentPage: page
            };
        }
    }
] as MockMethod[];
