import { userInfo } from "../Auth/auth";

export interface Comment{
    id:number;
    createdAt:Date;
    articleId:number;
    content:string;
    user:userInfo;
}


export interface NewComment{
    articleId:number;
    content:string;
}

export interface UpdatedComment{
    id:number;
    content:string
}