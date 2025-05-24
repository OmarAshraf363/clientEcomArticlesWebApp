import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderCompComponent } from './Header/header-comp/header-comp.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { RouterModule } from '@angular/router';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgxEditorModule } from 'ngx-editor';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import { LoaderComponent } from './loader/loader.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NotFoundComponent } from './not-found/not-found.component';
import { BadRequestComponent } from './bad-request/bad-request.component';
import { FeaturesModule } from '../features/features.module';
import { ActiveLinkDirective } from './dirictives/active-link.directive';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { UserCardComponent } from './user-card/user-card.component';
import { AnotherUserProfileComponent } from './another-user-profile/another-user-profile.component';
import { UserInfoComponent } from './another-user-profile/user-info/user-info.component';
import { ArticlesContainerComponent } from './another-user-profile/articles-container/articles-container.component';
import { ArticleCardSharedComponent } from './article-card-shared/article-card-shared.component';


@NgModule({
  declarations: [
    HeaderCompComponent,
    AdminHeaderComponent,
    LoaderComponent,
    NotFoundComponent,
    BadRequestComponent,
    ActiveLinkDirective,
    ArticleDetailsComponent,
    UserCardComponent,
    AnotherUserProfileComponent,
    UserInfoComponent,
    ArticlesContainerComponent,
    ArticleCardSharedComponent,
    

  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatLabel,
      ReactiveFormsModule,
        NgxEditorModule,
        MatMenuModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        FormsModule,
        
        
        
  ],
  exports:[
    HeaderCompComponent,
    AdminHeaderComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
    NgxEditorModule,
    MatLabel,
    MatMenuModule,
    MatTooltipModule,
    LoaderComponent,
    MatProgressSpinnerModule,
    ActiveLinkDirective,
    FormsModule ,
    ArticleDetailsComponent ,
    UserCardComponent,
        UserInfoComponent,
    ArticlesContainerComponent

  ]
})
export class SharedModule { }
