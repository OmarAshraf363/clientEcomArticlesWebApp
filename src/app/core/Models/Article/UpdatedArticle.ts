import { UpdatedArticleRow } from "../ArticleRow/UpdatedArticleRow";
import { Article } from "./article.model";

export interface UpdateArticle  {
   id:number;
   title:string;
   Description:string;
   BaseImageUrl:File
    
}