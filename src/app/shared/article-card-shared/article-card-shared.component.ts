import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, Input } from '@angular/core';
import { Article } from '../../core/Models/Article/article.model';
import { environment } from '../../../enviroments/env';
import { AuthService } from '../../core/service/auth.service';
import { Subscription } from 'rxjs';
import { userInfo } from '../../core/Models/Auth/auth';
import { Router } from '@angular/router';
import { GlobalUsersService } from '../../core/service/user.service';
import { ArticleService } from '../../core/service/article.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-article-card-shared',
  templateUrl: './article-card-shared.component.html',
  styleUrl: './article-card-shared.component.scss'
})
export class ArticleCardSharedComponent {
 private _snakebar = inject(MatSnackBar);
  private readonly articleService: ArticleService = inject(ArticleService);
    private readonly userService: GlobalUsersService = inject(GlobalUsersService);

    

  router: Router = inject(Router);

  @Input()
  article!: Article;
  imageUrl: string;
  userData: userInfo;
  articleIsSave: boolean = false;
  subscription: Subscription = new Subscription();

  constructor(private readonly authService: AuthService) {
    this.imageUrl = environment.imagesURL;
    this.userData = this.authService.userData.getValue();
  }

  ngOnInit(): void {
    let savedArticleSub = this.articleService.getSavedArticles().subscribe({
      next: (res) => {
        let data: Article[] = res.data;
        if (data) {
          data.forEach((e) => {
            if (e.id == this.article.id) {
              this.articleIsSave = true;
            }
          });
        } else {
          data = [];
        }
      },
    });
    this.subscription.add(savedArticleSub);
  }
  saveArticle(articleId: number) {
    let sub = this.articleService.setSavedArticle(articleId).subscribe({
      next: (res) => {
        console.log(res);
        this._snakebar.open('Article is saved successfully... ', 'CLose');
        this.articleIsSave = true;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        if (err.status == 409) {
          this._snakebar.open('Article is allready save ', 'CLose');
        } else {
          this._snakebar.open('Somthing went wrong !! ', 'CLose');
        }
      },
    });
    this.subscription.add(sub);
  }

  UnSaveArticle(articleId: number) {
    let UnSavedSub = this.articleService.UnSavedArticle(articleId).subscribe({
      next: (res) => {
        console.log(res);
        this._snakebar.open('Article is unSaved successfully...', 'close');
        this.articleIsSave = false;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this._snakebar.open('Somthing went wrong !! ', 'CLose');
      },
    });
    this.subscription.add(UnSavedSub);
  }

  goToAuthProfile(id:string){
    this.userService.userId.next(id)
    this.router.navigate(['/home/users',id])

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
