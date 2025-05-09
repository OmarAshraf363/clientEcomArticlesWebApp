import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '../../../core/service/modal.service';
import { AuthService } from '../../../core/service/auth.service';
import { LoginComponent } from '../../../features/auth/components/login/login.component';
import { RegisterComponent } from '../../../features/auth/components/register/register.component';

@Component({
  selector: 'app-navbar-get-start',
  templateUrl: './navbar-get-start.component.html',
  styleUrls: ['./navbar-get-start.component.scss']
})
export class NavbarGetStartComponent implements OnInit {
  private readonly authService = inject(AuthService);
  isLoggedIn = false;

  constructor(
    private modalService: ModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((res) => {
      this.isLoggedIn = res;
      console.log('isLoggedIn:', this.isLoggedIn);
    });
  }

  openLoginModal(): void {
    this.modalService.open(LoginComponent);
  }

  openRegisterModal(): void {
    this.modalService.open(RegisterComponent, {
      width: '800px',
      height: 'calc(100vh - 80px)',
      id: 'regMod'
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: (res) => {
        console.log(res);
        this.authService.isLoggedIn.next(false);
        localStorage.removeItem('isLogged');
        this.authService.userRole.next('NoUserLoggedIn');
        this.router.navigate(['']);
      }
    });
  }
}
