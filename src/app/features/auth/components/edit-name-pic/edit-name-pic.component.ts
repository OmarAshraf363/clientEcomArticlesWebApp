import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../../core/service/auth.service';
import { userInfo } from '../../../../core/Models/Auth/auth';
import { environment } from '../../../../../enviroments/env';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-name-pic',
  templateUrl: './edit-name-pic.component.html',
  styleUrl: './edit-name-pic.component.scss'
})
export class EditNamePicComponent implements OnInit {
  private readonly authService: AuthService = inject(AuthService);
  imageUrl: string = environment.imagesURL;
  userData!: userInfo;

  updateForm!: FormGroup;
  previewImage: string | ArrayBuffer | null = null;
  selectedImageFile!: File;

  constructor(private fb: FormBuilder) {
    this.updateForm = fb.group({
      displayName: ['', Validators.required],
      picImage: [null]
    });
  }

  ngOnInit(): void {
    this.authService.userData$.subscribe(data => {
      this.userData = data;
      this.updateForm.patchValue({
        displayName: data.displayName
      });
    });
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedImageFile = input.files[0];
      this.updateForm.patchValue({ picImage: this.selectedImageFile });

      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result;
      };
      reader.readAsDataURL(this.selectedImageFile);
    }
  }
  @ViewChild('fileInput') fileInput!: ElementRef;

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }
  saveChanges() {
    if (this.updateForm.invalid) return;

    const formData = new FormData();
    formData.append('DisplayName', this.updateForm.value.displayName);
    formData.append('UserName', this.userData.userName); // لو مطلوب
    formData.append('Email', this.userData.email);       // لو مطلوب
    if (this.selectedImageFile) {
      formData.append('PicImage', this.selectedImageFile);
    }

    this.authService.updateUser(formData).subscribe({
      next: res => {
        this.authService.getUser().subscribe(data=>{
          this.authService.userData.next(data)
        })
        console.log('✅ Update success', res);
      },
      error: err => {
        console.error('❌ Update failed', err);
      }
    });
  }
}
