import React, { lazy } from "react";

const ArticleCategoryList = lazy(() => import("@/pages/Container/Article/ArticleCategory/ArticleCategoryList.tsx"));
const ArticleTagList = lazy(() => import("@/pages/Container/Article/ArticleTag/ArticleTagList.tsx"));
const ArticleList = lazy(() => import("@/pages/Container/Article/Article/ArticleList.tsx"));

export default [
    {
        path: "/article",
        title: "系统设置",
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
                path: "/article",
                title: "文章列表",
                element: <ArticleList />
            }
        ]
    }
];
