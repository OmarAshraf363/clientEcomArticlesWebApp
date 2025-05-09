import { userInfo } from "../Auth/auth";

export interface Like{
    articleId:number;
    userId:string
}
export interface LikeResponse{
    count:number;
    user:userInfo;
}
