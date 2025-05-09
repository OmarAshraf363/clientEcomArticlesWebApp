import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleRowService } from '../../services/articleRow.service';
import { CreateArticleRow } from '../../../../core/Models/ArticleRow/ArticleRow.model';
import { ActivatedRoute, Route } from '@angular/router';
import { Router } from 'express';
import { Editor } from 'ngx-editor';

@Component({
  selector: 'app-created-article-row',
  templateUrl: './created-article-row.component.html',
  styleUrl: './created-article-row.component.scss'
})
export class CreatedArticleRowComponent implements OnInit  {
  editor!:Editor
  articleRowForm!:FormGroup
  articleId!:number
  
  constructor(private fb :FormBuilder,private route:ActivatedRoute,private articleRowService:ArticleRowService){

    this.articleRowForm=this.fb.group({
      text:['',Validators.required],
      image:[null]
    })
  }

  ngOnInit(): void {
   this.articleId= Number (this.route.snapshot.paramMap.get('id'))
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
      next:(data)=>{console.log(data)},
      error:(err=>console.log(err))
    })
  }

 
}
