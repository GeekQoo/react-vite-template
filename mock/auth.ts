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
                        label: "仪表盘",
                        key: "0",
                        type: 1,
                        icon: "ProjectOutlined",
                        children: [
                            {
                                label: "工作台",
                                key: "Workbench",
                                type: 2
                            }
                        ]
                    },
                    {
                        label: "用户管理",
                        key: "1",
                        type: 1,
                        icon: "UserOutlined",
                        children: [
                            {
                                label: "用户列表",
                                key: "UserList",
                                type: 2
                            },
                            {
                                label: "角色列表",
                                key: "RoleList",
                                type: 2
                            },
                            {
                                label: "菜单列表",
                                key: "MenuList",
                                type: 2
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
