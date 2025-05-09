import { Component, inject, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidationErrors,
  ValidatorFn,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import { AuthService } from '../../../../core/service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginReq } from '../../../../core/Models/Auth/auth';
import { Subscription } from 'rxjs';
import { CustomValidation } from '../../services/customValidations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnDestroy {
  // registerForm: FormGroup;
  previewImage: string | ArrayBuffer | null = null;
  selectedImageFile: File | null = null;
  fieldErrors: { [key: string]: string[] } = {};
  sxErrorr: string = '';
  subscriptions: Subscription = new Subscription();

  private readonly router: Router = inject(Router);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}
  public registerForm: FormGroup = new FormGroup(
    {
      displayName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(32),
      ]),
      confirmPassword: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
    },
    CustomValidation.passwordMatch('password', 'confirmPassword')
  );

  get confirmPasswordControl() {
    return this.registerForm.get('confirmPassword');
  }

  // ✅ Image selection + preview
  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImageFile = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result;
      };
      reader.readAsDataURL(this.selectedImageFile);
    }
  }

  prepareRegisterReqData(): FormData {
    const formData = new FormData();
    formData.append('DisplayName', this.registerForm.value.displayName);
    formData.append('Email', this.registerForm.value.email);
    formData.append('Password', this.registerForm.value.password);
    formData.append('ConfirmPassword', this.registerForm.value.confirmPassword);

    if (this.selectedImageFile) {
      formData.append('PicImage', this.selectedImageFile);
    }
    return formData;
  }
  prepareLoginReqData(): LoginReq {
    const loginModel: LoginReq = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    };
    return loginModel;
  }

  resetFiellds() {
    this.fieldErrors = {};
    this.sxErrorr = '';
    this.registerForm.markAllAsTouched();
  }
  registerUser(userData: FormData) {
   let registSub= this.authService.register(userData).subscribe({
      next: (res: any) => {
        this.snackBar.open(res.message || 'Registered successfully!', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success'],
        });

        const loginModel = this.prepareLoginReqData();

       let loginSub= this.authService.login(loginModel).subscribe({
          next: (data) => {
            console.log(data);
            this.authService.isLoggedIn.next(true);
            localStorage.setItem('isLogged', true.toString());
            let getUserDataSub = this.authService
              .getUser()
              .subscribe((data) => {
                this.authService.userData.next(data);

              });

            this.router.navigate(['home']);
            this.subscriptions.add(getUserDataSub)

          },
        });
        this.subscriptions.add(loginSub)
      },
      error: (err: HttpErrorResponse) => {
        this.resetFiellds();
        const errors = err.error?.errors;
        const genError = err.error?.errors?.['idi'];

        if (genError) this.sxErrorr = genError;
        if (errors) this.fieldErrors = errors;

        this.snackBar.open(
          err?.error?.message || 'Registration failed.',
          'Close',
          {
            duration: 3000,
            panelClass: ['snackbar-error'],
          }
        );
      },
      
    });
    this.subscriptions.add(registSub)

    
  }

  // ✅ Submit handler
  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const formData = this.prepareRegisterReqData();

    this.registerUser(formData);
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}
