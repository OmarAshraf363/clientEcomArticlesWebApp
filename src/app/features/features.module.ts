import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleListComponent } from './articles/pages/article-list/article-list.component';
import { ArticlesModule } from './articles/articles.module';
import { ArticlesRoutingModule } from './articles/articles-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { CategoriesModule } from './categories/categories.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ArticlesModule,
    SharedModule,
    AuthModule,
    HomeModule,
    CategoriesModule
  ],
  exports:
  [
    
    ArticlesRoutingModule,
    AuthModule,
    HomeModule,
    CategoriesModule,
    ArticlesModule

  ]
})
export class FeaturesModule { }
