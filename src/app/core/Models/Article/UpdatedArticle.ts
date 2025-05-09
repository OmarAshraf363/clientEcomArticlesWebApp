import { UpdatedArticleRow } from "../ArticleRow/UpdatedArticleRow";
import { Article } from "./article.model";

export interface UpdateArticle extends Article{
    id:number
       articleRows?: UpdatedArticleRow[];
    
}