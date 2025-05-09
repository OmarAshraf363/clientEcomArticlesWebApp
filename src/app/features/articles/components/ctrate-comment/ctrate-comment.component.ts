import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { userInfo } from '../../../../core/Models/Auth/auth';
import { AuthService } from '../../../../core/service/auth.service';
import { CommentService } from '../../services/comment.service';
import { ActivatedRoute } from '@angular/router';
import { Comment, NewComment } from '../../../../core/Models/Comment/comment.mmodel';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-ctrate-comment',
  templateUrl: './ctrate-comment.component.html',
  styleUrl: './ctrate-comment.component.scss'
})
export class CtrateCommentComponent implements OnInit {
  private readonly commentService:CommentService=inject(CommentService)
  private readonly authService: AuthService = inject(AuthService);
  userData: userInfo=this.authService.userData.getValue();
  commentForm: FormGroup;
  allArticlesComment:Comment[]=[]
  articleId!:number;
  
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CtrateCommentComponent>,
    private  route:ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: { articleId: number } // 👈 هنا هنستقبل الـ data

  ) {
    this.commentForm = this.fb.group({ 
      content: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.articleId=this.commentService.articleId.getValue()
    console.log(this.articleId)
    this.commentService.getArticleComments(this.articleId).subscribe({
      next:res=>{
        console.log(res)
        this.allArticlesComment=res.comments
        console.log(this.allArticlesComment)
      },
      
    })

  }



  submitComment() {
    if (this.commentForm.valid) {
      var newComment:NewComment={
        articleId:this.articleId,
        content:this.commentForm.get('content')?.value
      }
 

      this.commentService.createNewComment(newComment).subscribe(res=>{
        console.log(res)
      })
      this.dialogRef.close( this.commentForm.value); // Send back the comment data
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
