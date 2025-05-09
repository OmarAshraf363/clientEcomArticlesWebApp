import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalService } from '../../../../core/service/modal.service';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrl: './forget-pass.component.scss'
})
export class ForgetPasswordComponent implements OnInit {
  forgetPasswordForm: FormGroup;
  emailSent = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
        private modalService:ModalService
    
  ) {
    this.forgetPasswordForm = this.fb.group({
      email: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.modalService.closeAll()
  }
  get email() {
    return this.forgetPasswordForm.get('email');
  }

  onSubmit(): void {
    if (this.forgetPasswordForm.invalid) return;

    const email:string = this.forgetPasswordForm.value.email;

    this.authService.forgetPass(email).subscribe({
      next: () => {
        this.emailSent = true;
        this.snackBar.open('Reset code sent successfully!', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
      },
      error: (err) => {
        console.log(err)
        this.snackBar.open(
          err?.error?.message || 'Failed to send reset code.',
          'Close',
          {
            duration: 3000,
            panelClass: ['snackbar-error']
          }
        );
      }
    }); 
  }
}
