import { Component, Input } from '@angular/core';
import { UserFollowerReq } from '../../core/Models/user/userFlowerReq';
import { environment } from '../../../enviroments/env';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  imageUrl=environment.imagesURL
  @Input()
user!:UserFollowerReq
}
