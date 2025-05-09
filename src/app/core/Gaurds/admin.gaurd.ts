import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';
import { ModalService } from '../service/modal.service';
import { LoginComponent } from '../../features/auth/components/login/login.component';

@Injectable({
  providedIn: 'root',
})
export class AdminGaurd implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private modalService: ModalService
  ) {}

  role!: string;
  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.userRole.pipe(
      map((role) => {
        if (role === 'User') {
          return true;
        } else {
          return false;
        }
      }),
      catchError(() => {
        this.modalService.open(LoginComponent);
        return of(this.router.createUrlTree(['/unauthorized']));
      })
    );
  }
}
