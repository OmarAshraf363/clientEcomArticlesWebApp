import { Component, inject, OnInit } from '@angular/core';
import { userInfo } from './core/Models/Auth/auth';
import { AuthService } from './core/service/auth.service';
import { Router } from '@angular/router';
import { map, take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

 constructor(private authService: AuthService, private router: Router) {}
 ngOnInit(): void {

  console.log('isLoggedIn from StartApp:', this.authService.isLoggedIn.getValue());
   this.authService.getUser().subscribe({
      next: (res) => {
        this.authService.userinformation = res;
        this.authService.userData.next(res);
        this.authService.isLoggedIn.next(true);
        this.authService.userRole.next(res.role);
        // this.redirict(res.role);
        console.log('userInfo:', res);
      },
      error: (err) => {
        console.log(err);
      },
   })
 }
  
 redirict(role: string) {
  if (role === 'admin') {
    this.router.navigate(['admin']);
  } else  {
    this.router.navigate(['home']);
 

 }
}

}