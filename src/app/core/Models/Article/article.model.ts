import { ArticleRow } from "../ArticleRow/ArticleRow.model";

export interface Article{
   id:number;
   title:string;
   description:string;
   baseImageUrl:string,
   userId:string;
   userName:string;
   createdAt:Date;
   likes:number;
   comments:number
   articleRows?: ArticleRow[];
   userImage:string

   
}