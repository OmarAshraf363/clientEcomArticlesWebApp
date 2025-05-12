import { Component, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/service/auth.service';
import { ModalService } from '../../../../core/service/modal.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  loginForm!: FormGroup;
  subs: Subscription = new Subscription();
  fieldErrors: { [key: string]: string[] } = {};
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private modal: ModalService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }
    const formData = this.loginForm.value;
    console.log('Form Data:', formData);
    //calling api
    let loginSub = this.authService.login(formData).subscribe({
      next: (res) => {
        this.authService.isLoggedIn.next(true);
        localStorage.setItem('isLogged', true.toString());
        let getUserDataSub = this.authService.getUser().subscribe((data) => {
          this.authService.userData.next(data);
          this.authService.userRole.next(data.role);
          console.log(data);
          if (data.role == 'Admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/home']);
          }
        });
        this.subs.add(loginSub);
        this.subs.add(getUserDataSub);
        this.modal.closeAll();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        const errs=error.error.errors
        if(errs){

          this.fieldErrors=errs
        }else{
          this.fieldErrors={"gen":["Invalid Login Attemp"]}
        }
    

      },
    });
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
