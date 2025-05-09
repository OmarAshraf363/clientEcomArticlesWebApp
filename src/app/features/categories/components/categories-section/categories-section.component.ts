import { Component, inject, OnInit } from '@angular/core';
import { Category } from '../../../../core/Models/Category/category.model';
import { CategoryService } from '../../service/category.service';
import { Article } from '../../../../core/Models/Article/article.model';
import { ArticleService } from '../../../articles/services/article.service';

@Component({
  selector: 'app-categories-section',
  templateUrl: './categories-section.component.html',
  styleUrl: './categories-section.component.scss'
})
export class CategoriesSectionComponent implements OnInit {
categories:Category[]=[]
private readonly articleService:ArticleService=inject(ArticleService)
constructor(private categoryService:CategoryService){}
ngOnInit(){
  this.getAllCategories()
}
getAllCategories(){
  this.categoryService.getAllCategories().subscribe((res)=>{
    this.categories=res
    console.log(res)
  })
}

setCatIdInService(id:number){
  console.log("CatId Is Set")
  if(this.articleService.catId.getValue()==0){

    this.articleService.catId.next(id)
  }else{
    this.articleService.catId.next(0)
  }

}

}
