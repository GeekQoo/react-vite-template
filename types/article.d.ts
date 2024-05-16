import { SysTableBase } from "#/system";

export interface ArticleCategoryProps extends SysTableBase {
    categoryName: string;
    parentId: Nullable<number>;
}
