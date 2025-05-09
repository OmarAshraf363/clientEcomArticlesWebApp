import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ModalService } from '../service/modal.service';
import { LoginComponent } from '../../features/auth/components/login/login.component';
import { CanActivateFn, Router } from '@angular/router';
import { map, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const modalService = inject(ModalService);
  const router = inject(Router);
  const isLoggedIn = localStorage.getItem('isLogged') === 'true' ? true : false;

  console.log('isLoggedIn auth:', isLoggedIn);
  if (isLoggedIn == true) {
    console.log('trueeeeeeeeeeeeeeeee', isLoggedIn);
    modalService.closeAll();
    return true;
  } else {
    console.log('isLoggedIn authsadasdasdasdas:', isLoggedIn);   
    modalService.open(LoginComponent,{
      
    });
    return false;
  }
};


