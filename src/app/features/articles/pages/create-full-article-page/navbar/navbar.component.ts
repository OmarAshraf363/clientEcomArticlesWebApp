import { Component, Inject, inject } from '@angular/core';
import { AuthService } from '../../../../../core/service/auth.service';
import { userInfo } from '../../../../../core/Models/Auth/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  userName: string = '';

  constructor(private authService: AuthService) {
  
  }
  ngOnInit() {
    this.authService.userData.subscribe(user => {
      if (user) {
        this.userName = user.displayName;
      } else {
        this.userName = '';
      }
    });
  }
}
