import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './user-layout/user-layout/user-layout.component';
import { SharedModule } from "../shared/shared.module";
import { ArticlesModule } from "../features/articles/articles.module";
import { RouterModule } from '@angular/router';
import { GetStartLayoutComponent } from './get-start-layout/get-start-layout.component';
import { NavbarGetStartComponent } from './get-start-layout/navbar-get-start/navbar-get-start.component';
import { PanerComponent } from './get-start-layout/paner/paner.component';
import { FooterComponent } from './get-start-layout/footer/footer.component';
import { AuthModule } from '../features/auth/auth.module';



@NgModule({
  declarations: [
    AdminLayoutComponent,
    UserLayoutComponent,
    GetStartLayoutComponent,
    NavbarGetStartComponent,
    PanerComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ArticlesModule,
    RouterModule,
    AuthModule

    
],
exports:[AdminLayoutComponent,UserLayoutComponent]
})
export class LayoutModule { }
