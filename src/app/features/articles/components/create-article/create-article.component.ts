import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Editor } from 'ngx-editor';
import { Router } from '@angular/router';
import { ArticleRowService } from '../../services/articleRow.service';
import { ArticleService } from '../../../../core/service/article.service';
import { readFile } from 'node:fs';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss'],
})
export class CreateArticleComponent implements OnInit, OnDestroy {
  articleForm!: FormGroup;
  selectedImage!: File;
  articleId = 0;
  editor!:Editor
  editors: Editor[] = [];
  articleIsSave = false;
  previewImage: string | ArrayBuffer | null = null;
prevRowImages: (string | ArrayBuffer | null)[] = [];
  isSubmitting = false;

  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly articleService = inject(ArticleService);
  private readonly articleRowService = inject(ArticleRowService);

  ngOnInit(): void {
    this.initializeForm();
    this.editor=new Editor
    this.editors.push(new Editor()); // Editor for cover description
  }

  ngOnDestroy(): void {
    this.editors.forEach(editor => editor.destroy());
  }

  private initializeForm(): void {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      rows: this.fb.array([])
    });
  }

  get articleRows(): FormArray {
    return this.articleForm.get('rows') as FormArray;
  }

  addRow(): void {
    this.articleRows.push(this.fb.group({
      image: [null],
      text: ['', Validators.required]
    }));
    this.editors.push(new Editor());
  }

  removeRow(index: number): void {
    this.articleRows.removeAt(index);
    this.editors[index + 1]?.destroy(); // +1 عشان أول editor لل description مش لل rows
    this.editors.splice(index + 1, 1);
  }

  onCoverImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedImage = input.files[0];
    }
    const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result;
      };
            reader.readAsDataURL(this.selectedImage);

  }
  removeImage(){
    this.previewImage=null
  }

  onRowImageSelected(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.articleRows.at(index).patchValue({ image: input.files[0] });
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (!this.prevRowImages) {
        this.prevRowImages = [];
      }
      if (reader.result !== null) {
        this.prevRowImages[index] = reader.result;
      }
    };
    if (input.files && input.files[0]) {
      reader.readAsDataURL(input.files[0]);
    }
    
  }

  removeRowImage(index: number): void {
    this.articleRows.at(index).patchValue({ image: null });
    if (this.prevRowImages) {
      this.prevRowImages[index] = null;
    }
  }

  onSubmit(): void {
    if (this.articleForm.invalid || !this.selectedImage || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;

    const formData = new FormData();
    formData.append('title', this.articleForm.get('title')?.value);
    formData.append('description', this.articleForm.get('description')?.value);
    formData.append('baseImageUrl', this.selectedImage);

    this.articleService.createArticle(formData).subscribe({
      next: (res) => {
        this.articleId = res.id;
        if (this.articleRows.length > 0) {
          this.submitArticleRows();
        } else {
          this.navigateAfterSuccess();
        }
      },
      error: (err) => {
        this.isSubmitting = false;
        console.error('Error creating article:', err);
      }
    });
  }

  private submitArticleRows(): void {
    const requests = this.articleRows.controls.map((group) => {
      const rowFormData = new FormData();
      rowFormData.append('articleId', this.articleId.toString());
      rowFormData.append('text', group.get('text')?.value);
      const image = group.get('image')?.value;
      if (image) rowFormData.append('image', image);
      return this.articleRowService.CreateArticleRow(rowFormData);
    });

    forkJoin(requests).subscribe({
      next: () => this.navigateAfterSuccess(),
      error: (err) => {
        this.isSubmitting = false;
        console.error('Error submitting article rows:', err);
      }
    });
  }

  private navigateAfterSuccess(): void {
    this.isSubmitting = false;
    this.router.navigate([`/home/article/${this.articleId}`]);
  }
}
