import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { getUserByIdResponse } from '../../core/Models/user/user-details-res';
import { GlobalUsersService } from '../../core/service/user.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-another-user-profile',
  templateUrl: './another-user-profile.component.html',
  styleUrl: './another-user-profile.component.scss'
})
export class AnotherUserProfileComponent implements OnInit,OnDestroy{
  private readonly userService=inject(GlobalUsersService)
userId!:string
subs=new Subscription()
private readonly route=inject(ActivatedRoute)



ngOnInit(): void {
  this.userId=this.route.snapshot.paramMap.get('id') ||"n"
}
ngOnDestroy(): void {
    this.subs.unsubscribe()
}
}
