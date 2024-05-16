import { SysTableBase } from "#/system";

/*
 * 文章分类类型
 */
export interface ArticleCategoryProps extends SysTableBase {
    categoryName: string;
    parentId: Nullable<number>;
}
