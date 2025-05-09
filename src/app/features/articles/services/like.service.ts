import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../enviroments/env';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LikeResponse } from '../../../core/Models/Like/like.model';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  baseUrk: string = environment.apiUrl;
  modelWord: string = environment.modelWords.like;

  private readonly http: HttpClient = inject(HttpClient);

  toggleLike(articleId: number):Observable<any> {
    return this.http.post(`${this.baseUrk}/${this.modelWord}/toggle-like`, {
      articleId,
    });
  }


  
  getArticleLkes(articleId:number):Observable<LikeResponse[]> {
    return this.http.get<LikeResponse[]>(`${this.baseUrk}/${this.modelWord}/get-article-likes`, {
      params: { articleId: articleId }

    })
}
}
