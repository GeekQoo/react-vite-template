import { MockMethod } from "vite-plugin-mock";

export default [
    {
        url: "/mock/api/login",
        method: "post",
        timeout: 1000,
        response: () => ({
            code: 1,
            data: {
                token: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2OTUxMTE5MTAsInVzZXJEZXRhaWxzIjoiMTAwOSJ9.LB5zOuFBExQY7i3xkWJ_jRi58yCmSowBgagKM6SeEgA"
            },
            message: "ok",
            type: "success"
        })
    },
    {
        url: "/mock/api/getUserinfo",
        method: "get",
        timeout: 1000,
        response: () => ({
            code: 1,
            data: {
                username: "admin",
                nickname: "超级管理员",
                avatar: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
                menu: [
                    {
                        label: "控制台",
                        key: "/",
                        icon: "HomeOutlined"
                    },
                    {
                        label: "权限配置",
                        key: "/permission",
                        icon: "MailOutlined",
                        children: [
                            {
                                label: "角色管理",
                                key: "/permission/role/list"
                            }
                        ]
                    }
                ]
            },
            message: "ok",
            type: "success"
        })
    }
] as MockMethod[];
