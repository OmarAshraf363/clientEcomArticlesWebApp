import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminArticlesComponent } from './components/admin-articles/admin-articles.component';
import { ArticleDetailsPageComponent } from '../articles/pages/article-details-page/article-details-page.component';
import { ArticleDetailsComponent } from '../articles/components/article-details/article-details.component';
import { AdminCatigoresComponent } from './components/admin-catigores/admin-catigores.component';
import { UsersComponent } from './components/users/users.component';
const routes: Routes = [
  {
    path: 'articles',
    component: AdminArticlesComponent,
  },
  {
    path: '',
    component: AdminArticlesComponent,
  },
  {
    path: 'articles/:id',
    component: ArticleDetailsComponent,
  },
  {
    path: 'catigories',
    component: AdminCatigoresComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPanelRoutingModule {}
