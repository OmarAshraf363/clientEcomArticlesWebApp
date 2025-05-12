import { EventEmitter, Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Article } from '../Models/Article/article.model';
import { environment } from '../../../enviroments/env';
import { ArticleParam } from '../Models/articleParam';

@Injectable({
  providedIn: 'root', // Makes the service available application-wide
})
export class ArticleService {
  data!: Article[];
  url = environment.apiUrl;
  modelWord = environment.modelWords.article;


  public articleId=new BehaviorSubject<number>(0)
  public articleId$=this.articleId.asObservable()

  public articleRowId=new BehaviorSubject<number>(0)
  public articleRowId$=this.articleRowId.asObservable()


    public searchText=new BehaviorSubject<string>("")
    searchText$=this.searchText.asObservable()

    public catId=new BehaviorSubject<number>(0)
    catId$=this.catId.asObservable()
    public pageNumber=new BehaviorSubject<number>(1)

    public pageSize=new BehaviorSubject<number>(3)

    setSavedArticle(articleId:number):Observable<any>{
      return this.http.post(`${this.url}/${this.modelWord}/save-article`,articleId
        
      )
    }
    UnSavedArticle(articleId:number):Observable<any>{
      return this.http.post(`${this.url}/${this.modelWord}/unsave-article`,articleId
        
      )
    }

    getSavedArticles(articleParam?: ArticleParam):Observable<any>{
      let params = new HttpParams();
    if (articleParam) {
        Object.keys(articleParam).forEach(e=>{
            const value=(articleParam as any)[e]
            if(value!=null&&value!=undefined){
                params=params.set(e,value)
            }
        })
    }

    return this.http.get(`${this.url}/${this.modelWord}/get-saved-articles`, {
      params
    })
    }


  constructor(private http: HttpClient) {}

  getAllArticles(articleParam?: ArticleParam): Observable<any> {
    let params = new HttpParams();
    if (articleParam) {
        Object.keys(articleParam).forEach(e=>{
            const value=(articleParam as any)[e]
            if(value!=null&&value!=undefined){
                params=params.set(e,value)
            }
        })
    }

    return this.http.get(`${this.url}/${this.modelWord}/get-all`, {
      params
    });
  }

  getUserArticles(articleParam?:ArticleParam): Observable<any>{
    let params = new HttpParams();
    if (articleParam) {
        Object.keys(articleParam).forEach(e=>{
            const value=(articleParam as any)[e]
            if(value!=null&&value!=undefined){
                params=params.set(e,value)
            }
        })
    }
    return this.http.get(`${this.url}/${this.modelWord}/get-user-article`, {
      params
    });

  }


deleteArticleRow(id:number):Observable<any>{

        return this.http.delete(
      `${this.url}/${this.modelWord}/delete-article-row/${id}`
    );

}


  getById(id: number): Observable<any> {
    return this.http.get(`${this.url}/${this.modelWord}/get-by-id/${id}`);
  }

  createArticle(reqData: FormData): Observable<any> {
    return this.http.post(`${this.url}/${this.modelWord}/add-article`, reqData);
  }

  deleteArticle(id: number): Observable<any> {
    return this.http.delete(
      `${this.url}/${this.modelWord}/delete-article/${id}`
    );
  }

  onArticleClicked: EventEmitter<number> = new EventEmitter<number>();

  setInonArticleClicked(articleId: number) {
    this.onArticleClicked.emit(articleId);
    console.log(`iam arrive in service and id id ${articleId}`);
  }

getArticleRowById(id:number):Observable<any>{
      return this.http.get(`${this.url}/${this.modelWord}/get-article-row-by-id/${id}`);

}

  // updates Part
  updateArticleRow(updateArticleRow:FormData):Observable<any>{
    return this.http.put( `${this.url}/${this.modelWord}/update-article-row`,updateArticleRow)
  }
   updateArticle(updateArticle:FormData):Observable<any>{
    return this.http.put( `${this.url}/${this.modelWord}/update-article`,updateArticle)
  }
}
