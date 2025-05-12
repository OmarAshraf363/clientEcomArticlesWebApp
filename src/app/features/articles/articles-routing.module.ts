import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './articles.component';
import { ArticleDetailsComponent } from './components/article-details/article-details.component';
import { ArticleListComponent } from './pages/article-list/article-list.component';
import { ArticleDetailsPageComponent } from './pages/article-details-page/article-details-page.component';
import { CreatedArticleRowComponent } from './components/created-article-row/created-article-row.component';
import { CreateArticleComponent } from './components/create-article/create-article.component';
import { CreateFullArticlePageComponent } from './pages/create-full-article-page/create-full-article-page.component';

const routes: Routes = [
  
  { 
    path: '', 
    component: ArticleListComponent
  },
  
  {
    path:'article/:id' ,
     component:ArticleDetailsPageComponent
  },
 
  {
      path:'create-row/:id' , component:CreatedArticleRowComponent
  },
  {
    path:'articles/create',
    component:CreateFullArticlePageComponent,
    
  }
  ,
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
