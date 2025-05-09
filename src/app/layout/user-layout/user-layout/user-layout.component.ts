import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/service/auth.service';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.scss',
  
})
export class UserLayoutComponent {
constructor(private authService:AuthService) { }
// ngOnInit(): void {
//   this.authService.checkAuth().subscribe(res=>{
//     this.authService.isLoggedIn.next(res.isAuth);
//     this.authService.userRole.next(res.role);
//   })
// }
}