import { Component, ElementRef, inject, OnChanges ,SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../../features/auth/components/login/login.component';
import { ModalService } from '../../../core/service/modal.service';
import { AuthService } from '../../../core/service/auth.service';
import { userInfo } from '../../../core/Models/Auth/auth';
import { Router } from '@angular/router';
import { ArticleService } from '../../../features/articles/services/article.service';
import { ArticleParam } from '../../../core/Models/articleParam';


@Component({
  selector: 'app-header',
  templateUrl: './header-comp.component.html',
  styleUrl: './header-comp.component.scss'
})
export class HeaderCompComponent  {
  userData!:userInfo
  isAdmin:boolean = false;
  isLoggedIn:boolean = false;
  private readonly articleService:ArticleService=inject(ArticleService)
  text:string=""
  constructor(private modalService:ModalService,private authService:AuthService,private router:Router) { }
ngOnInit(): void {
  
    

    this.authService.isLoggedIn.subscribe((res)=>{
      this.isLoggedIn = res;
      console.log('isLoggedIn:',this.isLoggedIn);
    })
 
 

}


onChangeEle(ele:any){
  console.log(ele.target.value)
  console.log(this.text)

  
    this.articleService.searchText.next(ele.target.value)
 
 
  
}

logout(){
  this.authService.logout().subscribe({
    next: (res) => {
      console.log(res);
      this.authService.isLoggedIn.next(false);
      localStorage.setItem('isLogged', false.toString());
      // this.authService.userData.next({});
      this.authService.userRole.next('NoUserLogedIn');
      this.router.navigate(['']);
    }
})
}
openLoginModal() {
  this.modalService.open(LoginComponent, {
    width: '700px',
    height: '480px',
    disableClose: false,
    autoFocus: true
  });
}
}