import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Editor } from 'ngx-editor';
import { Router } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { ArticleRowService } from '../../services/articleRow.service';

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
  }

  onRowImageSelected(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.articleRows.at(index).patchValue({ image: input.files[0] });
    }
  }

  onSubmit(): void {
    if (this.articleForm.invalid || !this.selectedImage) {
      return;
    }

    const formData = new FormData();
    formData.append('title', this.articleForm.get('title')?.value);
    formData.append('description', this.articleForm.get('description')?.value);
    formData.append('baseImageUrl', this.selectedImage);

    this.articleService.createArticle(formData).subscribe({
      next: (result) => {
        this.articleId = result.id;
        console.log('Article created with ID:', result.id);

        if(this.articleRows.length>0){

          this.submitArticleRows(); // Only after article created
          this.articleIsSave = true;
        }
      },
      error: (error) => {
        console.error('Error creating article:', error);
      }
    });
  }

  private submitArticleRows(): void {
    if (this.articleRows.length === 0 || !this.articleId) {
      return;
    }

    this.articleRows.controls.forEach((rowGroup, index) => {
      const formData = new FormData();
      formData.append('articleId', this.articleId.toString());
      formData.append('text', rowGroup.get('text')?.value);

      const image = rowGroup.get('image')?.value;
      if (image) {
        formData.append('image', image);
      }

      this.articleRowService.CreateArticleRow(formData).subscribe({
        next: (res) => console.log(`Row ${index + 1} added successfully`, res),
        error: (err) => console.error(`Error adding row ${index + 1}:`, err)
      });
    });
  }
}
