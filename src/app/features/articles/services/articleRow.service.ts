import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../enviroments/env";
import { CreateArticleRow } from "../../../core/Models/ArticleRow/ArticleRow.model";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class ArticleRowService{
    constructor(private http:HttpClient){}

    apiUrl=environment.apiUrl
    modelWord=environment.modelWords.article

    
      public articleId=new BehaviorSubject<number>(0)
      public articleId$=this.articleId.asObservable()

    CreateArticleRow(model:any):Observable<any>{
        return this.http.post(`${this.apiUrl}/${this.modelWord}/add-article-row`,model)
    }
}