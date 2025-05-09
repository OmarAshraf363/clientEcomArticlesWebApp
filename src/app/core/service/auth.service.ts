import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { environment } from '../../../enviroments/env';
import { checkAuth, userInfo } from '../Models/Auth/auth';
import { emit } from 'process';
export interface resData {

}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = environment.apiUrl;
  modelWord = environment.modelWords.Accounts;
  private readonly http:HttpClient = inject(HttpClient);
  userinformation!: userInfo 
userData:BehaviorSubject<userInfo> = new BehaviorSubject<userInfo>(new userInfo());
userData$=this.userData.asObservable()
   public isLoggedIn = new BehaviorSubject<boolean>(false);
  // isLogedInProcess$ = this.isLoggedIn.asObservable();

userRole: BehaviorSubject<string> = new BehaviorSubject<string>("");
  // userRole$ = this.userRole.asObservable();
 

  getUserData(): Observable<userInfo> {
    return this.userData.asObservable();
  }
login(req: any): Observable<any> {
  return this.http.post(`${this.url}/${this.modelWord}/login`, req)
  
}
logout(): Observable<any> {
  return this.http.post(`${this.url}/${this.modelWord}/logout`, {})

}

  register(req:any): Observable<any> {
    return this.http.post(`${this.url}/${this.modelWord}/register`,req);
  }
  getUser(): Observable<userInfo> {
    return this.http.get<userInfo>(`${this.url}/${this.modelWord}/get-user`
     
    )
  }

  checkAuth(): Observable<checkAuth> {
    return this.http.get<checkAuth>(`${this.url}/${this.modelWord}/check-auth`)
  }

  updateUser(req: any): Observable<any> {
    return this.http.put(`${this.url}/${this.modelWord}/update-user`, req);
  }
  deleteUser(): Observable<any> {
    return this.http.delete(`${this.url}/${this.modelWord}/deleteUser`);
  }


  forgetPass(email:string):Observable<any>{
    return this.http.post(`${this.url}/${this.modelWord}/forget-password`,{},{
      params:{
        email:email
      }
    });

  }


  resetPassword(data: { email: string; token: string; newPassword: string }): Observable<any> {
      return this.http.post(`${this.url}/${this.modelWord}/reset-password`, data);
  }
  
   

   

    
    
   
  }

  
