import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { userInfo } from '../../../core/Models/Auth/auth';
import { environment } from '../../../../enviroments/env';
import { Article } from '../../../core/Models/Article/article.model';
import { getUserByIdResponse } from '../../../core/Models/user/user-details-res';

interface GetUsersResponse {
  data: userInfo[];
  count: number;
}



@Injectable({ providedIn: 'root' })
export class UserService {
  private base = environment.apiUrl;
  private modelWord="users"

  public userId=new BehaviorSubject<string>("")
  public userID$=this.userId.asObservable()


  constructor(private http: HttpClient) {}

  getUsers(): Observable<GetUsersResponse> {
    return this.http.get<GetUsersResponse>(`${this.base}/${this.modelWord}/get-users`);
  }

  lockUser(userId: string): Observable<any> {
    return this.http.post(`${this.base}/${this.modelWord}/lock-user`, null, { params: { userId } });
  }

  unlockUser(userId: string): Observable<any> {
    return this.http.post(`${this.base}/${this.modelWord}/unlock-user`, null, { params: { userId } });
  }

  getLockStatus(userId: string): Observable<{ status: boolean }> {
    return this.http.get<{ status: boolean }>(`${this.base}/${this.modelWord}/get-user-status`, { params: { userId } });
  }




  //return articles and userInfo
  getUserById(userId:string):Observable<getUserByIdResponse>{
        return this.http.get<getUserByIdResponse>(`${this.base}/${this.modelWord}/get-by-id`, { params: { userId } });

  }
}
