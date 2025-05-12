import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ModalService } from '../service/modal.service';
import { LoginComponent } from '../../features/auth/components/login/login.component';
import { CanActivateFn, Router } from '@angular/router';


export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const modalService = inject(ModalService);
  const isLoggedIn = localStorage.getItem('isLogged') === 'true' ? true : false;

  if (isLoggedIn == true) {
    modalService.closeAll();
    return true;
  } else {
    modalService.open(LoginComponent,{
    
    });
    return false;
  }
};


