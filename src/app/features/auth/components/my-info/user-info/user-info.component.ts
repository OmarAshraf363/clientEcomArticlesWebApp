import { Component, inject, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { userInfo } from '../../../../../core/Models/Auth/auth';
import { AuthService } from '../../../../../core/service/auth.service';
import { ModalService } from '../../../../../core/service/modal.service';
import { EditNamePicComponent } from '../../edit-name-pic/edit-name-pic.component';
import { environment } from '../../../../../../enviroments/env';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})
export class UserInfoComponent implements OnInit {
userDataSub:Subscription=new Subscription()
userData:userInfo= new userInfo()
imageUrl:string=environment.imagesURL
private readonly authService:AuthService=inject(AuthService)
private readonly modalService:ModalService=inject(ModalService)
ngOnInit(): void {
  let userSub=this.authService.userData$.subscribe({
    next:data=>{
      console.log(data)
      this.userData=data
    },
   
  })
  this.userDataSub.add(userSub)
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
