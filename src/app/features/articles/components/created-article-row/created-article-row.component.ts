import { Component, inject, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleRowService } from '../../services/articleRow.service';

import { Editor } from 'ngx-editor';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-created-article-row',
  templateUrl: './created-article-row.component.html',
  styleUrl: './created-article-row.component.scss'
})
export class CreatedArticleRowComponent implements OnInit  {
  editor!:Editor
  articleRowForm!:FormGroup
  articleId!:number
    private dialogRef = inject(MatDialogRef<CreatedArticleRowComponent>);
  
  constructor(private fb :FormBuilder,private router:Router,private articleRowService:ArticleRowService){

    this.articleRowForm=this.fb.group({
      text:['',Validators.required],
      image:[null]
    })
  }

  ngOnInit(): void {
const sub= this.articleRowService.articleId$.subscribe(res=>{
this.articleId=res
   })
   this.editor=new Editor()
  
  }


  selectedImage!: File;

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
    }
  }
  onSubmit(){
    if(!this.articleRowForm.valid){
      return
    }

    const formData= new FormData();
    formData.append('text',this.articleRowForm.get('text')?.value)
    formData.append('image', this.selectedImage);
    formData.append('articleId', this.articleId.toString());


    // console.log(this.articleRowForm.get('image')?.value)
    //call add api 
    this.articleRowService.CreateArticleRow(formData).subscribe({
      next:(data)=>{
                this.dialogRef.close(true);

        this.router.navigate(['/home/article',this.articleId])
        
      },
      error:(err=>console.log(err))
    })
  }

 
}
