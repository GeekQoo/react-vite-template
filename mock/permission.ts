import { MockMethod } from "vite-plugin-mock";

export default [
    {
        url: "/mock/api/permission/role",
        method: "get",
        timeout: 500,
        response: () => ({
            code: 1,
            "data|10": [
                {
                    id: "@natural(0,100)",
                    "name|1": ["超级管理员", "管理员", "普通用户", "游客"]
                }
            ],
            message: "ok",
            type: "success",
            total: 50,
            pageSize: 10,
            currentPage: 1
        })
    }
] as MockMethod[];
