import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { CommentService } from '../../features/articles/services/comment.service';
import { AuthService } from '../../core/service/auth.service';
import { LikeService } from '../../features/articles/services/like.service';
import { ModalService } from '../../core/service/modal.service';
import { ArticleService } from '../../core/service/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../../core/Models/Article/article.model';
import { environment } from '../../../enviroments/env';
import { userInfo } from '../../core/Models/Auth/auth';
import { CtrateCommentComponent } from '../../features/articles/components/ctrate-comment/ctrate-comment.component';


@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrl: './article-details.component.scss'
})
export class ArticleDetailsComponent {
private readonly commentService:CommentService=inject(CommentService)
  private readonly authService: AuthService = inject(AuthService);
  private readonly router:Router = inject(Router);
  private readonly likeService:LikeService = inject(LikeService);
  private readonly modalService:ModalService = inject(ModalService);
  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute
  ) {}
  article!: Article;
  articleId!: number;
  imagesUrl: string = environment.imagesURL;
  userData!: userInfo;
  @ViewChild('likeIcon') like!: ElementRef;
  isLiked: boolean = false;
  ngOnInit(): void {
    
    this.authService.userData.subscribe((result) => {
     console.log(result);
     this.userData = result;
    });

    this.articleId = Number(this.route.snapshot.paramMap.get('id'));

    this.getArticleById(this.articleId);
  }

  toggeleLike() {
   
      this.likeService.toggleLike(this.articleId).subscribe({
        next: (result) => {
          console.log(result);
          
          this.getArticleById(this.articleId);
          if(result.statusCode == 201) {
            this.isLiked = true;
           
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    } 
    
  




  getArticleById(id: number) {
    this.articleService.getById(id).subscribe({
      next:(result) => {
        this.article = result;
      },

      error:(err) => {
        console.log(err);
      }


    })
  }    


  openCreateComment() {
    this.commentService.articleId.next(this.articleId)
    this.modalService.open(CtrateCommentComponent,{
      
     
      width: '500px',
      height: '100vh',
      position:{
        top:'0',
        right:'0'
      },

    })


  }


  deletArticle(){
    this.articleService.deleteArticle(this.articleId).subscribe({
      next:res=>{
        console.log(res)
        this.router.navigate(['home'])
      },
      error:err=>console.log(err)
    })
  }
}


