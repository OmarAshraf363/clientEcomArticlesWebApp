import { inject, Injectable } from "@angular/core";
import e from "express";
import { environment } from "../../../../enviroments/env";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { NewComment } from "../../../core/Models/Comment/comment.mmodel";

@Injectable({
  providedIn: "root"
})
export class CommentService {

     baseUrk: string = environment.apiUrl;
      modelWord: string = environment.modelWords.Comments;
    
      private readonly http: HttpClient = inject(HttpClient);

      public articleId=new BehaviorSubject<number>(0)


      createNewComment(newComment:NewComment):Observable<any>{
        return this.http.post(`${this.baseUrk}/${this.modelWord}/add-comment`, newComment);
      }

        getArticleComments(articleId:number):Observable<any> {
            return this.http.get(`${this.baseUrk}/${this.modelWord}/get-article-comments/${articleId}`);
          
           
        }
        deleteComment(commentId:number):Observable<any>{
            return this.http.delete(`${this.baseUrk}/${this.modelWord}/delete-comment`, {
                params: { commentId: commentId }
            })
        }
        updateComment(id:number, content:string):Observable<any>{
            return this.http.put(`${this.baseUrk}/${this.modelWord}/update-comment`, {id, content});
        }
    
}