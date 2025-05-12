import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminArticlesComponent } from './components/admin-articles/admin-articles.component';
import { UsersComponent } from './components/users/users.component';
import { AdminCatigoresComponent } from './components/admin-catigores/admin-catigores.component';
import { LikesComponent } from './components/likes/likes.component';
import { CommentsComponent } from './components/comments/comments.component';
import { SharedModule } from '../../shared/shared.module';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { ArticleDetailsComponent } from '../articles/components/article-details/article-details.component';
import { UserDetailsComponent } from './components/users/user-details/user-details.component';



@NgModule({
  declarations: [
    AdminArticlesComponent,
    UsersComponent,
    AdminCatigoresComponent,
    LikesComponent,
    CommentsComponent,
    UserDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminPanelRoutingModule ,
    
  ]
})
export class AdminPanelModule { }
