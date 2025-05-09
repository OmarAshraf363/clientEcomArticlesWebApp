import {
  Component,
  ElementRef,
  inject,
  OnChanges,
  OnDestroy,
  OnInit,
  QueryList,
  SimpleChanges,
  ViewChildren,
} from '@angular/core';
import { ArticleService } from '../../../../articles/services/article.service';
import { Subscription } from 'rxjs';
import { Article } from '../../../../../core/Models/Article/article.model';
import { AuthService } from '../../../../../core/service/auth.service';
import { userInfo } from '../../../../../core/Models/Auth/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-articles-container',
  templateUrl: './articles-container.component.html',
  styleUrl: './articles-container.component.scss',
})
export class ArticlesContainerComponent implements OnInit, OnDestroy {
  private readonly articleService: ArticleService = inject(ArticleService);
  private readonly authService: AuthService = inject(AuthService);
    private _snakebar=inject(MatSnackBar)
  
@ViewChildren('link') links!:QueryList<ElementRef>
  listOfArticle: Article[]=[];
  userData: userInfo = new userInfo();


  isSavedView:boolean=false

  subscription: Subscription = new Subscription();
  ngOnInit(): void {
   

       this.loadUserArticleData()

       
 
  
  }

  loadUserArticleData():void{
    this.listOfArticle=[]
    let articleUserSub = this.articleService.getUserArticles().subscribe({
      next: (data) => {
        this.listOfArticle = data.data;
        console.log(data)
        this.isSavedView=false
      },
    });



    this.subscription.add(articleUserSub)

  }

  loadUserSavedArticle(){
    this.listOfArticle=[]
    let savedArticlesSub=this.articleService.getSavedArticles().subscribe({
      next:(data)=>{
        this.listOfArticle=data.data
        console.log(data)
        this.isSavedView=true
      }
    })

    this.subscription.add(savedArticlesSub)
  }


  UnSaveArticle(articleId:number){
   let UnSavedSub= this.articleService.UnSavedArticle(articleId).subscribe({
      next:res=>{
        console.log(res)
        this._snakebar.open("Article is unSaved successfully...","close")

      },
      error:(err:HttpErrorResponse)=>{
        console.log(err)
        this._snakebar.open("Somthing went wrong !! ","CLose") 

      }
    })
    this.subscription.add(UnSavedSub)

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
