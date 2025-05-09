import { ArticleRow } from "./ArticleRow.model";

export interface UpdatedArticleRow extends ArticleRow{
    id:number;
    articleId:number
} 