import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { getUserByIdResponse } from '../../../../../core/Models/user/user-details-res';
import { Subscription } from 'rxjs';
import { environment } from '../../../../../../enviroments/env';
import { ModalService } from '../../../../../core/service/modal.service';
import { UserInfoComponent } from '../../../../auth/components/my-info/user-info/user-info.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit,OnDestroy {
  userId:string=""
  imageUrl:string=environment.imagesURL 
  userDetailsResponse:getUserByIdResponse=new getUserByIdResponse()
  subs:Subscription=new Subscription()
  private readonly userService=inject(UserService)
    private readonly modal=inject(ModalService)

ngOnInit(): void {
    let sub=this.userService.userID$
    .subscribe({
      next:id=>{
       
        if(id){

          let sub1=this.userService.getUserById(id).subscribe({
            next:(res:getUserByIdResponse)=>{
              console.log(res)
               this.userDetailsResponse.data=res.data
               this.userDetailsResponse.userInfo=res.userInfo
            }
          })
          this.subs.add(sub1)
        }
      }
    })
    this.subs.add(sub)
}

openEditProfile(){
this.modal.open(UserInfoComponent,{
  width:'900px', 
})
}
ngOnDestroy(): void {
    this.subs.unsubscribe()
}
}
