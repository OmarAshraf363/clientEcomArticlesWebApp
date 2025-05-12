import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesComponent } from './articles.component';
import { ArticleDetailsComponent } from './components/article-details/article-details.component';
import { ArticleListComponent } from './pages/article-list/article-list.component';
import { ArticleCardComponent } from './components/article-card/article-card.component';
import { ArticleDetailsPageComponent } from './pages/article-details-page/article-details-page.component';
import { CreatedArticleRowComponent } from './components/created-article-row/created-article-row.component';

import { CreateArticleComponent } from './components/create-article/create-article.component';
import { CreateFullArticlePageComponent } from './pages/create-full-article-page/create-full-article-page.component';
import { NavbarComponent } from './pages/create-full-article-page/navbar/navbar.component';
import { SharedModule } from '../../shared/shared.module';
import { CtrateCommentComponent } from './components/ctrate-comment/ctrate-comment.component';
import { FeaturesModule } from "../features.module";
import { CategoriesModule } from "../categories/categories.module";
import { CategoriesSectionComponent } from '../categories/components/categories-section/categories-section.component';
import { EditArticleComponent } from './components/edit-article/edit-article.component';
import { EditArticleRowComponent } from './components/edit-article-row/edit-article-row.component';
@NgModule({
  declarations: [
    ArticlesComponent,
    ArticleDetailsComponent,
    ArticleListComponent,
    ArticleCardComponent,
    ArticleDetailsPageComponent,
    CreatedArticleRowComponent,
    CreateArticleComponent,
    CreateFullArticlePageComponent,
    NavbarComponent,
    CtrateCommentComponent,
    EditArticleComponent,
    EditArticleRowComponent,
  ],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    SharedModule,
    CategoriesModule
  ],
  exports:[
    ArticleListComponent,
    ArticleCardComponent
  ]

})
export class ArticlesModule { }
