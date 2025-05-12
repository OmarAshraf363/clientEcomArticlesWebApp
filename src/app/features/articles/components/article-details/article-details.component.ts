import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Article } from '../../../../core/Models/Article/article.model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { environment } from '../../../../../enviroments/env';
import { userInfo } from '../../../../core/Models/Auth/auth';
import { AuthService } from '../../../../core/service/auth.service';
import { LikeService } from '../../services/like.service';
import { ModalService } from '../../../../core/service/modal.service';
import { CtrateCommentComponent } from '../ctrate-comment/ctrate-comment.component';
import { CommentService } from '../../services/comment.service';
import { ArticleService } from '../../../../core/service/article.service';
import { ArticleRowService } from '../../services/articleRow.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditArticleRowComponent } from '../edit-article-row/edit-article-row.component';
import { MatDialog } from '@angular/material/dialog';
import { EditArticleComponent } from '../edit-article/edit-article.component';
import { CreatedArticleRowComponent } from '../created-article-row/created-article-row.component';

@Component({
  selector: 'article-details',
  templateUrl: './article-details.component.html',
  styleUrl: './article-details.component.scss',
})
export class ArticleDetailsComponent implements OnInit {
  private readonly commentService: CommentService = inject(CommentService);
  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);
  private readonly likeService: LikeService = inject(LikeService);
  private readonly modalService: ModalService = inject(ModalService);
  private readonly _snack: MatSnackBar = inject(MatSnackBar);
  private readonly dailog = inject(MatDialog);

  constructor(
    private articleService: ArticleService,
        private articleRowService: ArticleRowService,

    private route: ActivatedRoute
  ) {}
  article!: Article;
  articleId!: number;
  imagesUrl: string = environment.imagesURL;
  userData!: userInfo;
  isAdmin=this.authService.userRole.getValue()
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
        if (result.statusCode == 201) {
          this.isLiked = true;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
addArticleRow(id:number){
        this.articleRowService.articleId.next(id);
   this.modalService.open(CreatedArticleRowComponent, {
          maxWidth: '100%',
      width:'1000px',
      height:'80vh',
     });
}
  editArticle(id:number){
        this.articleService.articleId.next(id);
 this.modalService.open(EditArticleComponent, {
          maxWidth: '100%',
      width:'1000px',
      height:'80vh',
     });
  }

  deletArticleRow(id: number) {
    let sub = this.articleService.deleteArticleRow(id).subscribe({
      next: () => {
        console.log('Deleted SuccessFully ');
        this._snack.open('Article row deleted successfully', 'close');
        this.getArticleById(this.articleId);
      },
    });
  }

  editArticleRow(id: number) {
    this.articleService.articleRowId.next(id);
   
      this.modalService.open(EditArticleRowComponent, {
          maxWidth: '100%',
      width:'1000px',
      height:'80vh',
     });
  }

  getArticleById(id: number) {
    this.articleService.getById(id).subscribe({
      next: (result) => {
        this.article = result;
      },

      error: (err) => {
        console.log(err);
      },
    });
  }



  openCreateComment() {
    this.commentService.articleId.next(this.articleId);
    this.modalService.open(CtrateCommentComponent, {
      width: '500px',
      height: '100vh',
      position: {
        top: '0',
        right: '0',
      },
    });
  }

  deletArticle() {
    this.articleService.deleteArticle(this.articleId).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['home']);
      },
      error: (err) => console.log(err),
    });
  }
}
