import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MyInfoComponent } from './components/my-info/my-info.component';
import { ArticlesContainerComponent } from './components/my-info/articles-container/articles-container.component';
import { UserInfoComponent } from './components/my-info/user-info/user-info.component';
import { ArticlesModule } from '../articles/articles.module';
import { EditNamePicComponent } from './components/edit-name-pic/edit-name-pic.component';
import { ForgetPasswordComponent } from './components/forget-pass/forget-pass.component';
import { ResetPasswordComponent } from './components/forget-pass/reset-pass/reset-pass.component';
import { AuthRouting } from './auth-routing.module';




@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    MyInfoComponent,
    ArticlesContainerComponent,
    UserInfoComponent,
    EditNamePicComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ArticlesModule,
    AuthRouting
  ],
  exports:[
      MyInfoComponent,
    ArticlesContainerComponent,
    UserInfoComponent,
    ForgetPasswordComponent,
  ]
})
export class AuthModule { }
