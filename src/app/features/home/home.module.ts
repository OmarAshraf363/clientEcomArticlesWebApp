import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { features } from 'process';
import { FeaturesModule } from '../features.module';
import { ArticlesComponent } from '../articles/articles.component';
import { ArticlesModule } from '../articles/articles.module';
import { CategoriesModule } from '../categories/categories.module';
import { ArticleListComponent } from '../articles/pages/article-list/article-list.component';



@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    ArticlesModule,
    CategoriesModule,
  ]
})
export class HomeModule { }
