import {
  Component,
  ElementRef,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  QueryList,
  SimpleChanges,
  ViewChildren,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Article } from '../../../core/Models/Article/article.model';
import { AuthService } from '../../../core/service/auth.service';
import { userInfo } from '../../../core/Models/Auth/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { ArticleService } from '../../../core/service/article.service';
import { UserFollowerReq } from '../../../core/Models/user/userFlowerReq';
import { environment } from '../../../../enviroments/env';
import { GlobalUsersService } from '../../../core/service/user.service';
import { ArticleParam } from '../../../core/Models/articleParam';

@Component({
  selector: 'app-articles-container',
  templateUrl: './articles-container.component.html',
  styleUrl: './articles-container.component.scss',
})
export class ArticlesContainerComponent implements OnInit, OnDestroy {
  private readonly articleService: ArticleService = inject(ArticleService);
  private readonly userService: GlobalUsersService = inject(GlobalUsersService);
  private _snakebar = inject(MatSnackBar);

  totalFollowers:number=0
  totalFollowing:number=0


  @ViewChildren('link') links!: QueryList<ElementRef>;
  listOfArticle: Article[] = [];
  userData: userInfo = new userInfo();
  userFollower: UserFollowerReq[] = [];
  userFollowwing: UserFollowerReq[] = [];
  @Input()
  userId!:string

  imageUrl = environment.imagesURL;
  isSavedView: boolean = false;
  isFolloweView: boolean = false;
  isFollowingView: boolean = false;

  subscription: Subscription = new Subscription();
  ngOnInit(): void {
    
    this.loadUserArticleData();
  }

  prepareArticleParam():ArticleParam{
    let articleParam=new ArticleParam()
    articleParam.userId=this.userId
return articleParam
    
  } 

  loadUserArticleData(): void {
    this.reaset();
    const param=this.prepareArticleParam()
    console.log(param)
    let articleUserSub = this.articleService.getUserArticles(param).subscribe({
      next: (data) => {
      
        
        this.listOfArticle = data.data;
        console.log(data);
        this.isSavedView = false;
        this.isFolloweView = false;
        this.isFollowingView = false;
      },
    });

    this.subscription.add(articleUserSub);
  }

  loadUserSavedArticle() {
    let savedArticlesSub = this.articleService.getSavedArticles().subscribe({
      next: (data) => {
        this.reaset()
        this.listOfArticle = data.data;
        console.log(data);
        this.isSavedView = true;
        this.isFolloweView = false;
        this.isFollowingView = false;
      },
    });

    this.subscription.add(savedArticlesSub);
  }

  UnSaveArticle(articleId: number) {
    let UnSavedSub = this.articleService.UnSavedArticle(articleId).subscribe({
      next: (res) => {
        console.log(res);
        this._snakebar.open('Article is unSaved successfully...', 'close');
        this.loadUserSavedArticle()
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this._snakebar.open('Somthing went wrong !! ', 'CLose');
      },
    });
    this.subscription.add(UnSavedSub);
  }
  reaset(): void {
      this.userFollower=[]
        this.userFollowwing=[]
    this.listOfArticle = [];
  }
  loadUserFollowers() {

    const finalSub=this.userId==null? this.userService.getUserFollowe():this.userService.getFollowers(this.userId)


    const sub = finalSub.subscribe({
      next: (data) => {
        this.reaset();
        this.userFollower = data;
        this.totalFollowers=data.length
        this.isFolloweView = true;
        this.isSavedView = false;
        this.isFollowingView = false;
      },
    });
    this.subscription.add(sub);
  }

  loadUserFollowing() {

        const finalSub=this.userId==null? this.userService.getUserFollowing():this.userService.getFollowing(this.userId)


    const sub = finalSub.subscribe({
      next: (data) => {
        this.reaset();
        this.userFollowwing = data;
        this.totalFollowing=data.length
        this.isSavedView = false;
        this.isFolloweView = false;
        this.isFollowingView = true;
      },
    });
    this.subscription.add(sub);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
