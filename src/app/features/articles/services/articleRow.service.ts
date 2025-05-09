import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../enviroments/env";
import { CreateArticleRow } from "../../../core/Models/ArticleRow/ArticleRow.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class ArticleRowService{
    constructor(private http:HttpClient){}

    apiUrl=environment.apiUrl
    modelWord=environment.modelWords.article

    CreateArticleRow(model:any):Observable<any>{
        return this.http.post(`${this.apiUrl}/${this.modelWord}/add-article-row`,model)
    }
}