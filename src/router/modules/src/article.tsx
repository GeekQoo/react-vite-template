import React, { lazy } from "react";

const ArticleCategoryList = lazy(() => import("@/pages/Container/Article/ArticleCategory/ArticleCategoryList.tsx"));
const ArticleTagList = lazy(() => import("@/pages/Container/Article/ArticleTag/ArticleTagList.tsx"));
const ArticleList = lazy(() => import("@/pages/Container/Article/Article/ArticleList.tsx"));
const ArticleEdit = lazy(() => import("@/pages/Container/Article/Article/ArticleEdit.tsx"));

export default [
    {
        path: "/article",
        title: "文章管理",
        children: [
            {
                path: "/article/category",
                title: "文章分类",
                element: <ArticleCategoryList />
            },
            {
                path: "/article/tag",
                title: "文章标签",
                element: <ArticleTagList />
            },
            {
                path: "/article/list",
                title: "文章列表",
                element: <ArticleList />
            },
            {
                path: "/article/list/add",
                title: "新增文章",
                element: <ArticleEdit />
            },
            {
                path: "/article/list/:id",
                title: "编辑文章",
                element: <ArticleEdit />
            }
        ]
    }
];
