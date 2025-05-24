import { inject, Injectable } from '@angular/core';
import { environment } from '../../../enviroments/env';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserFollowerReq } from '../Models/user/userFlowerReq';
import { getUserByIdResponse } from '../Models/user/user-details-res';

@Injectable({
  providedIn: 'root',
})
export class GlobalUsersService {
  url = environment.apiUrl;
  modelWord = 'users';
  private readonly http: HttpClient = inject(HttpClient);

  userId = new BehaviorSubject<string>('');
  userId$ = this.userId.asObservable();



  getUserFollowe(): Observable<UserFollowerReq[]> {
    return this.http.get<UserFollowerReq[]>(
      `${this.url}/users/get-my-followers`
    );
  }

  getUserFollowing(): Observable<UserFollowerReq[]> {
    return this.http.get<UserFollowerReq[]>(
      `${this.url}/users/get-my-following`
    );
  }

  getFollowers(id: string): Observable<UserFollowerReq[]> {
    return this.http.get<UserFollowerReq[]>(
      `${this.url}/users/get-user-followers/${id}`
    );
  }

  getFollowing(id: string): Observable<UserFollowerReq[]> {
    return this.http.get<UserFollowerReq[]>(
      `${this.url}/users/get-user-following/${id}`
    );
  }
  getUserById(id: string): Observable<getUserByIdResponse> {
    return this.http.get<getUserByIdResponse>(
      `${this.url}/users/get-by-id/${id}`
    );
  }

  toggeleFollow(id:string):Observable<any>{
     return this.http.post(
      `${this.url}/users/follow-user`,{},{params:{
        userId:id
      }});
  }

  checkFollow(id:string):Observable<boolean>{
      return this.http.get<boolean>(
      `${this.url}/users/check-follow/${id}`
    );
  }
}
