import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../../core/service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ModalService } from '../../../../../core/service/modal.service';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrl: './reset-pass.component.scss'
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private modalService:ModalService
  ) {}

  ngOnInit(): void {
    this.modalService.closeAll() 
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      token: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],

    });
  }

  onSubmit(): void {
    if (this.resetPasswordForm.invalid) return;

    const formData = this.resetPasswordForm.value;

    this.authService.resetPassword(formData).subscribe({
      next: (res) => {
        this.snackBar.open('Password reset successful!', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err)
        this.snackBar.open(
          err?.error?.message || 'Failed to reset password.',
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
