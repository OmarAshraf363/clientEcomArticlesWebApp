import { Component, Inject, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { userInfo } from '../../../../core/Models/Auth/auth';
import { AuthService } from '../../../../core/service/auth.service';
import { CommentService } from '../../services/comment.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Comment,
  NewComment,
} from '../../../../core/Models/Comment/comment.mmodel';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../../enviroments/env';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ctrate-comment',
  templateUrl: './ctrate-comment.component.html',
  styleUrl: './ctrate-comment.component.scss',
})
export class CtrateCommentComponent implements OnInit, OnDestroy {
  private readonly commentService: CommentService = inject(CommentService);
  private readonly authService: AuthService = inject(AuthService);
  private fb: FormBuilder = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<CtrateCommentComponent>);
  private readonly _snake = inject(MatSnackBar);

  private router = inject(Router);
  userData: userInfo = this.authService.userData.getValue();
  commentForm: FormGroup;
  allArticlesComment!: Comment[];
  articleId = this.commentService.articleId.getValue();
  count: number = 0;
  imageUel = environment.imagesURL;
  subs = new Subscription();
  constructor() {
    this.commentForm = this.fb.group({
      content: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments(): void {
    const sub = this.commentService
      .getArticleComments(this.articleId)
      .subscribe({
        next: (res) => {
          this.count = res.count;
          this.allArticlesComment = res.comments;
        },
        error: (err: HttpErrorResponse) => {
          this._snake.open('Failed to load comments', 'Close', {
            duration: 3000,
          });
        },
      });
    this.subs.add(sub);
  }

  deleteComment(id: number): void {
    const sub = this.commentService.deleteComment(id).subscribe({
      next: () => {
        this._snake.open('Comment deleted', 'Close', { duration: 3000 });
        this.loadComments();
      },
      error: () => {
        this._snake.open('Failed to delete comment', 'Close', {
          duration: 3000,
        });
      },
    });

    this.subs.add(sub);
  }

  submitComment(): void {
    if (this.commentForm.invalid) return;

    const newComment: NewComment = {
      articleId: this.articleId,
      content: this.commentForm.value.content,
    };

    const sub = this.commentService.createNewComment(newComment).subscribe({
      next: (res) => {
        this._snake.open('Comment posted successfully', 'Close', {
          duration: 3000,
        });
        this.loadComments();
        this.commentForm.reset();
      },
      error: () => {
        this._snake.open('Failed to post comment', 'Close', { duration: 3000 });
      },
    });

    this.subs.add(sub);
  }

  closeDialog() {
    this.dialogRef.close();
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
