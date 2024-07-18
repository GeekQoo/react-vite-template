import { SysTableBase } from "#/system";

/*
 * 文章分类类型
 */
export interface ArticleCategoryProps extends SysTableBase {
    categoryName: string;
    parentId: Nullable<number>;
}

/*
 * 文章标签类型
 */
export interface ArticleTagProps extends SysTableBase {
    tagName: string;
}

/*
 * 文章类型
 */
export interface ArticleProps extends SysTableBase {
    title: string;
    content: string;
    categoryId: number;
    tagIds: string;
}
