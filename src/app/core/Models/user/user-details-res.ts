import { Article } from "../Article/article.model";
import { userInfo } from "../Auth/auth";

export class getUserByIdResponse{
  data:Article[]=[];
    userInfo: userInfo=new userInfo();

}