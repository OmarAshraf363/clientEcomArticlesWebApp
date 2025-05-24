import { Component, inject, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { checkAuth, userInfo } from '../../../core/Models/Auth/auth';
import { AuthService } from '../../../core/service/auth.service';
import { ModalService } from '../../../core/service/modal.service';
import { EditNamePicComponent } from '../../../features/auth/components/edit-name-pic/edit-name-pic.component';
import { environment } from '../../../../enviroments/env';
import { GlobalUsersService } from '../../../core/service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})
export class UserInfoComponent implements OnInit {
userDataSub:Subscription=new Subscription()
userData:userInfo= new userInfo()
imageUrl:string=environment.imagesURL
loginUserIsFollowUser:boolean=false
private readonly authService:AuthService=inject(AuthService)
private readonly userService:GlobalUsersService=inject(GlobalUsersService)
private readonly _snake=inject(MatSnackBar)

private readonly modalService:ModalService=inject(ModalService)

@Input() userId!:string

ngOnInit(): void {
  if(this.userId){
    const sub=this.userService.getUserById(this.userId).subscribe(data=>{
      this.userData=data.userInfo
     this.checkFollow()
    })
        this.userDataSub.add(sub)

  }else{

    let userSub=this.authService.userData$.subscribe({
      next:data=>{
        console.log(data)
        this.userData=data
        
      },
     
    })
    this.userDataSub.add(userSub)
  }
}
checkFollow(){
 const sub1=this.userService.checkFollow(this.userId).subscribe(res=>{
  console.log(res)
        this.loginUserIsFollowUser=res
      })
      this.userDataSub.add(sub1)
}

onFollow(id:string){
  const sub= this.userService.toggeleFollow(id).subscribe({
    next:data=>{
      const msg=data.message
      this._snake.open(msg,"close",{duration:3000})
      this.checkFollow()
      
    }
  })
}

openEditModal(){
  this.modalService.open(EditNamePicComponent,{
    width:'700px',
    height:'100vh'
  })
}

ngOnDestroy(): void {
  this.userDataSub.unsubscribe()
}
}
