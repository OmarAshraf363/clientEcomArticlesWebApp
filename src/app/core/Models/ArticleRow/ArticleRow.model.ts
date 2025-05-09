export interface ArticleRow{
    text:string;
    image:string
}
export interface CreateArticleRow{
    text:string;
    articleId:number;
    image:File;
}