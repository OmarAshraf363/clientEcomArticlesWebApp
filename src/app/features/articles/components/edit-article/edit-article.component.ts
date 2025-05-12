import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Editor } from 'ngx-editor';
import { Subscription } from 'rxjs';
import { ArticleService } from '../../../../core/service/article.service';
import { Article } from '../../../../core/Models/Article/article.model';
import { environment } from '../../../../../enviroments/env';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrl: './edit-article.component.scss',
})
export class EditArticleComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private articleService = inject(ArticleService);
  private dialogRef = inject(MatDialogRef<EditArticleComponent>);
    private readonly router=inject(Router)
  

  editor!: Editor;
  form!: FormGroup;
  subs = new Subscription();
  loading = false;

  selectedImageFile!: File | null;
  imagePreviewUrl: string = '';
  articleId: number = 0
  articleData!: Article;
  imageUrl = environment.imagesURL; // <-- set your actual base URL

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: [null]
    });

    this.editor = new Editor();
    this.loadInitialData();
  }

  loadInitialData() {
    const sub = this.articleService.articleId$.subscribe((id) => {
      if (id) {
        this.articleId = id;
        this.loading = true;

        const getSub = this.articleService.getById(id).subscribe({
          next: (res: Article) => {
            this.articleData = res;
            this.form.patchValue({
              title: res.title,
              description: res.description,
            });
            this.imagePreviewUrl =  this.imageUrl+res.baseImageUrl || '';
            this.loading = false;
          },
          error: () => {
            this.loading = false;
          }
        });
        this.subs.add(getSub);
      }
    });
    this.subs.add(sub);
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedImageFile = file;

      const reader = new FileReader();
      reader.onload = () => (this.imagePreviewUrl = reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  submit() {
    if (this.form.invalid || !this.articleId) return;

    const formData = new FormData();
    formData.append('Id', this.articleId.toString());
    formData.append('Title', this.form.value.title);
    formData.append('Description', this.form.value.description);

    if (this.selectedImageFile) {
      formData.append('BaseImageUrl', this.selectedImageFile);
    }

    this.loading = true;

    this.articleService.updateArticle(formData).subscribe({
      next: () => {
        this.loading = false;
        this.dialogRef.close(true);
        this.router.navigate(['/article',this.articleData.id])
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.editor.destroy();
  }
}
