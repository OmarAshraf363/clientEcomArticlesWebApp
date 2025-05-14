import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from '../../../../core/service/article.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ArticleRow } from '../../../../core/Models/ArticleRow/ArticleRow.model';
import { Editor } from 'ngx-editor';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ModalService } from '../../../../core/service/modal.service';
import { environment } from '../../../../../enviroments/env';

@Component({
  selector: 'app-edit-article-row',
  templateUrl: './edit-article-row.component.html',
  styleUrl: './edit-article-row.component.scss',
})
export class EditArticleRowComponent implements OnDestroy,OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly articleService = inject(ArticleService);
  private readonly router=inject(Router)
  private readonly modal=inject(ModalService)
  imageUrl=environment.imagesURL
  editor!:Editor
  subs=new Subscription()
  form!: FormGroup;
  loading = false;
  selectedImageFile!: File | null;
  imagePreviewUrl: string = '';
  articleRowId: number =0
  articleRowData!: ArticleRow;

  ngOnInit(): void {
    this.form = this.fb.group({
      text: ['', [Validators.required]],
      image: [null],
    });
    this.editor=new Editor()

    this.loadInitialData();
  }

  loadInitialData() {
    const sub = this.articleService.articleRowId$.subscribe((id) => {
      if (id != 0) {
            this.loading = true;
        this.articleRowId=id
       const sub1= this.articleService.getArticleRowById(id).subscribe({
          next: (res:ArticleRow) => {
            console.log(res)
            this.articleRowData = res;
            this.form.patchValue({ text: res.text });
            this.imagePreviewUrl =this.imageUrl+res.image || '';
            this.loading = false;
          },
          error: () => {
            this.loading = false;
          },
        });
        this.subs.add(sub1)
      }
    });
    this.subs.add(sub)

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
    if (this.form.invalid || !this.articleRowId){
      console.log("form invalid")
      return;
    } 

    const formData = new FormData();
    formData.append('Id',  this.articleRowId.toString());
    formData.append('Text', this.form.value.text);

    if (this.selectedImageFile) {
      formData.append('Image', this.selectedImageFile);
    }

    this.loading = true;
    this.articleService.updateArticleRow(formData).subscribe({
      next: () => {
        console.log("Done Edited article row ")
        this.modal.closeAll()
        this.router.navigate(['/home/article',this.articleRowData.articleId])
        
      },
      error: (err) => (console.log(err)),
    });
  }

 ngOnDestroy(): void {
     this.subs.unsubscribe()
     this.editor.destroy()
 }
}
