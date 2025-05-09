import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLayoutComponent } from './layout/user-layout/user-layout/user-layout.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout/admin-layout.component';
import { CreateFullArticlePageComponent } from './features/articles/pages/create-full-article-page/create-full-article-page.component';

import { AdminGaurd } from './core/Gaurds/admin.gaurd';
import { GetStartLayoutComponent } from './layout/get-start-layout/get-start-layout.component';
import { authGuard } from './core/Gaurds/auth.gaurd';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { BadRequestComponent } from './shared/bad-request/bad-request.component';
import { UserInfoComponent } from './features/auth/components/my-info/user-info/user-info.component';
import { ArticlesContainerComponent } from './features/auth/components/my-info/articles-container/articles-container.component';
import { MyInfoComponent } from './features/auth/components/my-info/my-info.component';
import { ForgetPasswordComponent } from './features/auth/components/forget-pass/forget-pass.component';
import { ResetPasswordComponent } from './features/auth/components/forget-pass/reset-pass/reset-pass.component';
import { PanerComponent } from './layout/get-start-layout/paner/paner.component';

const routes: Routes = [
  {
    path: 'home',
    component: UserLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/articles/articles.module').then((m) => m.ArticlesModule),
      },
      {
        path:'me',
        component:MyInfoComponent
      }
        ],
  },
  {
    path: 'test',
    component: CreateFullArticlePageComponent,
  },
  {
    path: '',
    component: GetStartLayoutComponent,
    children:[
      {
        path:'',
        component:PanerComponent
        
      },{
        path:'auth',
        loadChildren:()=>import('./features/auth/auth.module').then((e)=>e.AuthModule)
      }
      ,{
        path:'my',
        loadChildren:()=>import('./features/static-pages/static-pages.module').then((m)=>m.StaticPagesModule)
      }
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AdminGaurd],
  },
  // { path: '**', component: NotFoundComponent },
  { path: '400', component: BadRequestComponent },
  { path: 'forget', component: ForgetPasswordComponent },
  { path: 'reset', component: ResetPasswordComponent },



  

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
