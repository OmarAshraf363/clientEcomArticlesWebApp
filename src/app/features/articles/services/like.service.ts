import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../enviroments/env';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { LikeResponse } from '../../../core/Models/Like/like.model';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  baseUrk: string = environment.apiUrl;
  modelWord: string = environment.modelWords.like;

  articleId=new BehaviorSubject<number>(0)
  articleId$=this.articleId.asObservable()

  private readonly http: HttpClient = inject(HttpClient);

  toggleLike(articleId: number):Observable<any> {
    return this.http.post(`${this.baseUrk}/${this.modelWord}/toggle-like`, {
      articleId,
    });
  }


  
  getArticleLkes(articleId:number):Observable<LikeResponse[]> {
    return this.http.get<LikeResponse[]>(`${this.baseUrk}/${this.modelWord}/get-article-likes/${articleId}`)
     

   
}
}
